import React, { useState,useContext } from 'react'
import {BsArrowLeftShort, BsPerson} from 'react-icons/bs'
import { LuListChecks ,LuListRestart} from "react-icons/lu";
import { FaEdit } from "react-icons/fa";
import { GiArmorUpgrade } from "react-icons/gi";
import { Link, NavLink  } from 'react-router-dom';

// const navLinks=[
//   {
//     path:'/profile/overview',
//     display:'Overview',
//     icon: <BsPerson />
//   },
//   {
//     path:'/profile/edit',
//     display:'Edit',
//     icon: <FaEdit />
//   },
//   {
//     path:'/profile/shortlisted',
//     display:'Shortlisted',
//     icon: <LuListChecks />
//   },
//   {
//     path:'/profile/shortlistedBy',
//     display:'Shortlisted By',
//     icon: <LuListRestart />
//   },
//   {
//     path:'/profile/upgrade',
//     display:'Upgrade',
//      icon: <GiArmorUpgrade />
//   }
// ]

const Sidebar = () => {
    const [open,setOpen] =useState(true)

  return (
    <div>
      <div>
        <div className={`bg-[#E460A0] h-screen p-5 text-ternaryColor pt-8 relative duration-300 ${open ? "w-72" : "w-20"}`}>
            <BsArrowLeftShort className={`bg-white text-black cursor-pointer text-3xl rounded-full absolute -right-3 
            top-9 border border-primaryColor ${!open && "rotate-180"}`} onClick={()=>setOpen(!open)}/>
           
            <ul className='pt-2'>
            <li className='text-gray-300 text-sm flex item-center gap-x-4 p-2 hover:bg-ternaryColor/50 rounded-md mt-2'>
              <span className='text-2xl block float-left'><BsPerson /></span>
              <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>Overview</span>
              </li>
              <li className='text-gray-300 text-sm flex item-center gap-x-4 p-2 hover:bg-ternaryColor/50 
              rounded-md mt-2 border-b border-b-ternaryColor'>
              <span className='text-2xl block float-left'><FaEdit /></span>
              <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}> Edit</span>
              </li>
              <li className='text-gray-300 text-sm flex item-center gap-x-4 p-2 hover:bg-ternaryColor/50 rounded-md mt-2'>
              <span className='text-2xl block float-left'><LuListChecks /></span>
              <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>Shortlisted</span>
              </li>
              <li className='text-gray-300 text-sm flex item-center gap-x-4 p-2 hover:bg-ternaryColor/50 
              rounded-md mt-2 border-b border-b-ternaryColor'>
              <span className='text-2xl block float-left'><LuListRestart /></span>
              <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>Shortlisted By</span>
              </li>
              <li className='text-gray-300 text-sm flex item-center gap-x-4 p-2 hover:bg-ternaryColor/50 rounded-md mt-2'>
              <span className='text-2xl block float-left'><GiArmorUpgrade /></span>
              <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>Upgrade</span>
              </li>
            </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
