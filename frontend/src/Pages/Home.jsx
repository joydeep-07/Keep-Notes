import React, { useState } from "react";
import NoNotes from "../components/NoNotes";
import Notes from "../components/Notes";
import AddNote from "../components/AddNote";
import NotLoggedIn from "../components/NotLoggedIn";
import {data} from '../assets/Data'

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [isDataAvailable, setIsDataAvailable] = useState(false);

  if (!isLoggedIn) {
    return <NotLoggedIn />;
  }


  return (
    <>
      <div className="flex justify-center items-center fixed z-70 w-full pt-20">
        <AddNote />
      </div>

      {data.length == 0 ? (
        <NoNotes />
      ) : (
        <div className="pt-40 z-10 px-20">
          <Notes />
        </div>
      )}
    </>
  );
};

export default Home;
