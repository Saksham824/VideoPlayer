import { useState } from "react";
import axios from "axios";

const YOUTUBE_API_KEY = "AIzaSyDTRcQwwI-1QWvtf7nk0_hqauW6LQ6V3dQ";

export default function YouTube() {
  const [query, setQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchYouTube = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search`,
        {
          params: {
            q: query,
            part: "snippet",
            maxResults: 20,
            type: "video",
            key: YOUTUBE_API_KEY,
          },
        }
      );
      setVideos(res.data.items);
    } catch (err) {
      alert("Failed to fetch videos.");
    }
    setLoading(false);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-950 py-10 px-2 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-6 sm:p-10 border border-white/20">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-red-500 via-yellow-400 to-blue-400 bg-clip-text text-transparent drop-shadow-glow">
          Search YouTube <span role="img" aria-label="YouTube">📺</span>
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <input
            type="text"
            placeholder="Search videos..."
            className="flex-1 rounded-lg px-4 py-3 bg-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={e => e.key === "Enter" && searchYouTube()}
          />
          <button
            onClick={searchYouTube}
            disabled={loading}
            className="bg-gradient-to-r from-red-500 to-yellow-400 hover:from-yellow-400 hover:to-blue-400 text-black font-bold px-6 py-3 rounded-lg shadow transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <div
              key={video.id.videoId}
              className="bg-white/10 border border-white/20 rounded-xl shadow-lg overflow-hidden transition-transform duration-200 hover:-translate-y-2 hover:shadow-2xl group"
            >
              <div className="relative aspect-video bg-black">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title={video.snippet.title}
                  allowFullScreen
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              </div>
              <div className="p-4">
                <p className="font-semibold text-white text-base mb-1 truncate" title={video.snippet.title}>
                  {video.snippet.title}
                </p>
                <p className="text-gray-300 text-xs truncate">{video.snippet.channelTitle}</p>
              </div>
            </div>
          ))}
        </div>

        {!loading && videos.length === 0 && (
          <p className="text-center text-gray-400 mt-10">No videos found. Try searching for something!</p>
        )}
      </div>
    </section>
  );
}