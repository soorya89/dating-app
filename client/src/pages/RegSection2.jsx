import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL,token } from '../config';
import {toast} from 'react-toastify'

const RegSection2 = () => {
  const [employmentType, setEmploymentType] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [designation, setDesignation] = useState('');
  const [location, setLocation] = useState('');
  const [title, setTitle] = useState('');
  const [expertiseLevel, setExpertiseLevel] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (employmentType === 'employee' || employmentType === 'employer') {
      setIsFormValid(companyName !== '' && designation !== '' && location !== '');
    } else if (employmentType === 'jobseeker') {
      setIsFormValid(title !== '' && expertiseLevel !== '');
    } else {
      setIsFormValid(false);
    }
  }, [employmentType, companyName, designation, location, title, expertiseLevel]);

  const handleEmploymentChange = (e) => {
    setEmploymentType(e.target.value);
    setCompanyName('');
    setDesignation('');
    setLocation('');
    setTitle('');
    setExpertiseLevel('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      employmentType,
      companyName,
      designation,
      location,
      title,
      expertiseLevel,
    };
console.log(formData,"////////////////");
    try {
      const response = await fetch(`${BASE_URL}/register/register-section2`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const {message} = await response.json();
      if(!response.ok){
        throw new Error(message)
      }
      toast.success(message)
        // Redirect to the next page or show a success message
        navigate('/');
    
    } catch (error) {
      toast.error(error.message)
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section className="px-6 lg:px-8 py-10 bg-gray">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          About <span className="text-primaryColor">Employment</span>
        </h3>
        <form className="py-4 md:py-0" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="employmentType"
                value="employee"
                checked={employmentType === 'employee'}
                onChange={handleEmploymentChange}
                className="form-radio"
              />
              <span className="ml-2">Employee</span>
            </label>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="employmentType"
                value="employer"
                checked={employmentType === 'employer'}
                onChange={handleEmploymentChange}
                className="form-radio"
              />
              <span className="ml-2">Employer</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="employmentType"
                value="jobseeker"
                checked={employmentType === 'jobseeker'}
                onChange={handleEmploymentChange}
                className="form-radio"
              />
              <span className="ml-2">Job Seeker</span>
            </label>
          </div>

          {(employmentType === 'employee' || employmentType === 'employer') && (
            <div className="mb-5">
              <label className="block mb-2">Company Name:</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your company name"
              />
              <label className="block mb-2 mt-5">Designation:</label>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your designation"
              />
              <label className="block mb-2 mt-5">Location:</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your location"
              />
            </div>
          )}

          {employmentType === 'jobseeker' && (
            <div className="mb-5">
              <label className="block mb-2">Title:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your title"
              />
              <label className="block mb-2 mt-5">Expertise Level:</label>
              <select
                value={expertiseLevel}
                onChange={(e) => setExpertiseLevel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Choose an Option</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>
          )}

          <div className="mt-7">
            <button
              type="submit"
              className={`w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 ${isFormValid ? '' : 'opacity-50 cursor-not-allowed'}`}
              disabled={!isFormValid}
            >
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegSection2;
