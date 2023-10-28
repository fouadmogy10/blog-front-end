import React from 'react'
import { Link } from 'react-router-dom'

const Title = () => {
  return (
    <div className="flex pt-10 pb-5 justify-between items-center flex-wrap gap-4">
    <h2 className="text-4xl capitalize  font-bold">Latest Posts</h2>
    <Link to={"/blogs"} className="btn bg-white shadow-2xl text-xl capitalize font-bold text-black rounded-2xl btn-wide max-w-sm">More</Link>
    
  </div>
  )
}

export default Title