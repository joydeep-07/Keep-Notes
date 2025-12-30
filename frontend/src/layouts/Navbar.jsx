import React, { useState, useEffect } from "react";
import { Menu, X, Search, User, ShoppingCart, Moon, Sun } from "lucide-react";
import ThemeToggle from "../components/ThemeToggle";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[var(--bg-secondary)] backdrop-blur-md border-b border-[var(--border-light)] shadow-lg"
          : "bg-gradient-to-r from-transparent via-transparent to-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex justify-center flex-col">
            <h1 className="heading text-3xl text-[var(--accent-primary)] ">
              Keep Notes
            </h1>
            <p className="text-xs text-[var(--text-secondary)] ">
              Keep your notes secure here.
            </p>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors">
              <Search className="w-4 h-4 text-[var(--text-secondary)]" />
            </button>

            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-[var(--text-main)]" />
              ) : (
                <Menu className="w-6 h-6 text-[var(--text-main)]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-[var(--border-light)] mt-2 pt-4 pb-6">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors duration-200 py-2 px-4 hover:bg-[var(--bg-secondary)] rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile additional actions */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--border-light)]">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-[var(--text-secondary)]">
                    <User className="w-5 h-5" />
                    <span>Account</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
