import React, { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config';
import { useNavigate } from 'react-router-dom';


const SendOtp = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpSent, setOtpSent] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const navigate = useNavigate(); 
  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);

    // Move to the next input field
    if (e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const sendOtp = async () => {
    try {
      
      const response = await axios.post(`${BASE_URL}/auth/send-verification`, { phone });
      setOtpSent(true);
      console.log('OTP sent successfully:', response.data);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    try {
      const response = await axios.post(`${BASE_URL}/auth/check-verification`, { phone, code });
      if (response.data.status === 'approved') {
        setVerificationStatus('approved');
        navigate('register-section1'); // Navigate to the home page after successful verification
      } else {
        setVerificationStatus('failed');
      }
      console.log('OTP verification response:', response.data);
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setVerificationStatus('failed');
    }
  };

  return (
    <section className="px-6 lg:px-8 py-10 bg-gray">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Verify OTP <span className="text-primaryColor">Verification</span>
        </h3>

        <form className="py-4 md:py-0" onSubmit={verifyOtp}>
          <div className="mb-5">
            <input
              type="text"
              placeholder="Enter Your Phone Number"
              name="phone"
              value={phone}
              onChange={handlePhoneChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mt-7 mb-5">
            <button
              type="button"
              className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
              onClick={sendOtp}
            >
              Send OTP
            </button>
          </div>
          {otpSent && (
            <>
              <div className="flex justify-between mb-5">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-1/5 px-4 py-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data}
                    onChange={(e) => handleOtpChange(e, index)}
                    onFocus={(e) => e.target.select()}
                    required
                  />
                ))}
              </div>
              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  Verify OTP
                </button>
              </div>
            </>
          )}
          <p className="mt-5 text-textColor text-center">
            Didn't receive the OTP?{" "}
            <button
              type="button"
              className="text-primaryColor font-medium ml-1"
              onClick={sendOtp}
            >
              Resend OTP
            </button>
          </p>
        </form>
        {verificationStatus && (
          <p className={`mt-5 text-center ${verificationStatus === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
            {verificationStatus === 'approved' ? 'OTP Verified Successfully!' : 'OTP Verification Failed!'}
          </p>
        )}
      </div>
    </section>
  );
};

export default SendOtp;
