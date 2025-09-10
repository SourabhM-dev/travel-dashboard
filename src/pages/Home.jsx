import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <section className="relative flex flex-col items-center justify-center min-h-[80vh] text-center px-6 overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Plan your <span className="text-blue-600">perfect trip</span>
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl text-gray-600 max-w-2xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        Find cheapest and easiest trips ever to different parts of the World.
      </motion.p>

      <motion.div
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <Link
          to="/trips"
          className="px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-xl shadow hover:bg-blue-700 transition"
        >
          View Trips
        </Link>
        <Link
          to="/dashboard"
          className="px-6 py-3 text-lg font-medium border border-gray-400 rounded-xl shadow hover:bg-gray-100 transition"
        >
          Dashboard
        </Link>
      </motion.div>
    </section>
  );
}
