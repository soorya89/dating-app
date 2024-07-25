import { useEffect, useState, useContext } from 'react';
import { authContext } from '../context/AuthContext';
import { BASE_URL } from '../config';
import { toast } from 'react-toastify';

const useFetchData = (url) => {
  const { token, setToken } = useContext(authContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(url, {
        headers: { authorization: `Bearer ${token}` },
      });

      const result = await res.json();

      if (!res.ok) {
        if (result.message === 'jwt expired') {
          // Handle token expiry
          const newToken = await refreshToken();
          if (newToken) {
            setToken(newToken);
            return fetchData();
          } else {
            throw new Error('Session expired. Please log in again.');
          }
        } else {
          throw new Error(result.message || 'Failed to fetch');
        }
      }
      setData(result.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const refreshToken = async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Failed to refresh token');
      }

      return result.token;
    } catch (err) {
      toast.error(err.message || 'Failed to refresh token');
      return null;
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
    refetch: fetchData
  };
};

export default useFetchData;

// import { useEffect, useState } from 'react'
// import {token} from '../config'

// const useFetchData = (url) => {
//     const [data,setData] = useState([])
//     const [loading,setLoading] = useState(false)
//     const [error,setError] = useState(null)

//     useEffect(()=>{
//         const fetchData = async ()=>{

//             setLoading(true)
//           try{
//             console.log(url,";;;;;;;;;;;");
//             const res= await fetch(url,{
//                 headers:{ authorization: `Bearer ${token}` },
//             })

//             const  result =await res.json()
//             console.log(result,"this is a res");
//             if(!res.ok){
//                 throw new Error(result.message + '🤢')
//             }
//             setData(result.data)
//             setLoading(false)
//           }catch(err){
//             setError(err.message)
//             setLoading(false)
            
//           }
//         }
//         fetchData()
//     },[url, token])
//   return {
//     data,loading,error
//   }
// }

// export default useFetchData

