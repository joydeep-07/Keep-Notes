import React from "react";
import { useSelector } from "react-redux";
import NoNotes from "../components/NoNotes";
import Notes from "../components/Notes";
import AddNote from "../components/AddNote";
import NotLoggedIn from "../components/NotLoggedIn";

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <NotLoggedIn />;
  }

  return (
    <>
      <div className="flex justify-center fixed w-full pt-20 z-50">
        <AddNote />
      </div>

      <div className="pt-40 px-20">
        <Notes />
      </div>
    </>
  );
};

export default Home;
