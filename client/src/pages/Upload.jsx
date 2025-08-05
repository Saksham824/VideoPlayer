import { useState, useRef } from "react";
import axios from "axios";
import VideoPlayer from "../components/VideoPlayer";

export default function Upload() {
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [progress, setProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const dropRef = useRef();

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    }
  };

  const uploadVideo = async () => {
    if (!videoFile) return alert("Please select a video file.");

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      setProgress(0);
      setVideoUrl(null);
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          const percent = Math.round((e.loaded * 100) / e.total);
          setProgress(percent);
        },
      });

      setVideoUrl(res.data.videoUrl); 
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-950 via-gray-900 to-black py-10 px-2 flex items-center justify-center">
      <div className="w-full max-w-xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-10 border border-white/20">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-glow">
          Upload Video <span role="img" aria-label="camera">🎥</span>
        </h1>

        <div
          ref={dropRef}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`transition-all duration-200 border-2 border-dashed rounded-xl p-8 text-center cursor-pointer mb-6 relative
            ${dragActive ? "border-pink-400 bg-pink-400/10 shadow-lg scale-105" : "border-blue-500 bg-white/20"}
          `}
          onClick={() => dropRef.current.querySelector("input").click()}
        >
          <div className="flex flex-col items-center justify-center">
            <svg
              className={`w-12 h-12 mb-2 ${dragActive ? "text-pink-400" : "text-blue-400"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-8m0 0l-4 4m4-4l4 4M20 16.5A4.5 4.5 0 0015.5 12H15a1 1 0 00-1 1v1m-4 0v-1a1 1 0 00-1-1h-.5A4.5 4.5 0 004 16.5v.5A2.5 2.5 0 006.5 19h11a2.5 2.5 0 002.5-2.5v-.5z" />
            </svg>
            <p className="text-gray-100 font-medium mb-1">Drag & drop your video here</p>
            <p className="text-gray-300 text-xs">(or click to select a file)</p>
            <input
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          {dragActive && (
            <div className="absolute inset-0 rounded-xl border-4 border-pink-400 border-dashed pointer-events-none animate-pulse" />
          )}
        </div>

        {videoFile && (
          <div className="mb-6 bg-white/10 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow">
            <div className="flex-1 text-white truncate">
              <span className="font-semibold">Selected:</span> {videoFile.name}
            </div>
            <button
              onClick={uploadVideo}
              className="bg-gradient-to-r from-blue-500 to-pink-400 hover:from-pink-500 hover:to-yellow-400 text-white font-bold px-6 py-2 rounded-lg shadow transition-all duration-200"
            >
              Upload
            </button>
          </div>
        )}

        {progress > 0 && progress < 100 && (
          <div className="w-full bg-gray-700/40 h-4 rounded-lg overflow-hidden mt-4 shadow-inner">
            <div
              className="bg-gradient-to-r from-green-400 via-blue-400 to-pink-400 h-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}

        {progress === 100 && !videoUrl && (
          <p className="mt-4 text-center text-green-400 font-medium animate-pulse">
            Processing uploaded video...
          </p>
        )}

        {videoUrl && (
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-3 text-center">Uploaded Video</h2>
            <div className="rounded-xl overflow-hidden shadow-lg bg-black/70 p-2">
              <VideoPlayer src={videoUrl} title={videoFile.name} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}