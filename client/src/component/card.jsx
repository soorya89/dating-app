import React ,{useContext}from 'react'
import { BsGenderFemale } from "react-icons/bs";
import { FaGlassCheers,FaBirthdayCake  } from "react-icons/fa";
import { PiCigaretteFill } from "react-icons/pi";
import { LiaCertificateSolid } from "react-icons/lia";
import { MdOutlineInterests } from "react-icons/md";
import { authContext } from '../context/AuthContext';

const Overview = () => {
    const { user, token } = useContext(authContext);
  return (
    <div className="w-96 border rounded-lg shadow-lg font-sans mx-auto">
      <div className="bg-gray-100 p-4 text-center">
        <h2 className="text-lg font-semibold">My Basics</h2>
      </div>
      <div className="p-4 text-center">
        <img
          src="https://via.placeholder.com/200"
          alt="Profile"
          className="w-100 h-100 mx-auto"
        />
      </div>
      <div className="px-4 pb-4">
       
        <div className="grid grid-cols-2 gap-2 text-sm">
          <p className="flex items-center">
            <i className="fas fa-ruler mr-2"></i>
            <span className='text-base font-medium flex-1'>{user?.age}</span>
          </p>
          <p className="flex items-center">
          <span className='text-2xl block float-left'><BsGenderFemale /></span>
          <span className='text-base font-medium flex-1 ml-4'>{user?.gender}</span>
          </p>
          <p className="flex items-center">
          <span className='text-2xl block float-left'><FaGlassCheers /></span>
          <span className='text-base font-medium flex-1 ml-4'>{user?.drinking}</span>
          </p>
          <p className="flex items-center">
          <span className='text-2xl block float-left'><PiCigaretteFill /></span>
          <span className='text-base font-medium flex-1 ml-4'>{user?.smoking}</span>
          </p>
          <p className="flex items-center">
          <span className='text-2xl block float-left'><LiaCertificateSolid /> </span>
          <span className='text-base font-medium flex-1 ml-4'>{user?.qualification}</span>
          </p>
          <p className="flex items-center">
          <span className='text-2xl block float-left'><FaBirthdayCake /> </span>
          <span className='text-base font-medium flex-1 ml-4'>{user?.dob}</span>
          </p>
          <p className="flex items-center">
          <span className='text-2xl block float-left'><MdOutlineInterests /> </span>
          <span className='text-base font-medium flex-1 ml-4'>{user?.interest}</span>
          </p>
          <p className="flex items-center">
          
          <span className='text-base font-medium flex-1 ml-4'>{user?.employmentType}</span>
          </p>
          
        </div>
      </div>
    </div>
  )
}

export default Overview

