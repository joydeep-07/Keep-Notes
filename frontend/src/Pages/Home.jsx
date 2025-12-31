import React, { useState } from "react";
import NoNotes from "../components/NoNotes";
import Notes from "../components/Notes";
import AddNote from "../components/AddNote";
import NotLoggedIn from "../components/NotLoggedIn";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // 🔑 auth state
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  // 🔒 NOT LOGGED IN
  if (!isLoggedIn) {
    return <NotLoggedIn />;
  }

  // ✅ LOGGED IN
  return (
    <>
      <div className="flex justify-center items-center fixed w-full pt-20">
        <AddNote />
      </div>

      {!isDataAvailable ? <NoNotes /> : <Notes />}
    </>
  );
};

export default Home;
