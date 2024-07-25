import React, { useState, useContext } from 'react';
import { BsGenderFemale } from "react-icons/bs";
import { FaGlassCheers, FaBirthdayCake } from "react-icons/fa";
import { PiCigaretteFill } from "react-icons/pi";
import { LiaCertificateSolid } from "react-icons/lia";
import { MdOutlineInterests } from "react-icons/md";
import { authContext } from '../../context/AuthContext';
import { format } from 'date-fns';
import CustomModal from '../Modal';
import UpdateProfile from './UpdateProfile';
import UpdatePhoto from './UpdatePhoto';
import useFetchData from '../../hooks/useFetchData';
import { BASE_URL } from '../../config';

const Overview = () => {
  const [tab, setTab] = useState('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(authContext);

  const { data, loading, error, refetch } = useFetchData(`${BASE_URL}/user/profile/me`);
console.log(data,"...........");
  const formattedDate = data?.dob ? format(new Date(data.dob), 'MMMM dd, yyyy') : '';

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleProfileUpdate = () => {
    // Call refetch and then close the modal
    // Assume `refetch` is available here
    refetch().then(() => handleCloseModal());
};

  return (
    <div>
      <div className='border-b-2'>
        
          <div className="p-4 flex">
            <div>
              <img
                src={data?.profilePic}
                alt="Profile"
                className="w-[200px] h-[200px] rounded-full cursor-pointer overflow-hidden object-cover object-center"
              />
            </div>
            <div className='p-10 flex-auto'>
              <h1 className="font-bold dark:text-white mb-2 text-xl">{data?.name}</h1>
              <div>
                <i className="fas fa-ruler mr-2"></i>
                <span className='text-base font-medium flex-1'>{data?.age}</span>

                <span className='text-2xl block float-left'><BsGenderFemale /></span>
                <span className='text-base font-medium flex-1 ml-4'>{data?.gender}</span>
              </div>
              <button
                type="button"
                className="text-white bg-blue-700 my-5 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={handleOpenModal}
              >
                Update Profile
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm p-5">
              <p className="flex items-center border-b-2">
                <span className='text-2xl block float-left'><FaGlassCheers /></span>
                <span className='text-base font-medium flex-1 ml-4'>{data?.drinking}</span>
              </p>
              <p className="flex items-center border-b-2">
                <span className='text-2xl block float-left'><PiCigaretteFill /></span>
                <span className='text-base font-medium flex-1 ml-4'>{data?.smoking}</span>
              </p>
              <p className="flex items-center border-b-2">
                <span className='text-2xl block float-left'><LiaCertificateSolid /></span>
                <span className='text-base font-medium flex-1 ml-4'>{data?.qualification}</span>
              </p>
              <p className="flex items-center border-b-2">
                <span className='text-2xl block float-left'><FaBirthdayCake /></span>
                <span className='text-base font-medium flex-1 ml-4'>{formattedDate}</span>
              </p>
              <p className="flex items-center border-b-2">
                <span className='text-2xl block float-left'><MdOutlineInterests /></span>
                <span className='text-base font-medium flex-1 ml-4'>{data?.interest}</span>
              </p>
            </div>
          </div>
        
        
      </div>
      <div className='flex-1'>
        <div className="flex">
          <div className='flex-auto p-5'>
            <div className="text-sm font-medium text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
              <ul className="flex flex-wrap -mb-px">
                <li className="me-2">
                <button
                    onClick={() => setTab('about')}
                    className={`inline-block p-4 rounded-t-lg ${tab === 'about' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'border-transparent'}`}
                  >
                    About
                  </button>
                </li>
                <li className="me-2">
                  <button
                    onClick={() => setTab('photos')}
                    className={`inline-block p-4 rounded-t-lg ${tab === 'photos' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'border-transparent'}`}
                  >
                    Photos
                  </button>
                </li>
                <li className="me-2">
                <button
                    onClick={() => setTab('other details')}
                    className={`inline-block p-4 rounded-t-lg ${tab === 'other details' ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' : 'border-transparent'}`}
                  >
                    Other Details
                  </button>
                </li>
              </ul>
              {tab== "photos" && <UpdatePhoto user={data} onUpdate={handleProfileUpdate}/>}
            </div>
          </div>
        </div>
      </div>
      <CustomModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <UpdateProfile user={user} onUpdate={handleProfileUpdate} />
      </CustomModal>
    </div>
  );
}

export default Overview;
