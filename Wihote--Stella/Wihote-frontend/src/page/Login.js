import React, { useState } from 'react'
import loginSignupImage from '../images/profile.gif'
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from '../redux/userSlice';


const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  // Use a more specific selector, assuming your state has a 'user' property
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleShowPassword = () => {
    setShowPassword(preve => !preve)
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = data

    if (email && password) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      // dataRes is Reponse data from server
      const dataRes = await fetchData.json()
      /* console.log(dataRes) */
      
      toast(dataRes.message)

      if(dataRes.alert) {
        dispatch(loginRedux(dataRes))
        setTimeout(() => {
          navigate('/')
        }, 1000);
      }

      /* console.log(userData)  */     

    } else {
      alert('Unsuccessful Login! Check your email or password!')
    }
  }

  return (
    <div className='p-5 md:p-5'>
      <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
        {/* <h1 className='text-center text-2xl font-bold'>Sign-up</h1> */}
        <div className='w-20 m-auto'>  {/* one can add "overflow-hidden rounded-full drop-shadow-md shadow-md" properties */}
          <img src={loginSignupImage} alt='loginImage' className='w-full' />
        </div>

        <form className='w-full' onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input type={'email'} id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-0.5 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange} />

          <label htmlFor='password'>Password</label>
          <div className='flex px-2 py-0.5 bg-slate-200 rounded mt-1 mb-2 focus-within:outline outline-1 focus-within:outline-blue-300'>
            <input type={showPassword ? 'text' : 'password'} id='password' name='password' className=' w-full bg-slate-200 border-none outline-none' value={data.password} onChange={handleOnChange} />
            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <LuEye /> : <LuEyeOff />}</span>
          </div>

          <div className='mt-4 flex justify-center'>
            <button className='w-full max-w-[150px] bg-green-500 hover:bg-green-600 shadow-md rounded-full cursor:pointer text-white text-xl font-medium text-center py-1' onClick={handleOnChange}>LOGIN</button>
          </div>
        </form>

        <p className='py-4 text-left text-sm'>Do not have an account? Sign-up <Link to={'/signup'} className='text-blue-600 underline'>here...</Link></p>
      </div>
    </div>
  )
}

export default Login
