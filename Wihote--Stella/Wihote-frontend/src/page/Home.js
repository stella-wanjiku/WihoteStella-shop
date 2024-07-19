import React, { useEffect, useState } from 'react';
import productLogo from '../images/organicProducts.jpg';
import HomeCard from '../component/HomeCard';
import { useSelector } from 'react-redux';
import  CardFeature  from '../component/CardFeature';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { useRef } from 'react';
import FilterProduct from '../component/FilterProduct';
import AllProduct from '../component/AllProduct';


function Home() {
  const productData = useSelector((state) => state.product.productList)
  /* console.log(productData) */
  
  const homeProductCartList = productData.slice(0, 4)
  const homeProductCartListVegetables = productData.filter(el => el.category === 'vegetables', []);
  /* console.log(homeProductCartListVegetables) */

  // speeding up the loading process of displaying data
  const loadingArray = new Array(4).fill(null)
  const loadingArrayFeature = new Array(7).fill(null)

  const slideProductRef = useRef()
  const nextProduct = () => {
    slideProductRef.current.scrollLeft += 200;
  };
  const previousProduct = () => {
    slideProductRef.current.scrollLeft -= 200;
  };

  return (
    <div className='p-2 md:p-4'>
      <div className='md:flex gap-4 py-2'>
        
        {/* Left Section */}        
        <div className='md:w-1/2'>
          <div className='flex gap-3 bg-slate-300 w-36 px-2 items-center rounded-full'>
            <p className='text-sm font-medium text-slate-900'>Wihote Products</p>
            <img src={productLogo} alt='productLogo' className='h-2'/>
          </div>
          <h2 className='text-5xl md:text-7xl font-bold py-5'>The Fastest Delivery in <span className='text-green-600'>Your Home</span></h2>
          <p className='py-3 text-base'>Who wants freedom, let him be, for he is wise. Now, to the gentle, to the urn of abundance,
           he is sought. For now, truly, in time, he places the solace of seeking in the lake. To be wise, to be of the mind, is ours before the noble.
            Let us live with the good, and let us, with what is ours, say a prayer with it.</p>

          <button className='font-bold bg-green-500 text-slate-200 px-4 py-2 rounded-md'>Order Now</button>
        </div>

          {/* Right Section */}
        <div className='md:w-1/2 flex flex-wrap gap-5 p-4 justify-center'>
          {
            homeProductCartList[0] ? homeProductCartList.map(el => {
              return (
                <HomeCard
                  key = {el._id}
                  id = {el._id}
                  image = {el.image}
                  name = {el.name}
                  price = {el.price}
                  category = {el.category}
                />
              )
            }) : loadingArray.map((el, index) => {
              return(
                <HomeCard
                  key={index+"loading"}
                  loading = {'Loading...'}
                />
              )
            })
          }
        </div>
      </div>

        <div className = ''>
            <div className='flex w-full items-center'>
              <h2 className = 'font-bold text-2xl text-slate-800 mb-4'>Fresh Vegetables</h2>

              <div className='ml-auto flex gap-4'>
                <button onClick={previousProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrPrevious /></button>
                <button onClick={nextProduct} className='bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded'><GrNext /></button>
              </div>
            </div>
            <div className = 'flex gap-5 overflow-auto scrollbar-none scroll-smooth transition-all' ref={slideProductRef}>
              {
                homeProductCartListVegetables[0] ? homeProductCartListVegetables.map(el => {
                  return(
                    <CardFeature
                      key = {el._id+"vegetable"}
                      id={el._id}
                      name =  {el.name}
                      category = {el.category}
                      price = {el.price}
                      image = {el.image}
                    />
                  )
                })
                 : loadingArrayFeature.map((el, index) => <CardFeature loading= "Loading..." key={index+"cartLoading"}/> )
              }
            </div>
        </div>
        
        <AllProduct heading={"Your Product"}/>
        
    </div>
  )
}

export default Home
