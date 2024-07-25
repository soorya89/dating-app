import React from 'react';
import Signup from '../pages/Signup';
import Login from '../pages/Login'
import Sendotp from '../pages/Sendotp'
import Home from '../pages/Home'
import RegSection1 from '../pages/RegSection1'
import RegSection2 from '../pages/RegSection2';
import RegSection3 from '../pages/RegSection3';
import Profile from '../Dashboard/myAccount/Profile'
import UpdateProfile from '../component/Profile/UpdateProfile';
import Tabui from '../pages/Tabui'
import Overview from '../component/Profile/Overview';

import { Routes, Route } from 'react-router-dom';
import UpdatePhoto from '../component/Profile/UpdatePhoto';

const Routers = () => {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sendotp' element={<Sendotp />} />
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/register-section1' element={<RegSection1 />} />
        <Route path='/register-section2' element={<RegSection2 />} />
        <Route path='/register-section3' element={<RegSection3 />} />
        <Route path='/profile/me' element={<Profile />} />
        <Route path='/profile/overview' element={<Overview />} />
        <Route path='/profile/update' element={<UpdateProfile />} />
        <Route path='/profile/photo' element={<UpdatePhoto />} />
        <Route path='/tabui' element={<Tabui />} />
      </Routes>
    </>
  );
}

export default Routers;

