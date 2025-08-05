import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaTwitter, FaGithub, FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle sending the form data to your backend or email service
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 py-12 px-4 flex items-center">
      <div className="max-w-3xl mx-auto w-full">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-glow animate-fadeIn">
          ✉️ Contact VideoHub
        </h1>
        <div className="bg-gray-900 bg-opacity-80 rounded-2xl shadow-2xl p-8 sm:p-12 text-white transition-shadow hover:shadow-pink-400/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Contact Form */}
            <form
              className="flex flex-col gap-5"
              onSubmit={handleSubmit}
              autoComplete="off"
              aria-label="Contact form"
            >
              <label className="flex flex-col gap-1">
                <span className="font-semibold text-yellow-400">Name</span>
                <input
                  type="text"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="rounded-lg px-4 py-2 bg-gray-800 bg-opacity-70 border border-gray-700 focus:border-pink-400 focus:ring-2 focus:ring-pink-400/30 outline-none transition-all text-white placeholder-gray-400"
                  placeholder="Your Name"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-semibold text-pink-400">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="rounded-lg px-4 py-2 bg-gray-800 bg-opacity-70 border border-gray-700 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/30 outline-none transition-all text-white placeholder-gray-400"
                  placeholder="you@email.com"
                />
              </label>
              <label className="flex flex-col gap-1">
                <span className="font-semibold text-purple-400">Message</span>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="rounded-lg px-4 py-2 bg-gray-800 bg-opacity-70 border border-gray-700 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 outline-none transition-all text-white placeholder-gray-400 resize-none"
                  placeholder="How can we help you?"
                />
              </label>
              <button
                type="submit"
                className="mt-2 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-black font-bold shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-pink-400/50"
                disabled={submitted}
              >
                <FaPaperPlane />
                {submitted ? "Sent!" : "Send Message"}
              </button>
              {submitted && (
                <span className="text-green-400 text-sm mt-2 animate-fadeIn">
                  Thank you! Your message has been sent.
                </span>
              )}
            </form>
            {/* Contact Info & Socials */}
            <div className="flex flex-col justify-center gap-6">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-yellow-400 text-2xl" />
                <a
                  href="mailto:support@videohub.com"
                  className="hover:underline text-gray-200"
                >
                  support@videohub.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-pink-400 text-2xl" />
                <a
                  href="tel:+1234567890"
                  className="hover:underline text-gray-200"
                >
                  +91 (600) 5310-237
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaTwitter className="text-blue-400 text-2xl" />
                <a
                  href="https://twitter.com/videohub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-gray-200"
                >
                  @VideoHub
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaGithub className="text-purple-400 text-2xl" />
                <a
                  href="https://github.com/videohub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline text-gray-200"
                >
                  github.com/videohub
                </a>
              </div>
              <div className="mt-4 text-gray-400 text-sm">
                We typically respond within 24 hours. For urgent issues, please use email or phone.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}