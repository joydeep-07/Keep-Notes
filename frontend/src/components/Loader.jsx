import React from "react";

const Loader = () => {
  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-2 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        gap-5
      "
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="
            bg-[var(--bg-secondary)]/40
            border border-[var(--border-light)]/60
            rounded-xl
            p-4
            animate-pulse
            flex
            flex-col
          "
        >
          {/* Title skeleton */}
          <div className="h-5 w-3/4 bg-[var(--border-light)]/60 rounded mb-3"></div>

          {/* Preview lines */}
          <div className="space-y-2 flex-grow">
            <div className="h-3 w-full bg-[var(--border-light)]/50 rounded"></div>
            <div className="h-3 w-5/6 bg-[var(--border-light)]/50 rounded"></div>
            <div className="h-3 w-2/3 bg-[var(--border-light)]/50 rounded"></div>
          </div>

          {/* Footer */}
          <div className="mt-5 h-2 w-1/3 bg-[var(--border-light)]/40 rounded"></div>
        </div>
      ))}
    </div>
  );
};

export default Loader;
