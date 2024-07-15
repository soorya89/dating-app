import {useState, useContext} from 'react'
import {Link ,useNavigate} from 'react-router-dom'
import {BASE_URL} from '../config'
import {toast} from 'react-toastify'
import {authContext} from '../context/AuthContext.jsx'

const Login = () => {

  const [formData,setFormData] = useState({
    email:'',
    password:''
  })
  const navigate=useNavigate()
  const {dispatch}=useContext(authContext)
  const handleInputChange=(e)=>{
    setFormData({...formData,[e.target.name]: e.target.value})
  } 
  const submitHandler= async e=>{
  
    e.preventDefault()
   
    try{
      const res=await fetch(`${BASE_URL}/auth/login`,{
        method:'post',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(formData) 
      })
      const result =await res.json()
      if(!res.ok){
        throw new Error(result.message)
      }
      dispatch({
        type:'LOGIN_SUCCESS',
        payload:{
          user:result.data,
          token:result.token,
          role:result.role,
        },
      })
      
      toast.success(result.message)
      navigate('/register-section1')
    }catch(err){
      toast.error(err.message)
    }
  } 
  return (
    <section className="px-6 lg:px-8 py-10 bg-gray">
    <div className='w-full max-w-[570px] mx-auto round-lg shadow-md md:p-10'>
      <h3 className='text-headingColor text-[22px] leading-9 font-bold mb-10'>Hello! <span className='text-primaryColor '>  Welcome</span>  Back🎉</h3>
    

    <form className='py-4 md:py-0' onSubmit={submitHandler} >
      <div className='mb-5'>
        <input type='email'
         placeholder='Enter Your Email' 
         name='email' 
         value={FormData.email} 
         onChange={handleInputChange}
         className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
      </div>
      <div className='mb-5'>
        <input type='password'
         placeholder='Password' 
         name='password' 
         value={FormData.password} 
         onChange={handleInputChange}
         className='w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' required />
      </div>

      <div className='mt-7'>
        <button type='sbmit' className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
          Login
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
              
            >
             
             <Link to='/sendotp' className='text-primaryColor font-medium ml-1'>Login with OTP</Link>
            </button>
          </div>

      <p className='mt-5 text-textColor text-center'>Don't have an account? 
      <Link to='/register' className='text-primaryColor font-medium ml-1'>Signup</Link>
      </p>
    </form>
    </div>
  </section>
  )
}

export default Login
