import React from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">
            {/* Brand Section */}
            <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
              <h1 className="text-3xl font-cinematic">
                Book
                <span className="font-cinematic text-red-500/95 mx-1">My</span>
                Ticket
              </h1>
              <div className="w-full max-w-52 h-px mt-2 bg-linear-to-r from-white/60 via-white/25 to-black"></div>
              <p className="text-sm text-white/60 mt-6 max-w-sm leading-relaxed">
                BookMyTicket lets you discover movies, choose your favorite
                seats, and book cinema tickets instantly with a smooth and
                secure experience.
              </p>
            </div>

            {/* Important Links */}
            <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-sm text-white font-medium">Explore</h3>
              <div className="flex flex-col gap-2 mt-6">
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Now Showing
                </a>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Upcoming Movies
                </a>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Cinemas
                </a>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  My Bookings
                </a>
                <a
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Help & Support
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-sm text-white font-medium"> Developer</h3>
              <div className="flex flex-col gap-2 mt-6">
                <a
                  href="https://www.linkedin.com/in/joydeep-paul-06b37926a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>

                <a
                  href="https://github.com/joydeep-07"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  GitHub
                </a>

                <a
                  href="https://www.instagram.com/mr.paul_16"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Instagram
                </a>

                <a
                  href="mailto:joydeeprnp8821@gmail.com"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Gmail
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="w-full md:w-[45%] lg:w-[25%] flex flex-col items-center md:items-start text-center md:text-left">
              <h3 className="text-sm text-white font-medium">
                Get movie updates & offers
              </h3>
              <div className="flex items-center border gap-2 border-white/20 h-13 max-w-80 w-full rounded-full overflow-hidden mt-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full h-full pl-6 outline-none text-sm bg-transparent text-white placeholder-white/60 placeholder:text-xs"
                  required
                />
                <button
                  type="submit"
                  className="bg-linear-to-r from-primary/70 to-primary active:scale-95 transition w-56 h-10 rounded-full text-sm text-white cursor-pointer mr-1.5"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px mt-16 mb-4 bg-linear-to-r from-black via-white/25 to-black"></div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/60">
              © 2025 BookMyTicket. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                Terms & Conditions
              </a>
              <div className="w-px h-4 bg-white/20"></div>
              <a
                href="#"
                className="text-xs text-white/60 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
