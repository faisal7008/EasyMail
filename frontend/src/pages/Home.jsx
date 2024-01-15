import React from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <>
    <div className="flex h-screen">
        <Sidebar/>
      <div className="flex flex-col grow h-full">
        <Navbar/>
        {/* <div className="w-1/5 "><Sidebar/></div> */}
        <div className="grow pr-2 pb-2"><Outlet/></div>
      </div>
      </div>

    </>
  )
}

export default Home