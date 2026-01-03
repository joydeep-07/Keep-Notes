import React from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-[var(--bg-main)] border-t border-[var(--border-light)]">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">
          {/* Brand Section */}
          <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/">
              <h1 className="heading tracking-wide uppercase text-2xl text-[var(--text-main)]">
                Keep Notes
              </h1>
            </Link>

            <div className="w-full max-w-52 h-px mt-2 bg-linear-to-r from-[var(--text-main)]/40 via-[var(--text-main)]/20 to-transparent"></div>

            <p className="text-sm text-[var(--text-secondary)] mt-6 max-w-sm leading-relaxed">
              Keep Notes helps you securely create, organize, edit, and manage
              your notes in one place with a smooth and reliable experience.
            </p>
          </div>

          {/* Important Links */}
          <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-medium text-[var(--text-main)]">
              Explore
            </h3>
            <div className="flex flex-col gap-2 mt-6">
              {[
                "My Notes",
                "Create Note",
                "Edit Notes",
                "Archived Notes",
                "Help & Support",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Developer Links */}
          <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-medium text-[var(--text-main)]">
              Developer
            </h3>
            <div className="flex flex-col gap-2 mt-6">
              <a
                href="https://www.linkedin.com/in/joydeep-paul-06b37926a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/joydeep-07"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                GitHub
              </a>
              <a
                href="mailto:joydeeprnp8821@gmail.com"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                Email
              </a>
            </div>
          </div>

          {/* Social Icons */}
          <div className="w-full md:w-[45%] lg:w-[25%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-medium text-[var(--text-main)]">
              Connect with me
            </h3>

            <div className="flex items-center gap-5 mt-6">
              <a
                href="https://github.com/joydeep-07"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/joydeep-paul-06b37926a"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/mr.paul_16"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-xl text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px mt-16 mb-4 bg-[var(--border-light)]"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-secondary)]">
            © 2025 Keep Notes. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
            >
              Terms & Conditions
            </a>
            <div className="w-px h-4 bg-[var(--border-light)]"></div>
            <a
              href="#"
              className="text-xs text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
