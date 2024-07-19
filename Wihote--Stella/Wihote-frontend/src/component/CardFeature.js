/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { Link } from 'react-router-dom';
import { addCartItems } from '../redux/productSlice';
import { useDispatch } from 'react-redux';

const CardFeature = ({image, name, price, category, loading, id}) => {

  const dispatch = useDispatch()

  const handleAddCartProduct = (e) => {
    e.stopPropagation();
    dispatch(addCartItems({
      _id: id,
      name: name,
      price: price,
      category: category,
      image: image,
    }))
  }

  return ( 
    <div className='w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg py-5 px-4 cursor-pointer flex flex-col rounded'>
      {
        image ? ( <>
          <Link to={`/menu/${id}`} onClick={() => window.scrollTo({top:"0", behavior: "smooth"})}>
            <div className='h-28 flex flex-col justify-center items-center'>
              <img src={image} className='h-full'/>
            </div>
            <h3 className='font-semibold text-slate-600 capitalize text-lg mt-4 whiteshpace-nowrap overflow-hidden'>{name}</h3>
            <p className='text-slate-500 font-md'>{category}</p>
            <p className='font-bold text-slate-700'><span className='text-red-500'>ksh. </span><span>{price}</span></p>

          </Link>
          
          <button className='bg-yellow-500 px-3 py-2 my-2 font-medium text-slate-700 rounded-full hover:bg-yellow-600 w-full' onClick={handleAddCartProduct}>Add to Cart</button>

          
        </>
         ) : (
          <div className='min-h-[150px] flex justify-center items-center'>
            <p>{loading}</p>
         </div>
         )
      }      
    </div>
        
  )
}

export default CardFeature