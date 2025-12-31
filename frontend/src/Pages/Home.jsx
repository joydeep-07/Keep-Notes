import React, { useState } from 'react'
import NoNotes from '../components/NoNotes'
import Notes from '../components/Notes'

const Home = () => {

    const [isData, setIsData] = useState(false)

  return !isData ? (
    <div>
        <NoNotes/>
    </div>
  ) : (
    <>
    <Notes/>
    </>
  )
}

export default Home