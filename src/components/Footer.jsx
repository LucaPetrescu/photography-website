import React from "react";
import { FaInstagram } from "react-icons/fa";

function Footer() {
  return (
    <footer className="text-black text-center p-4">
      <div className="flex justify-center items-center">
        <a
          href="https://instagram.com/lucahaznikon"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          <FaInstagram style={{ color: "black", fontSize: "50px" }} />
        </a>
      </div>

      {/* Footer Text */}
      <p className="mt-4">&copy; 2024 LucasLens. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
