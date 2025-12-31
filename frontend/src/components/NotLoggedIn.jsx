import React from 'react'
import { Link } from 'react-router-dom'
import AuthImagePattern from './AuthImagePattern'

const NotLoggedIn = () => {
  return (
    <div className='flex flex-col gap-10 justify-center items-center h-screen'>
       
        <h1 className='text-center uppercase text-2xl'>Please Login First</h1>
        <Link to={"/login"} 
        className='py-1 px-5 rounded-lg bg-[var(--accent-primary)] text-white '
        >
        Login
        </Link>
    </div>
  )
}

export default NotLoggedIn