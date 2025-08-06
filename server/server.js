const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.get("/uploads/:filename", (req, res) => {
    const filePath = path.join(uploadDir, req.params.filename);

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("Video not found");
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!range) {
        res.writeHead(200, {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4", // or dynamically detect
        });
        fs.createReadStream(filePath).pipe(res);
    } else {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        const chunkSize = end - start + 1;
        const file = fs.createReadStream(filePath, { start, end });

        res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "video/mp4", // or detect via mime-type
        });

        file.pipe(res);
    }
});
// Serve videos
app.use("/thumbnails", express.static("thumbnails")); // Serve thumbnails

const uploadDir = path.join(__dirname, "uploads");
const thumbnailDir = path.join(__dirname, "thumbnails");

// Create folders if they don't exist
[uploadDir, thumbnailDir].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
});

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Generate a thumbnail using ffmpeg
const generateThumbnail = (videoPath, baseName) => {
    const thumbnailPath = path.join(thumbnailDir, `${baseName}.jpg`);
    const command = `ffmpeg -ss 00:00:02 -i "${videoPath}" -frames:v 1 -q:v 2 "${thumbnailPath}" -y`;

    exec(command, (err) => {
        if (err) console.error("Thumbnail generation error:", err);
        else console.log("✅ Thumbnail generated:", thumbnailPath);
    });

    return `/thumbnails/${baseName}.jpg`;
};

// 📤 Upload video route
app.post("/upload", upload.single("video"), (req, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filename = req.file.filename;
    const videoPath = path.join(uploadDir, filename);
    const baseName = path.parse(filename).name;
    const thumbnail = generateThumbnail(videoPath, baseName);

    res.json({
        name: filename,
        videoUrl: `http://localhost:${PORT}/uploads/${filename}`,
        thumbnailUrl: `http://localhost:${PORT}${thumbnail}`,
    });
});

// 📥 Download YouTube video
app.post("/download", (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "Missing video URL" });

    const timestamp = Date.now();
    const outputTemplate = path.join(uploadDir, `${timestamp}.%(ext)s`);
    const command = `yt-dlp -f best -o "${outputTemplate}" "${url}"`;

    exec(command, (err) => {
        if (err) {
            console.error("yt-dlp error:", err);
            return res.status(500).json({ error: "Download failed" });
        }

        // Get the actual file name generated (e.g., 12345678.mp4)
        const downloadedFile = fs.readdirSync(uploadDir).find(f =>
            f.startsWith(`${timestamp}.`)
        );

        if (!downloadedFile) {
            return res.status(500).json({ error: "Downloaded file not found" });
        }

        const finalPath = path.join(uploadDir, downloadedFile);
        const baseName = path.parse(downloadedFile).name;
        const thumbnail = generateThumbnail(finalPath, baseName);

        res.json({
            name: downloadedFile,
            videoUrl: `http://localhost:${PORT}/uploads/${downloadedFile}`,
            thumbnailUrl: `http://localhost:${PORT}${thumbnail}`,
        });
    });
});

// 📂 Get all videos
app.get("/videos", (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) return res.status(500).json({ error: "Failed to read uploads" });

        const videos = files
            .filter(file => /\.(mp4|mkv|webm|avi|mov)$/i.test(file))
            .map((file) => ({
                name: file,
                url: `http://localhost:${PORT}/uploads/${file}`,
            }));


        res.json({ videos });
    });
});

// Use the same uploads directory for renaming
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const THUMBNAILS_DIR = path.join(__dirname, 'thumbnails');

// Rename video endpoint
app.post('/api/rename', (req, res) => {
    const { oldName, newName } = req.body;

    if (!oldName || !newName) {
        return res.status(400).json({ error: 'Missing oldName or newName' });
    }

    const oldPath = path.join(UPLOADS_DIR, oldName);
    const newPath = path.join(UPLOADS_DIR, newName);

    if (!fs.existsSync(oldPath)) {
        return res.status(404).json({ error: 'Original file not found' });
    }

    try {
        fs.renameSync(oldPath, newPath);

        // Also rename thumbnail if it exists
        const oldBase = path.parse(oldName).name;
        const newBase = path.parse(newName).name;
        const oldThumb = path.join(THUMBNAILS_DIR, `${oldBase}.jpg`);
        const newThumb = path.join(THUMBNAILS_DIR, `${newBase}.jpg`);
        if (fs.existsSync(oldThumb)) {
            fs.renameSync(oldThumb, newThumb);
        }

        // Return updated video list
        const files = fs.readdirSync(UPLOADS_DIR);
        const videos = files
            .filter(file => /\.(mp4|mkv|webm|avi|mov)$/i.test(file))
            .map((file) => ({
                name: file,
                url: `http://localhost:${PORT}/uploads/${file}`,
            }));

        res.json({ success: true, videos });
    } catch (err) {
        console.error('Rename error:', err);
        res.status(500).json({ error: 'Failed to rename file' });
    }
});

// 🗑️ Delete video endpoint
app.delete("/api/delete/:filename", (req, res) => {
    const filename = req.params.filename;

    if (!filename) {
        return res.status(400).json({ error: "Missing filename" });
    }

    const filePath = path.join(UPLOADS_DIR, filename);
    const baseName = path.parse(filename).name;
    const thumbPath = path.join(THUMBNAILS_DIR, `${baseName}.jpg`);

    try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        if (fs.existsSync(thumbPath)) fs.unlinkSync(thumbPath);

        // Return updated list
        const files = fs.readdirSync(UPLOADS_DIR);
        const videos = files
            .filter(file => /\.(mp4|mkv|webm|avi|mov)$/i.test(file))
            .map(file => ({
                name: file,
                url: `http://localhost:${PORT}/uploads/${file}`,
            }));

        res.json({ success: true, videos });
    } catch (err) {
        console.error("Delete error:", err);
        res.status(500).json({ error: "Failed to delete video" });
    }
});


// 🚀 Start server
app.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
);
