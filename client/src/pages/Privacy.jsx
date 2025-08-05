import React from "react";
import { FaLock, FaUserShield, FaRegClock, FaDatabase } from "react-icons/fa";

export default function Privacy() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-12 px-4 flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-glow animate-fadeIn">
          <FaLock className="inline-block mr-2 mb-1" />
          Privacy Policy
        </h1>
        <div className="bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl p-8 sm:p-12 text-white transition-shadow hover:shadow-pink-400/30">
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-yellow-400 flex items-center gap-2 mb-2">
              <FaUserShield /> Your Privacy Matters
            </h2>
            <p className="text-gray-200 text-base">
              At <span className="font-semibold text-pink-400">VideoHub</span>, we are committed to protecting your privacy and ensuring your personal information is handled safely and responsibly. This policy explains what data we collect, how we use it, and your rights.
            </p>
          </section>
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-purple-400 mb-2 flex items-center gap-2">
              <FaDatabase /> What We Collect
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>
                <span className="font-semibold text-yellow-400">Account Info:</span> Name, email, and password (encrypted).
              </li>
              <li>
                <span className="font-semibold text-pink-400">Uploaded Videos:</span> Files you upload and related metadata.
              </li>
              <li>
                <span className="font-semibold text-purple-400">Usage Data:</span> How you interact with VideoHub (for improving our service).
              </li>
            </ul>
          </section>
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-pink-400 mb-2 flex items-center gap-2">
              <FaRegClock /> How We Use Your Data
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>To provide and improve our video management features.</li>
              <li>To personalize your experience and recommend content.</li>
              <li>To communicate important updates or support messages.</li>
              <li>We <span className="font-semibold text-yellow-400">never</span> sell your data to third parties.</li>
            </ul>
          </section>
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-blue-400 mb-2">Your Rights & Choices</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-300">
              <li>Access, update, or delete your account at any time.</li>
              <li>Request a copy of your data or ask us to erase it.</li>
              <li>Contact us for any privacy-related questions or concerns.</li>
            </ul>
          </section>
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-yellow-400 mb-2">Data Security</h3>
            <p className="text-gray-200">
              We use industry-standard encryption and security practices to keep your data safe. Only authorized personnel can access your information.
            </p>
          </section>
          <section className="mb-8">
            <h3 className="text-xl font-semibold text-pink-400 mb-2">Policy Updates</h3>
            <p className="text-gray-200">
              We may update this policy from time to time. We’ll notify you of significant changes via email or in-app notification.
            </p>
          </section>
          <div className="mt-8 text-center text-gray-400 text-sm">
            Last updated: August 2025 &nbsp;|&nbsp; For questions, contact us at{" "}
            <a
              href="mailto:support@videohub.com"
              className="text-yellow-400 hover:underline"
            >
              support@videohub.com
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}