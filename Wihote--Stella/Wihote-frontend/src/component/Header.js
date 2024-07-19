import React, { useState } from 'react'
import logo from "../images/logo8.jpg"
import { Link } from "react-router-dom";
import {FaRegUserCircle} from "react-icons/fa"
import {FaCartShopping} from "react-icons/fa6"
import { useDispatch, useSelector } from 'react-redux';
import { logoutRedux } from '../redux/userSlice';
import toast from 'react-hot-toast';

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user)
    /* console.log(userData.email) */
    const dispatch = useDispatch()

    const handleShowMenu = () =>{
      setShowMenu(preve => !preve)
    }

    const handleLogout = () => {
      dispatch(logoutRedux())
      toast("Logout successfully")
    }


   /*  console.log(process.env.REACT_APP_ADMIN_EMAIL) */
 
  const cartItemNumber = useSelector((state) => state.product.cartItem)

  return (
  <header className='fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white'>    {/* Menu Side attributes */}
      
    {/* desktop */}

      <div className='flex items-center w-full h-18 justify-between'>
        <Link to={''}>
        <div className='h-10 justify-center'>
            <img src={logo} alt='logo' className='h-full' />
        </div>
        </Link>

        <div className='flex items-center gap-4 md:gap-7'>
            <nav className='gap-4 md:gap-7 text-base md:text-lg hidden md:flex'>
                <Link to={''}>HOME</Link>
                <Link to={'menu/65ace50d07ac1985a2784299'}>MENU</Link>
                <Link to={'about'}>ABOUT</Link>
                <Link to={'contact'}>CONTACT</Link>
            </nav>
            <div className='text-2xl text-slate-600 relative'>
                <Link to={'cart'}> <FaCartShopping/>
                  <div className='absolute -top-2 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-xs text-base text-center '>
                    {cartItemNumber.length}
                  </div>
                </Link>
            </div>
            <div className='text-slate-600' onClick={handleShowMenu}>
              <div className='p-1 text-3xl cursor-pointer w-10 h-10 rounded-full overflow-hidden drop-shadow-md'>
                 {userData.image ? (<img src = {userData.image} alt='profileImage' className='h-full w-full rounded-full overflow-hidden'/>) : (<FaRegUserCircle/>)
                } 
              </div>
              {
                showMenu && (
                  <div className='absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col min-w-[120px] text-center'>
                    {
                      userData.email === process.env.REACT_APP_ADMIN_EMAIL && (<Link to={"newproduct"} className='whitespace-nowrap'>New Product</Link>)
                    }

                    {
                      userData.image ? ( <p className='cursor-pointer text-red-500' onClick={handleLogout}>LOGOUT ({userData.firstName}){" "}</p>) : (<Link to={"login"} className='whitespace-nowrap cursor-pointer px-2'>LOGIN</Link>)
                    }

                    <nav className='text-base md:text-lg flex flex-col md:hidden'>
                      <Link to={''} className='px-2 py-1'>HOME</Link>
                      <Link to={'menu/65ace50d07ac1985a2784299'} className='px-2 py-1'>MENU</Link>
                      <Link to={'about'} className='px-2 py-1'>ABOUT</Link>
                      <Link to={'contact'} className='px-2 py-1'>CONTACT</Link>
                    </nav>
                  </div>
                )
              }
              
            </div>
        </div>
      </div>


      {/* mobile */}
    </header>
  )
}

export default Header;
