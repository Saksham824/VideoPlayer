import { useEffect, useState } from "react";
import VideoCard from "../components/VideoCard";
import axios from "axios";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data.videos || []))
      .catch(console.error);
  }, []);

  // Rename handler
  const handleRename = async (oldName, newName) => {
    try {
      const res = await axios.post("http://localhost:5000/api/rename", {
        oldName,
        newName,
      });
      setVideos(res.data.videos);
    } catch (err) {
      alert("Failed to rename video");
    }
  };

  // Delete handler
  const handleDelete = async (filename) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/delete/${filename}`
      );
      setVideos(res.data.videos);
    } catch (err) {
      alert("Failed to delete video");
    }
  };
  

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
              <div
                key={idx}
                className="transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl"
              >
                <VideoCard
                  key={idx}
                  id={vid._id || idx}
                  title={vid.name || `Video ${idx + 1}`}
                  videoUrl={vid.url}
                   onRename={handleRename}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
