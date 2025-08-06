import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function VideoCard({ title, videoUrl, id, onRename, onDelete }) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleRename = (e) => {
    e.preventDefault();
    if (newTitle.trim() && newTitle !== title) {
      onRename?.(id, newTitle.trim());
    }
    setIsRenaming(false);
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.04,
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
      }}
      className="relative rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-gray-900/80 via-gray-800/80 to-gray-900/60 cursor-pointer transition-all duration-200 group"
    >
      {/* Overlay Controls */}
      <div className="absolute top-2 right-2 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Rename Button */}
        <button
          className="bg-white/80 hover:bg-yellow-300 text-gray-900 rounded-full p-1 shadow focus:outline-none"
          title="Rename"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setIsRenaming(true);
          }}
        >
          <span role="img" aria-label="Rename">✏️</span>
        </button>
        {/* Delete Button */}
        <button
          className="bg-white/80 hover:bg-red-400 text-gray-900 rounded-full p-1 shadow focus:outline-none"
          title="Delete"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            if (window.confirm("Are you sure you want to delete this video?")) {
              onDelete?.(id);
            }
          }}
        >
          <span role="img" aria-label="Delete">🗑️</span>
        </button>
      </div>

      <Link to={isRenaming ? "#" : `/watch/${id}`} tabIndex={isRenaming ? -1 : 0}>
        <div className="relative w-full h-48 bg-black">
          <video
            src={videoUrl}
            muted
            preload="metadata"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
        <div className="p-4">
          {isRenaming ? (
            <form
              className="flex items-center gap-2"
              onSubmit={handleRename}
              onClick={e => e.stopPropagation()}
            >
              <input
                autoFocus
                className="bg-gray-800 text-white rounded px-2 py-1 w-full outline-none border border-yellow-400"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                onBlur={handleRename}
                maxLength={100}
              />
              <button
                type="submit"
                className="bg-yellow-400 text-black px-2 py-1 rounded font-bold"
              >
                Save
              </button>
              <button
                type="button"
                className="bg-gray-600 text-white px-2 py-1 rounded"
                onClick={e => {
                  e.stopPropagation();
                  setIsRenaming(false);
                  setNewTitle(title);
                }}
              >
                Cancel
              </button>
            </form>
          ) : (
            <h3 className="font-semibold text-lg text-white truncate">{title}</h3>
          )}
        </div>
      </Link>
    </motion.div>
  );
}