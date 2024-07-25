import React from 'react'
import Sidebar from '../../component/Profile/Sidebar'
import Overview from '../../component/Profile/Overview'

const Profile = () => {
  return (
    <div className='flex' >
      
        <Sidebar/>
        <div className='flex-1'>
         
        <Overview />
        
      </div>
      
    </div>
  )
}

export default Profile
