import { Lightbulb } from "lucide-react";
import React from "react";

const NoNotes = () => {
  return (
    <>
      <div className=" h-screen flex justify-center items-center pt-40 flex-col gap-10">
        <Lightbulb size={150} className="text-[var(--text-secondary)]/20 " />

        <div className="text-[var(--text-secondary)]/70 uppercase text-2xl">
          No Notes Available
        </div>
      </div>
    </>
  );
};

export default NoNotes;
