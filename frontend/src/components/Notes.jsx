import React from "react";
import { data } from "../assets/Data";

const Notes = () => {
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
      {data.map((item) => (
        <div
          key={item.id}
          className="
            bg-[var(--bg-secondary)]/40
            border border-[var(--border-light)]/70
            rounded-xl
            p-4
            cursor-pointer
          "
        >
          <h2
            className="
              text-xl heading
              text-[var(--accent-primary)]
              mb-2
            "
          >
            {item.title}
          </h2>

          <p
            className="
              text-xs
              text-[var(--text-secondary)]/80
              leading-relaxed
            "
          >
            {item.note}
          </p>

          <span
            className="
              block
              mt-4
              text-xs
              text-[var(--text-muted)]
            "
          >
            {item.date}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Notes;
