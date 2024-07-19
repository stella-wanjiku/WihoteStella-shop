/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { RiAddLine } from "react-icons/ri";
import { RiSubtractLine } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteCartItems, increaseQty, decreaseQty } from '../redux/productSlice';


const CartProduct = ({id, name, image, category, qty, price, total}) => {

    const dispatch = useDispatch()

  return (
    <div className='bg-slate-200 p-4 flex gap-10 rounded border border-slate-300'>
      <div className='p-2 bg-white rounded overflow-hidden'>
        <img src={image} className='h-28 w-40 object-cover' />
      </div>

      <div className='flex flex-col gap-2 w-full'>
        <div className='flex justify-between'>
            <h3 className='font-semibold text-slate-600 capitalize text-lg md:text-xl'>{name}</h3>

            <div className='cursor-pointer text-slate-700 hover:text-red-500'  onClick={() => dispatch(deleteCartItems(id))}><MdDelete /></div>
        </div>
        <p className='text-slate-500 font-medium text-base'>{category}</p>
        <p className='font-bold text-slate-700 text-base'><span className='text-red-500'>ksh. </span><span>{price}</span></p>
        
        <div className='flex justify-between'>
            <div className='flex gap-4 items-center'>
            <button onClick={() => dispatch(decreaseQty(id))} className='bg-slate-300 p-1 font-medium text-slate-600 rounded-full hover:bg-green-600'><RiSubtractLine /></button>
            <p className='font-semifont p-1'>{qty}</p>
            <button onClick={() => dispatch(increaseQty(id))} className='bg-slate-300 p-1 font-medium text-slate-700 rounded-full hover:bg-yellow-600'><RiAddLine /></button>
            </div>
            <div className='flex items-center gap-2 font-bold text-slate-700'>
                <p>Total: </p>
                <p><span className='text-red-500'>ksh. </span>{total}</p>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartProduct
