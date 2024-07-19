import React, { useState } from 'react'
import loginSignupImage from '../images/profile.gif'
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate } from 'react-router-dom';
import { ImageToBase64 } from '../utility/ImageToBase64';
import { toast } from 'react-hot-toast';


function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [data, setData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    image: '',
  });

  console.log(process.env.REACT_APP_SERVER_DOMAIN)

  const handleSubmit = async(e) => {
    e.preventDefault()
    const {firstName, email, password, confirmPassword} = data

    if(firstName && email && password && confirmPassword) {
      if(password === confirmPassword) {
        console.log(data)
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
          method: "POST",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify(data)
        });

        // dataRes is Reponse data from server
        const dataRes = await fetchData.json()
        console.log(dataRes)
        
       /* alert(dataRes.message); */
        toast(dataRes.message)
        if (dataRes.alert) {
          navigate('/login');
        }
        
        /* navigate('/login') */
      } else {
        alert('Password and confirm password do not match!')
      }
    } else {
      alert('Please enter required fields value')
    }
  }

  const handleShowPassword = () => {
    setShowPassword(preve => !preve)
  }


  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(preve => !preve)
  }

  const handleOnChange = (e) => {
    const {name,value} = e.target
    setData((preve) => {
      return {
        ...preve,
        [name] : value
      }
    })
  }

  const handleUploadProfileImage = async(e) => {
    /* console.log(e.target.files[0]) */
    const data = await ImageToBase64(e.target.files[0])
    /* console.log(data) */

    setData((preve) => {
      return{
        ...preve,
        image : data
      }
    })
  }

  return (
    <div className='p-5 md:p-5'>
      <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>
        {/* <h1 className='text-center text-2xl font-bold'>Sign-up</h1> */}
        <div className='w-20 h-20 m-auto overflow-hidden rounded-full drop-shadow-md shadow-md relative'>  {/* one can add "overflow-hidden rounded-full drop-shadow-md shadow-md" properties */}
          <img src={data.image ? data.image : loginSignupImage} alt='profilepicture' className='w-full h-full'/>

          <label htmlFor='profileImage'>
            <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center cursor-pointer'>
              <p className='text-sl p-0.3 text-white'>Upload</p>
            </div>
            <input type={'file'} id='profileImage' accept='image/*' className='hidden' onChange={handleUploadProfileImage}/>
          </label>
        </div>

        <form className='w-full' onSubmit={handleSubmit}>
          <label htmlFor='firstName'>First Name</label>
          <input type={'text'} id={'firstName'} name={'firstName'} className='mt-1 mb-2 w-full bg-slate-200 px-2 py-0.5 rounded focus-within:outline-blue-300' value={data.firstName} onChange={handleOnChange} />

          <label htmlFor='middleName'>Middle Name</label>
          <input type={'text'} id={'middleName'} name='middleName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-0.5 rounded focus-within:outline-blue-300' value={data.middleName} onChange={handleOnChange} />

          <label htmlFor='lastName'>Last Name</label>
          <input type={'text'} id={'lastName'} name='lastName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-0.5 rounded focus-within:outline-blue-300' value={data.lastName} onChange={handleOnChange} />

          <label htmlFor='email'>Email</label>
          <input type={'email'} id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-0.5 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange} />

          <label htmlFor='password'>Password</label>
          <div className='flex px-2 py-0.5 bg-slate-200 rounded mt-1 mb-2 focus-within:outline outline-1 focus-within:outline-blue-300'>
            <input type={showPassword ? 'text' : 'password'} id='password' name='password' className=' w-full bg-slate-200 border-none outline-none' value={data.password} onChange={handleOnChange} />
            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>{showPassword ? <LuEye /> : <LuEyeOff />}</span>
          </div>


          <label htmlFor='confirmPassword'>Confirm Password</label>
          <div className='flex px-2 py-0.5 bg-slate-200 rounded mt-1 mb-2 focus-within:outline outline-1 focus-within:outline-blue-300'>
            <input type={showConfirmPassword ? 'text' : 'password'} id='confirmPassword' name='confirmPassword' className=' w-full bg-slate-200 border-none outline-none' value={data.confirmPassword} onChange={handleOnChange} />
            <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>{showConfirmPassword ? <LuEye /> : <LuEyeOff />}</span>
          </div>

          <div className='flex justify-between'>
            <button className='w-full max-w-[150px] bg-green-500 hover:bg-green-600 shadow-md rounded-full cursor:pointer text-white text-xl font-medium text-center py-1' onClick={handleOnChange}>Sign up</button>
            <button className='w-full max-w-[150px] bg-red-600 hover:bg-red-400 shadow-md rounded-full cursor:pointer text-white text-xl font-medium text-center py-1' onClick={handleOnChange}>Cancel</button>
          </div>
        </form>

        <p className='py-4 text-left text-sm'>Already have an account? Login <Link to={'/login'} className='text-blue-600 underline'>here...</Link></p>
      </div>
    </div>
  )
}

export default Signup
