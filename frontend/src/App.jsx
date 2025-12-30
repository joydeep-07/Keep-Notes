import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import ThemeToggle from "./components/ThemeToggle";
const App = () => {
  const { mode } = useSelector((state) => state.theme);

  useEffect(() => {
    if (mode === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [mode]);

  return (
    <>
      <div>
        <ThemeToggle/>
        <h1 className="text-6xl heading font-light text-center pt-35">Hello World</h1>
      </div>
    </>
  );
};

export default App;
