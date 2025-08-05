import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function VideoCard({ title, thumbnail, videoUrl }) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef(null);

  // Close modal on Esc key
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Close modal on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === modalRef.current) setOpen(false);
  };

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.04, boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)" }}
        className="rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/60 cursor-pointer transition-all duration-200 group"
        onClick={() => setOpen(true)}
      >
        <div className="relative">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-white truncate">{title}</h3>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={modalRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl w-full max-w-2xl mx-auto p-0 sm:p-6"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-2 right-2 sm:top-4 sm:right-4 text-white bg-black/40 hover:bg-red-500/80 hover:text-white rounded-full p-2 transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
                aria-label="Close video modal"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <div className="p-4 pt-10 sm:pt-0">
                <h2 className="text-xl font-bold text-white mb-4 text-center">{title}</h2>
                <video
                  controls
                  className="w-full rounded-lg shadow-lg bg-black"
                  poster={thumbnail}
                  style={{ maxHeight: "60vh" }}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}