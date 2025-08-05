import React from "react";
import { FaUpload, FaLink, FaDownload, FaPlayCircle, FaRocket } from "react-icons/fa";

export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-12 px-4 flex items-center">
      <div className="max-w-4xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-glow animate-fadeIn">
          📺 About VideoHub
        </h1>
        <div className="bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl p-8 sm:p-12 text-white transition-shadow hover:shadow-yellow-400/30">
          <p className="mb-8 text-lg sm:text-xl text-gray-200 text-center">
            <span className="font-semibold text-yellow-400">VideoHub</span> is your all-in-one platform for managing and enjoying videos. Upload, organize, watch, and download your favorite content with ease—anytime, anywhere.
          </p>
          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            <Feature
              icon={<FaUpload className="text-yellow-400 text-3xl" />}
              title="Upload Videos"
              desc="Keep your personal videos safe, organized, and accessible from any device."
            />
            <Feature
              icon={<FaLink className="text-pink-400 text-3xl" />}
              title="Paste Links"
              desc="Watch videos from YouTube and other platforms by simply pasting a link."
            />
            <Feature
              icon={<FaDownload className="text-purple-400 text-3xl" />}
              title="Download for Offline"
              desc="Save videos for offline viewing—perfect for travel or limited connectivity."
            />
            <Feature
              icon={<FaPlayCircle className="text-blue-400 text-3xl" />}
              title="Seamless Playback"
              desc="Enjoy smooth playback of both local and online videos in one beautiful interface."
            />
          </div>
          {/* How it works */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-center mb-4 text-yellow-300">How It Works</h2>
            <ol className="list-decimal list-inside space-y-2 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              <li>Sign up or log in to your VideoHub account.</li>
              <li>Upload your videos or paste a link to your favorite online content.</li>
              <li>Organize your library with tags and playlists.</li>
              <li>Watch instantly or download for offline access.</li>
            </ol>
          </div>
          {/* Call to Action */}
          <div className="flex flex-col items-center gap-4">
            <FaRocket className="text-4xl text-pink-400 animate-bounce" />
            <p className="text-lg font-semibold text-center">
              Ready to take control of your video experience?
            </p>
            <a
              href="/signup"
              className="mt-2 px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black font-bold shadow-lg hover:scale-105 transition-transform"
            >
              Get Started with VideoHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-4 bg-gray-800 bg-opacity-70 rounded-xl p-5 shadow hover:shadow-pink-400/20 transition-shadow">
      <div>{icon}</div>
      <div>
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-300 text-base">{desc}</p>
      </div>
    </div>
  );
}