import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, token } from '../config';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

const RegSection3 = () => {
  const [relationshipType, setRelationshipType] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showProfileType, setshowProfileType] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setIsFormValid(relationshipType !== '');
  }, [relationshipType]);

  const handleOptionClick = (type) => {
    setRelationshipType(type);
    if (type === 'Short Term Relationship') {
      setIsModalOpen(true);
    }
  };

  const handleProfileTypeSelect = (type) => {
    setshowProfileType(type);
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      relationshipType,
      showProfileType: relationshipType === 'Short Term Relationship' ? showProfileType : undefined,
    };



    try {
      const response = await fetch(`${BASE_URL}/register/register-section3`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const { message } = await response.json();
      if (!response.ok) {
        throw new Error(message);
      }
      toast.success(message);

      // Redirect based on relationship type
      if (relationshipType === 'Long Term Relationship') {
        navigate('/'); // Replace '/' with your matrimony app home route
      } else if (relationshipType === 'Short Term Relationship') {
        navigate('/'); // Replace '/' with your dating app home route
      }

    } catch (error) {
      toast.error(error.message);
      console.error('Error submitting form:', error);
    }
  };

  return (
    <section className="px-6 lg:px-8 py-10 bg-gray">
      <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
        <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
          Select Your <span className="text-primaryColor">Relationship Type</span>
        </h3>
        <div className="flex justify-center mb-5">
          <button
            className={`mr-4 px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              relationshipType === 'Short Term Relationship' ? 'bg-primaryColor text-white' : 'bg-white text-gray-800'
            }`}
            onClick={() => handleOptionClick('Short Term Relationship')}
          >
            Short Term
          </button>
          <button
            className={`px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              relationshipType === 'Long Term Relationship' ? 'bg-primaryColor text-white' : 'bg-white text-gray-800'
            }`}
            onClick={() => handleOptionClick('Long Term Relationship')}
          >
            Long Term
          </button>
        </div>

        <form className="py-4 md:py-0" onSubmit={handleSubmit}>
          <div className="mt-7">
            <button
              type="submit"
              className={`w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3 ${
                isFormValid ? '' : 'opacity-50 cursor-not-allowed'
              }`}
              disabled={!isFormValid}
            >
              Save and Continue
            </button>
          </div>
        </form>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Select Profile Type"
          className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50"
          overlayClassName=""
        >
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Interested in</h2>
            <div className="flex justify-around mb-4">
              <button
                className="bg-primaryColor text-white px-4 py-2 rounded-lg"
                onClick={() => handleProfileTypeSelect('Men')}
              >
                Men
              </button>
              <button
                className="bg-primaryColor text-white px-4 py-2 rounded-lg"
                onClick={() => handleProfileTypeSelect('Women')}
              >
                Women
              </button>
              <button
                className="bg-primaryColor text-white px-4 py-2 rounded-lg"
                onClick={() => handleProfileTypeSelect('Both')}
              >
                Both
              </button>
            </div>
            <button
              className="mt-4 w-full bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default RegSection3;
