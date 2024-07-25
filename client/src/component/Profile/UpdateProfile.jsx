import {useEffect, useState} from 'react'
import {BASE_URL,token}  from '../../config'
import {toast} from 'react-toastify'

const UpdateProfile = ({user,onUpdate}) => {
    const [formData,setFormData] = useState({
        name:'',
        email:'',    
        gender:'',
        age:'',
        dob:'',
        drinking:'',
        smoking:'',
        interest:'',
        qualification:''
      })

      const [loading, setLoading] = useState(false);

      useEffect(()=>{ 
        console.log("User Data in useEffect:", user);
        setFormData({
          name: user.name || '',
          email: user.email || '',
          gender: user.gender || '',
          age: user.age || '',
          dob:user.dob ? user.dob.split('T')[0] : '',
          drinking: user.drinking || '',
          smoking: user.smoking || '',
          interest:user.interest || '',
          qualification:user.qualification || ''
         })
      },[user])


      const handleInputChange= async e =>{
        setFormData({...formData,[e.target.name]: e.target.value})
      }

      const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
      
        try {
          const res = await fetch(`${BASE_URL}/user/${user._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(formData)
          });
          const data = await res.json();
      
          if (!res.ok) {
            throw new Error(data.message);
          }
      
          setLoading(false);
          toast.success(data.message);
          onUpdate();
          // navigate('/profile/me');
        } catch (err) {
          toast.error(err.message || 'Something went wrong.');
          setLoading(false);
        }
      };
      
  return (
    <div className='mt-10'>
      <form  onSubmit={submitHandler}>
          <div className='mb-5'>
        <input type='text'
         placeholder='Full Name' 
         name='name' 
         value={formData.name} 
          onChange={handleInputChange}
         className='w-full pr-4 py-3 border-b border-solid border-[#0066ff1] 
         focus:outline-none focus:border-b-primaryColor text-[16px] leadind-7 
         text-textColor placeholder:text-[#6A7D93]  cursor-pointer' required />
      </div>

      <div className='mb-5'>
        <input type='email'
         placeholder='Enter Your Email' 
         name='email' 
         value={formData.email} 
          onChange={handleInputChange}
          autoComplete='off'
         className='w-full pr-4 py-3 border-b border-solid border-[#0066ff1] 
         focus:outline-none focus:border-b-primaryColor text-[16px] leadind-7 
         text-textColor placeholder:text-[#6A7D93]  cursor-pointer' aria-readonly readOnly />
      </div>
      <div className='mb-5 flex items-center justify-between'>
        {/* <label className='text-textColor font-semibold text=[15px] leading-7'>
          Gender: */}
          <select name='gender' 
          value={formData.gender} 
          onChange={handleInputChange}
          className='w-full pr-4 py-3 border-b border-solid border-[#0066ff1] 
         focus:outline-none focus:border-b-primaryColor text-[16px] leadind-7 
         text-textColor placeholder:text-[#6A7D93]  cursor-pointer' required>
            <option value="male">Male</option>
            <option value="women">Women</option>
            <option value="other">Other</option>
          </select>
        {/* </label> */}
      </div>


      <div className='mb-5'>
        <input type='number' 
         name='age' 
         value={formData.age} 
          onChange={handleInputChange}
         className='w-full pr-4 py-3 border-b border-solid border-[#0066ff1] 
         focus:outline-none focus:border-b-primaryColor text-[16px] leadind-7 
         text-textColor placeholder:text-[#6A7D93]  cursor-pointer' required />
      </div>

      <div className='mb-5'>
            
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleInputChange}
              className='w-full pr-4 py-3 border-b border-solid border-[#0066ff1] 
         focus:outline-none focus:border-b-primaryColor text-[16px] leadind-7 
         text-textColor placeholder:text-[#6A7D93]  cursor-pointer' required
            
            />
          </div>

          <div className="mb-5 flex items-center justify-between">
  <label className="text-textColor font-semibold text-[15px] leading-7 mr-4">
    Smoking:
  </label>
  <select
    name="smoking"
    value={formData.smoking}
    onChange={handleInputChange}
    className="w-full pr-4 py-3 border-b border-solid border-[#0066ff1] 
      focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 
      text-textColor placeholder:text-[#6A7D93] cursor-pointer"
  >
    <option value="regular">Regular</option>
    <option value="socially">Socially</option>
    <option value="teetotaler">Teetotaler</option>
    <option value="planning to quit">Planning to quit</option>
    <option value="occasionally">Occasionally</option>
  </select>
</div>


      <div className="mb-5 flex items-center justify-between">
        <label className="text-textColor font-semibold text-[15px] leading-7 mr-4">
          Drinking Habit:
          </label>
          <select name='drinking' 
          value={formData.drinking} 
          onChange={handleInputChange}
          className="w-full pr-4 py-3 border-b border-solid border-[#0066ff1] 
      focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 
      text-textColor placeholder:text-[#6A7D93] cursor-pointer">
            <option value="yes">Yes</option>
            <option value="no">No</option>  
            <option value="planning to quit">Planning to quit</option>
          </select>
        
      </div>
      <div className="mb-5 flex items-center justify-between">
      <label className="text-textColor font-semibold text-[15px] leading-7 mr-4">
    Interest:
  </label>
        <input type='text'
         placeholder='interest' 
         name='interest' 
         value={formData.interest} 
          onChange={handleInputChange}
         className='w-full pr-4 py-3 border-b border-solid border-[#0066ff1] 
         focus:outline-none focus:border-b-primaryColor text-[16px] leadind-7 
         text-textColor placeholder:text-[#6A7D93]  cursor-pointer' required />
      </div>

      <div className="mb-5 flex items-center justify-between">
      <label className="text-textColor font-semibold text-[15px] leading-7 mr-4">
    Qualification:
  </label>
        <input type='text'
         name='qualification' 
         value={formData.qualification} 
          onChange={handleInputChange}
         className='w-full pr-4 py-3 border-b border-solid border-[#0066ff1] 
         focus:outline-none focus:border-b-primaryColor text-[16px] leadind-7 
         text-textColor placeholder:text-[#6A7D93]  cursor-pointer' required />
      </div>
      
      <div className='mt-7'>
        <button 
         disabled={loading } 
        type='submit' 
        className='w-full bg-[#D82A6E] text-white py-2 rounded-md text-lg font-semibold transition duration-300'>
           {loading ? 'Updating...' : 'Update'}
          </button>
      </div>

    
          </form> 
    </div>
  )
}

export default UpdateProfile
