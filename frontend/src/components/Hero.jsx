import { ArrowUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../layouts/Footer";

const Hero = () => {


  const navigate = useNavigate();

  return (
    <>
      <div className="items-center justify-center pt-20">
        <div className="flex flex-col justify-center items-center w-full px-4 sm:px-6 lg:px-8">
          <div className="main flex flex-col gap-5 w-full max-w-7xl mx-auto">
            <h2 className="text-xs sm:text-sm py-4 sm:py-5 px-3 sm:px-4 uppercase flex items-center gap-2 sm:gap-3 w-full">
              <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[var(--accent-primary)] animate-pulse flex-shrink-0"></span>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] opacity-70">
                Keeps Your Note Secure
              </p>
            </h2>

            <h1 className="text-3xl main-heading sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl heading-font font-medium text-[var(--text-main)]">
              Effortlessly{" "}
              <span className="text-[var(--accent-primary)] bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-text text-transparent">
                manage <br className="hidden sm:block" /> your notes
              </span>{" "}
              with speed <br className="hidden sm:block" /> & security.
            </h1>
          </div>
        </div>

        {/* Description Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center mt-4 sm:mt-6 md:mt-8 gap-3 px-4 sm:px-6 lg:px-8">
          <div className="hidden sm:block border-b border-[var(--border-light)] w-full max-w-2xl mr-4 sm:mr-7"></div>

          <p className="text-[var(--text-main)] text-xs sm:text-sm md:text-base leading-snug max-w-4xl text-center sm:text-left">
            Create, read, update, and delete your notes in one secure place,
            <br className="hidden sm:block" />
            with seamless access across your sessions.
          </p>
        </div>

        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 sm:px-6 lg:px-8 xl:px-[100px] py-10 sm:py-12 md:py-15 gap-6 sm:gap-4 md:gap-6"
          data-aos="fade-up"
          data-aos-delay="450"
        >
          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-3 md:gap-5 py-2 sm:py-5 w-full sm:w-auto px-1 sm:px-3 group">
            {[
              { name: "Fast" },
              { name: "Secure" },
              { name: "Organized" },
              { name: "Easy Access" },
            ].map((item) => (
              <button
                key={item.name}
                className="flex items-center gap-1 sm:gap-2 text-[var(--text-main)] text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-medium uppercase transition-opacity duration-300 hover:opacity-100 group-hover:opacity-50 flex-shrink-0 px-1 sm:px-0"
              >
                <ArrowUp className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 rotate-45 flex-shrink-0" />
                <span className="whitespace-nowrap">{item.name}</span>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="w-full sm:w-auto flex justify-center sm:justify-end">
            <button
              onClick={() => navigate("/login")}
              className="relative overflow-hidden px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 rounded-full font-medium tracking-[0.1em] text-[var(--text-main)] hover:text-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/5 backdrop-blur-md border border-[var(--border-light)] hover:border-[var(--accent-primary)]/20 shadow-sm transition-all duration-500 ease-out group w-full sm:w-auto"
            >
              <span className="flex items-center space-x-2 text-[10px] sm:text-xs opacity-100 translate-y-0 uppercase">
                Get Started
              </span>
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Hero;
