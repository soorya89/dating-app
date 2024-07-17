import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL,token } from '../config';
import uploadImageToCloudinary from '../utils/uploadCloudinary'
import {toast} from 'react-toastify'
import { RegistrationContext } from '../context/RegistrationContext';



const RegSection1 = () => {
  const [selectedProfilePic, setSelectedProfilePic] = useState('');
  const [selectedAdditionalImages, setSelectedAdditionalImages] = useState([]);
  const [selectedShortReel, setSelectedShortReel] = useState('');
  const [loading,setLoading]=useState(false)
  const [formData, setFormData] = useState({
    age: '',
    dob: '',
    hobbies: '',
    interest: [],
    smoking: '',
    drinking: '',
    qualification: '',
    profilePic: selectedProfilePic,
    additionalImages: selectedAdditionalImages,
    shortReel: selectedShortReel,
  });

  const navigate = useNavigate();

  const handleInputChange = async e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImageToCloudinary(file);
    const fieldName = e.target.name;

    if (fieldName === 'profilePic') {
      setSelectedProfilePic(data.url);
      setFormData({ ...formData, profilePic: data.url });
    } else if (fieldName === 'additionalImages') {
      setSelectedAdditionalImages([...selectedAdditionalImages, data.url]);
      setFormData({ ...formData, additionalImages: [...selectedAdditionalImages, data.url] });
    } else if (fieldName === 'shortReel') {
      setSelectedShortReel(data.url);
      setFormData({ ...formData, shortReel: data.url });
    }
  };

  const submitHandler = async e => {
    setLoading(true)
    e.preventDefault();
    
   
    if (!token) {
      toast.error('Token not found');
      setLoading(false);
      return;
    }

    console.log('Submitting formData:', formData);
    try{
const res=await fetch(`${BASE_URL}/register/register-section1`,{
  method:'post',
  headers:{
    'Content-Type':'application/json',
    'Authorization': `Bearer ${token}`
  },
  body:JSON.stringify(formData)
})
const {message}=await res.json()
if(!res.ok){
  throw new Error(message)
}
setLoading(false)
    toast.success(message)
    navigate('/')
    }catch(err){
      toast.error(err.message)
      setLoading(false)
    }
  };
  

  return (
    <section className="px-6 lg:px-8 py-10 bg-gray-100">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-gray-800 text-2xl font-bold mb-6 text-center">
          Complete Your <span className="text-[#D82A6E]">Profile</span>
        </h3>
        <form className="space-y-6" onSubmit={submitHandler}>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="age">Age</label>
            <input
              type="text"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="hobbies">Hobbies</label>
            <input
              type="text"
              id="hobbies"
              name="hobbies"
              value={formData.hobbies}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="interest">Interest</label>
            <input
              type="text"
              id="interest"
              name="interest"
              value={formData.interest}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="smoking">Smoking Habits</label>
            <select
              id="smoking"
              name="smoking"
              value={formData.smoking}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="Planning to quit">Planning to quit</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="drinking">Drinking Habits</label>
            <select
              id="drinking"
              name="drinking"
              value={formData.drinking}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>Select an option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
              <option value="occasionally">Occasionally</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="qualification">Qualification</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="profilePic">Profile Picture</label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="additionalImages">Additional Images</label>
            <input
              type="file"
              id="additionalImages"
              name="additionalImages"
              onChange={handleFileChange}
              multiple
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="shortReel">Short Reel</label>
            <input
              type="file"
              id="shortReel"
              name="shortReel"
              onChange={handleFileChange}
              accept="video/*"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-[#D82A6E] text-white py-2 rounded-md text-lg font-semibold transition duration-300"
            >
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default RegSection1;
