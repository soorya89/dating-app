import React,{useState} from 'react';
import GoogleImg from '../assets/images/GoogleImg.png'
import {Link,useNavigate} from 'react-router-dom'
import {BASE_URL} from '../config'
import {toast} from 'react-toastify'


const Signup = () => {

  const [formData,setFormData] = useState({
    name:'',
    email:'',
    password:'',
  })
  const navigate=useNavigate()
  const handleInputChange= async e =>{
    setFormData({...formData,[e.target.name]: e.target.value})
  }
  const submitHandler= async e=>{
  
    e.preventDefault()
    
    try{
      const res=await fetch(`${BASE_URL}/auth/register`,{
        method:'post',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      
      if(!res.ok){
        throw new Error(message)
      }
      toast.success(message)
      navigate('/login')
    }catch(err){
      toast.error(err.message)
    }
  }
  return (
    <section className="px-6 lg:px-8 py-10 bg-gray-100">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h3 className="text-gray-800 text-2xl font-bold mb-6 text-center">
          Create an <span className="text-[#D82A6E]">Account</span>
        </h3>
        <form className="space-y-6" onSubmit={submitHandler} >
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-600 text-sm font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="off"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-[#D82A6E] text-white py-2 rounded-md text-lg font-semibold  transition duration-300"
            >
              Signup
            </button>
          </div>
          <div className="flex items-center justify-center mt-6">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>
          <div className="mt-6">
            <button
              type="button"
              className="w-full flex items-center justify-center py-2 border border-gray-300 rounded-md text-lg font-semibold hover:bg-gray-100 transition duration-300"
              onClick={() => {
                window.location.href = `${BASE_URL}/auth/google`;
              }}
            >
              <img
                src={GoogleImg}
                alt="Google logo"
                className="w-6 h-6 mr-2"
              />
              Signup with Google
            </button>
          </div>
          <p className="mt-4 text-center text-gray-600">
            Already have an account? <Link to='/login' className='text-primaryColor font-medium ml-1'>Login</Link>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Signup;
