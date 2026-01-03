import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Root = () => {
  // 🔍 GLOBAL SEARCH STATE
  const [search, setSearch] = useState("");

  return (
    <div>
      <Navbar search={search} setSearch={setSearch} />
      <Outlet context={{ search }} />
    </div>
  );
};

export default Root;
