import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, UserPlus, ImageIcon, Pen } from "lucide-react";
import { IoLink } from "react-icons/io5";
import { FaPenNib } from "react-icons/fa";

const AddNote = () => {
    const [add, setAdd] =useState(false)
  const [text, setText] = useState("");
  const [height, setHeight] = useState("auto");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to recalc scrollHeight
      textareaRef.current.style.height = "auto";
      setHeight(textareaRef.current.scrollHeight + "px");
    }
  }, [text]);

  const toggleAdd = () => {
    if (!add) {
        setAdd(true)
    }else{
        setAdd(false)
    }
  }

  return !add ? (
    <>
      <div
        onClick={toggleAdd}
        className="border py-2 px-5 w-xl flex rounded-lg border border-[var(--border-light)] justify-between items-center"
      >
        <p>Take a Note. </p>
        <FaPenNib size={16} />
      </div>
    </>
  ) : (
    <>
      <div className="bg-gray-800 text-gray-100 rounded-lg shadow-md p-4 w-full max-w-xl mx-auto">
        {/* Title */}
        <input
          type="text"
          placeholder="Event Title"
          className="w-full bg-gray-800 border-b border-gray-600 text-white placeholder-gray-400 py-2 px-1 focus:outline-none"
        />

        {/* Description */}
        <motion.textarea
          ref={textareaRef}
          placeholder="Describe the event..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full bg-gray-800 border-b border-gray-600 text-white placeholder-gray-400 py-2 px-1 mt-3 resize-none focus:outline-none overflow-hidden"
          style={{ height }}
          animate={{ height }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          rows={1} // start as one line
        />

        {/* Footer */}
        <div className="flex justify-end mt-4">
          <button className="text-blue-400 hover:text-blue-600 font-medium">
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default AddNote;
