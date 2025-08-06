import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";

export default function Watch() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/videos")
      .then((res) => res.json())
      .then((data) => {
        const vid = (data.videos || []).find((v, i) => v._id === id || String(i) === id);
        setVideo(vid);
      })
      .catch(console.error);
  }, [id]);

  if (!video) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <p>Loading video...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <VideoPlayer src={video.url} title={video.name || "Untitled Video"} />
    </div>
  );
}
