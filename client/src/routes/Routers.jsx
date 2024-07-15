import React from 'react';
import Signup from '../pages/Signup';
import Login from '../pages/Login'
import Sendotp from '../pages/Sendotp'
import Home from '../pages/Home'
import RegSection1 from '../pages/RegSection1'
import RegSection2 from '../pages/RegSection2';

import { Routes, Route } from 'react-router-dom';

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
      </Routes>
    </>
  );
}

export default Routers;

