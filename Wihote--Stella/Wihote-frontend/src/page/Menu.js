import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AllProduct from '../component/AllProduct'
import { addCartItems } from '../redux/productSlice'

const Menu = () => {
  const {filterby} = useParams();
  const productData = useSelector(state => state.product.productList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const productDisplay = productData.filter(el => el._id === filterby)[0]
  console.log(productDisplay)

  const handlePayment = () => {
    dispatch(addCartItems(productDisplay))
  }
  
  const handleAddCartProduct = (e) => {
    dispatch(addCartItems(productDisplay))
    navigate("/cart");
  }
  
  return(
    <div className='p-2 md:p-4'>
      <div className='w-full max-w-3xl m-auto md:flex bg-white'>
      <div className='max-w-sm overflow-hidden w-full md:w-1/2 p-5'>
        <img src={productDisplay.image} alt='productImage' className='object-contain w-full h-64 md:h-full hover:scale-105 transition-all'/>
      </div>
      <div className='flex flex-col gap-2 md:w-1/2'>
        <h3 className='font-semibold text-slate-600 capitalize text-2xl text-2xl md:text-4xl'>{productDisplay.name}</h3>
        <p className='text-slate-500 font-medium text-2xl'>{productDisplay.category}</p>
        <p className='font-bold text-slate-700 md:text-2xl'><span className='text-red-500'>ksh. </span><span>{productDisplay.price}</span></p>
        
        <div className='flex gap-4'>
          <button onClick={handlePayment} className='bg-green-500 m-2 py-2 my-2 font-medium text-slate-600 rounded-full hover:bg-green-600 min-w-[100px]'>Buy Now</button>
          <button onClick={handleAddCartProduct} className='bg-yellow-500 px-3 py-2 my-2 font-medium text-slate-700 rounded-full hover:bg-yellow-600 min-w-[100px]'>Add to Cart</button>
        </div>

        <div className=''>
          <p className='text-slate-600 font-medium'>Description</p>
          <p>{productDisplay.description}</p>
        </div>
      </div>
      </div>

      <AllProduct heading={'Related Product'} />
    </div>
  )
}

export default Menu
