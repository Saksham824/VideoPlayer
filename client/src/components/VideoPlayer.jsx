import { useRef, useState } from "react";

// SVG Icons (inline for simplicity)
const PlayIcon = (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="6,4 20,12 6,20" fill="currentColor" />
  </svg>
);
const PauseIcon = (
  <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="4" width="4" height="16" fill="currentColor" />
    <rect x="14" y="4" width="4" height="16" fill="currentColor" />
  </svg>
);
const VolumeIcon = (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9v6h4l5 5V4l-5 5H3z" />
  </svg>
);
const FullscreenIcon = (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3h6M3 3v6M17 3h-6M17 3v6M3 17h6M3 17v-6M17 17h-6M17 17v-6" />
  </svg>
);
const DownloadIcon = (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 19h14" />
  </svg>
);

export default function VideoPlayer({ src, title }) {
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  // Format seconds as mm:ss
  const formatTime = (s) => {
    if (!s || isNaN(s)) return "0:00";
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
    <section className="w-full flex justify-center items-center py-6 px-2 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-[60vh]">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-3 sm:p-6 transition-all duration-200">
        <h2 className="text-xl sm:text-2xl font-extrabold mb-4 text-center bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent drop-shadow-glow">
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
        <div className="flex flex-col gap-4 sm:gap-3 sm:flex-row items-center justify-between">
          {/* Play/Pause */}
          <button
            onClick={handlePlayPause}
            className="flex items-center justify-center bg-gradient-to-r from-yellow-400 to-pink-400 text-black font-bold px-3 py-2 rounded-lg shadow hover:scale-105 focus:ring-2 focus:ring-pink-400 transition"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? PauseIcon : PlayIcon}
          </button>

          {/* Seek Bar with Progress */}
          <div className="flex-1 flex flex-col mt-5 items-center mx-2 w-full">
            <input
              type="range"
              min={0}
              max={duration}
              value={current}
              onChange={handleSeek}
              className="w-full accent-pink-400 h-2 rounded-lg appearance-none bg-gray-300/30"
              aria-label="Seek"
            />
            <div className="flex justify-between w-full text-xs text-gray-300 mt-1 font-mono">
              <span>{formatTime(current)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <span className="text-yellow-400">{VolumeIcon}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolume}
              className="w-20 accent-yellow-400"
              aria-label="Volume"
            />
          </div>

          {/* Fullscreen */}
          <button
            onClick={handleFullscreen}
            className="flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-400 text-black font-bold px-2 py-2 rounded-lg shadow hover:scale-105 focus:ring-2 focus:ring-purple-400 transition"
            aria-label="Fullscreen"
          >
            {FullscreenIcon}
          </button>

          {/* Download */}
          <a
            href={src}
            download
            className="flex items-center gap-1 bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold px-3 py-2 rounded-lg shadow hover:scale-105 focus:ring-2 focus:ring-blue-400 transition ml-1"
            aria-label="Download video"
          >
            {DownloadIcon}
            <span className="hidden sm:inline">Download</span>
          </a>
        </div>
      </div>
    </section>
  );
}