import { useState } from "react";

export default function PlayFromLink() {
  const [url, setUrl] = useState("");
  const [submittedUrl, setSubmittedUrl] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const isYouTube = (url) =>
    url.includes("youtube.com/watch?v=") || url.includes("youtu.be/");
  const isVimeo = (url) => url.includes("vimeo.com/");
  const isDirectVideo = (url) =>
    url.match(/\.(mp4|webm|ogg)$/i) || url.includes("blob:");

  const extractYouTubeID = (url) => {
    const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  const extractVimeoID = (url) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : null;
  };

  const handlePlay = async () => {
    const trimmed = url.trim();
    if (!trimmed) return;
    setSubmittedUrl(trimmed);
    setDownloadLink(""); 
    setErrorMsg("");
    setLoading(true);

    if (isYouTube(trimmed)) {
      try {
        const res = await fetch("http://localhost:5000/download", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: trimmed }),
        });
        const data = await res.json();
        if (data.downloadUrl) {
          setDownloadLink(data.downloadUrl);
        } else {
          setErrorMsg("Video is downloaded successfully");
        }
      } catch (err) {
        console.error("Download failed:", err);
        setErrorMsg("An error occurred while downloading.");
      }
    }

    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full bg-white/5 backdrop-blur-md p-6 rounded-xl border border-white/10 shadow-xl">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-400 bg-clip-text text-transparent drop-shadow-glow">
           Watch a Video from Link <span role="img" aria-label="YouTube">🎬</span>
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Paste any video link here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePlay()}
            className="flex-1 bg-white/10 text-white px-4 py-3 rounded-md placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
          <button
            onClick={handlePlay}
            disabled={loading}
            className={`bg-blue-600 px-5 py-3 rounded-md text-white font-semibold transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500"
            }`}
          >
            {loading ? "Processing..." : "▶️ Play"}
          </button>
        </div>

        {errorMsg && (
          <p className="text-green-400 text-center font-medium mb-4">{errorMsg}</p>
        )}

        {submittedUrl && (
          <>
            <div className="aspect-video w-full bg-black border border-white/10 rounded-lg overflow-hidden shadow-lg">
              {isYouTube(submittedUrl) ? (
                <iframe
                  src={`https://www.youtube.com/embed/${extractYouTubeID(submittedUrl)}`}
                  className="w-full h-full"
                  title="YouTube Video"
                  allowFullScreen
                />
              ) : isVimeo(submittedUrl) ? (
                <iframe
                  src={`https://player.vimeo.com/video/${extractVimeoID(submittedUrl)}`}
                  className="w-full h-full"
                  title="Vimeo Video"
                  allowFullScreen
                />
              ) : isDirectVideo(submittedUrl) ? (
                <video
                  src={submittedUrl}
                  controls
                  className="w-full h-full object-contain bg-black"
                />
              ) : (
                <iframe
                  src={submittedUrl}
                  className="w-full h-full"
                  title="Embedded Player"
                  allowFullScreen
                />
              )}
            </div>

            {/* 🎯 Download Button or Status */}
            {(isDirectVideo(submittedUrl) || downloadLink) && (
              <div className="mt-4 text-center">
                <a
                  href={downloadLink || submittedUrl}
                  download
                  className="inline-block bg-green-600 hover:bg-green-500 px-5 py-2 rounded-md text-white font-semibold transition-all"
                >
                  ⬇️ Download Video
                </a>
              </div>
            )}

            {loading && (
              <div className="mt-4 text-center text-sm text-gray-300 animate-pulse">
                Downloading video, please wait...
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
