import React, { useEffect, useState } from "react";
import ThemeToggle from "../components/ThemeToggle";
import SearchButton from "../components/SearchButton";
import icon from "../assets/images/icon.png";
import {Link, useNavigate} from 'react-router-dom'
import { LogIn } from "lucide-react";
import UserDetail from "../components/UserDetail";

const Navbar = () => {
  const navigate = useNavigate();
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
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={"/"}>
            <div className="flex">
              {/* <img className="h-13.5" src={icon} alt="" />  */}
              <div className="flex flex-col">
                <h1 className="heading text-3xl text-[var(--accent-primary)]">
                  Keep Notes
                </h1>
                <p className="text-xs text-secondary ">
                  Keep your notes secure here.
                </p>
              </div>
            </div>
          </Link>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            <SearchButton />
            <ThemeToggle />
            <UserDetail/>

            {/* <Link to={"/register"}>Register</Link> */}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
