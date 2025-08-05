import { useRef, useState } from "react";

export default function VideoPlayer({ src, title }) {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  // Format seconds as mm:ss
  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // Handlers
  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleSeek = (e) => {
    const time = Number(e.target.value);
    videoRef.current.currentTime = time;
    setCurrent(time);
  };

  const handleVolume = (e) => {
    const v = Number(e.target.value);
    videoRef.current.volume = v;
    setVolume(v);
  };

  const handleFullscreen = () => {
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section className="w-full flex justify-center items-center py-8 px-2">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-4 sm:p-8 transition-all duration-200">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-glow">
          {title}
        </h2>
        <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg border border-white/10 bg-black/80 transition-transform duration-200 hover:scale-[1.01] hover:shadow-2xl mb-4">
          <video
            ref={videoRef}
            className="w-full h-full object-contain rounded-xl"
            controls={false}
            poster="/video-poster.jpg"
            tabIndex={0}
            src={src}
            onLoadedMetadata={(e) => setDuration(e.target.duration)}
            onTimeUpdate={(e) => setCurrent(e.target.currentTime)}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
          />
        </div>

        {/* Custom Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Play/Pause */}
          <button
            onClick={handlePlayPause}
            className="bg-gradient-to-r from-yellow-400 to-pink-400 text-black font-bold px-4 py-2 rounded-lg shadow hover:scale-105 transition"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? "Pause" : "Play"}
          </button>

          {/* Seek Bar */}
          <input
            type="range"
            min={0}
            max={duration}
            value={current}
            onChange={handleSeek}
            className="flex-1 accent-pink-400"
          />

          {/* Time */}
          <span className="text-white font-mono text-sm w-20 text-center">
            {formatTime(current)} / {formatTime(duration)}
          </span>

          {/* Volume */}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={handleVolume}
            className="w-24 accent-yellow-400"
            aria-label="Volume"
          />

          {/* Fullscreen */}
          <button
            onClick={handleFullscreen}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-black font-bold px-3 py-2 rounded-lg shadow hover:scale-105 transition"
            aria-label="Fullscreen"
          >
            ⛶
          </button>

          {/* Download */}
          <a
            href={src}
            download
            className="bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold px-4 py-2 rounded-lg shadow hover:scale-105 transition ml-2"
            aria-label="Download video"
          >
            Download
          </a>
        </div>
      </div>
    </section>
  );
}