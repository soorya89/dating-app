import React from 'react'
import UserCard from './UserCard'
import { BASE_URL } from '../../config'
import useFetchData from '../../hooks/useFetchData'

const UserList = () => {
    const {data:users} =useFetchData(`${BASE_URL}/user/relationship`)
  
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
     {users.map(user=>(<UserCard key={user.id} user={user} />))} 
    </div>
  )
}

export default UserList
