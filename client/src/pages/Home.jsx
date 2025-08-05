import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then(res => res.json())
      .then(data => setVideos(data.videos || []))
      .catch(console.error);
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-glow">
          🎬 Your Videos
        </h1>

        {videos.length === 0 ? (
          <p className="text-center text-white">No videos yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {videos.map((vid, idx) => (
              <div key={idx} className="transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl">
                <VideoCard
                  title={vid.name || `Video ${idx + 1}`}
                  thumbnail={vid.thumbnail || "/fallback.jpg"}
                  videoUrl={vid.url}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
