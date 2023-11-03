import React from 'react'
import "./header.css"
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className='min-h-screen  flex items-center justify-center header '>
        <div className=''>
            <h1 className='capitalize text-center sm:text-5xl  text-4xl font-bold text-white'>welcome to the world of

              <p className='md:text-7xl text-4xl'>blog <span className='strock text-transparent italic'>writing</span></p>
              <Link aria-label="blog"  to={"/post/create"}>
              <button className='btn mt-10 opacity-80 btn-outline text-white'>
                Write Now
              </button>
              </Link>
            </h1>
        </div>
    </div>
  )
}

export default Header