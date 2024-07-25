import React,{useState,useContext} from 'react';
import UserList from '../component/User/UserList';
import { authContext } from '../context/AuthContext';
import UserCard from '../component/User/UserCard';
import { BASE_URL } from '../config';
import useFetchData from '../hooks/useFetchData';


const Home = () => {
 
 const {token}=useContext(authContext)
  const {data} =useFetchData(`${BASE_URL}/user/profileType`)
  console.log(data,">>>");
  return (
    <section>
   
       <div className='xl:w-[470px] mx-auto'>
         <h2 className='heading text-center'>Pick the right person</h2>
         {data && data.map(user => (
          <UserCard key={user._id} user={user} />
        ))}
       </div>
       
  
    </section>
  );
};

export default Home;
