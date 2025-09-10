import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mt-12 bg-gray-900 text-gray-300 py-6 text-center shadow-inner"
    >
      <p className="text-lg font-semibold mb-2">
        Built with ❤️ by <span className="text-white">Sourabh Mishra</span>
      </p>
      <div className="flex justify-center gap-6 text-xl">
        <a
          href="https://github.com/SourabhM-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-white transition-colors"
        >
          <FaGithub />
        </a>
        <a
          href="mailto:sourabh230572@gmail.com"
          className="hover:text-white transition-colors"
        >
          <FaEnvelope />
        </a>
      </div>
    </motion.footer>
  );
}
