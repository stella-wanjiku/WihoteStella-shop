import React, { useEffect, useState } from 'react';
import FilterProduct from './FilterProduct';
import CardFeature from './CardFeature';
import { useSelector } from 'react-redux';


const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.productList)
  const categoryList = [...new Set(productData.map(el => el.category))]

  //filter productData
  const [filterby, setFilterBy] = useState("")
  const [productFilter, setProductFilter] = useState([])

  useEffect(() => {
    setProductFilter(productData)
  }, [productData])

  const handleFilterProduct = (category) => {
    setFilterBy(category)
    const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase())
    setProductFilter(() => {
      return [
        ...filter,
      ]
    })
  }

  const loadingArrayFeature = new Array(7).fill(null)

  return (
    <div className='my-5'>
      <h2 className='font-bold text-2xl text-slate-800 mb-4'>{heading}</h2>
      <div className='flex gap-4 justify-center overflow-auto md:overflow-auto scrollbar-hidden'>   {/* style={{scrollbarColor: 'thin', overflowY: 'hidden', WebkitOverflowScrolling: 'touch', '@media only screen and (max-width: 600px)': {scrollbarWidth: 'none', overflowY: 'hidden'}}} */}
        {
          categoryList[0] ? categoryList.map(el => {
            return (
              <FilterProduct
                category={el}
                key={el.category}
                isActive={el.toLowerCase() === filterby.toLowerCase()}
                onClick={() => handleFilterProduct(el)}
              />
            )
          }) : <div className='min-h-[150px] flex justify-center items-center'>
            <p>Loading...</p>
          </div>
        }
      </div>

      <div className='flex flex-wrap justify-center gap-4 my-5'>
        {
          productFilter[0] ? productFilter.map(el => {
            return (
              <CardFeature
                id={el._id}
                key={el.id}
                image={el.image}
                name={el.name}
                price={el.price}
              />
            );
          })
            : loadingArrayFeature.map((el, index) => <CardFeature loading="Loading..." key={index + "allProduct "} />)
        }
      </div>
    </div>
  )
}

export default AllProduct;