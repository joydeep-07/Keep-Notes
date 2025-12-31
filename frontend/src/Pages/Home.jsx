import React, { useState } from 'react'
import NoNotes from '../components/NoNotes'
import Notes from '../components/Notes'
import AddNote from '../components/AddNote'

const Home = () => {

    const [isDataAvailable, setIsDataAvailable] = useState(false);

  return !isDataAvailable ? (
    <div>
      <div className="flex justify-center items-center fixed w-full pt-20">
        <AddNote />
      </div>
      <NoNotes />
    </div>
  ) : (
    <>
      <div className="flex justify-center items-center fixed w-full pt-20">
        <AddNote />
      </div>
      <Notes />
    </>
  );
}

export default Home