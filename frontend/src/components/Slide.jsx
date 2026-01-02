import React from "react";

const Slide = ({ items = [], speed = 20 }) => {
  return (
    <div className="w-full overflow-hidden">
      <div
        className="flex w-max marquee"
        style={{ animationDuration: `${speed}s` }}
      >
        {[...items, ...items, ...items, ...items, ...items].map(
          (item, index) => (
            <div
              key={index}
              className="px-8 flex items-center gap-3 flex-shrink-0 whitespace-nowrap text-lg text-[var(--text-main)]"
            >
              {/* Icon */}
              <span className="text-xl text-[var(--accent-primary)]">
                {item.icon}
              </span>

              {/* Text */}
              <span>{item.name}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Slide;
