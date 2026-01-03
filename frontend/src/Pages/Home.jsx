import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import AddNote from "../components/AddNote";
import Notes from "../components/Notes";
import Hero from "../components/Hero";
import { NOTES_ENDPOINTS } from "../utils/endpoint";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { search } = useOutletContext(); // 🔑 FROM ROOT
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const fetchNotes = async () => {
      try {
        const res = await axios.get(NOTES_ENDPOINTS.GET_ALL, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data);
      } catch (err) {
        console.error("Failed to fetch notes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [isAuthenticated, token]);

  if (!isAuthenticated) {
    return <Hero />;
  }

  return (
    <>
      <div className="flex justify-center fixed w-full pt-20 z-50">
        <AddNote setNotes={setNotes} />
      </div>

      <div className="pt-40 px-20">
        <Notes
          notes={notes}
          setNotes={setNotes}
          loading={loading}
          search={search}
        />
      </div>
    </>
  );
};

export default Home;
