import React, { useState } from 'react';
import { IoCloudUploadOutline } from "react-icons/io5";
import { ImageToBase64 } from '../utility/ImageToBase64';
import { toast } from 'react-hot-toast';

const NewProduct = () => {

  const [data, setData] = useState({
    name: '',
    category: '',
    image: '',
    price: '',
    description: '',
  })

  const handleOnChange = (e) => {
    const {name, value} = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const uploadImage = async(e) => {
    const data = await ImageToBase64(e.target.files[0])
    /* console.log(data) */

    setData((preve) => {
      return {
        ...preve,
        image: data
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(data)

    const {name, category, image, price} = data

    if (name && category && image && price) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })
  
      const fetchRes = await fetchData.json()
  
      /* console.log(fetchRes) */
      toast(fetchRes.message)

      setData(() => {
        return {
          name: '',
          category: '',
          image: '',
          price: '',
          description: '',
        }
      })
    } else {
      toast('Enter required fields')
    }
  }

    

  return (
    <div className='p-4'>
      <form className='m-auto w-full max-w-md shadow flex flex-col p-3 bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name' className='px-2'>Name</label>
        <input type={"text"} id='name' name='name' className='bg-slate-200 p-1 my-1' onChange={handleOnChange} value={data.name}/>

        <label htmlFor='category' className='px-2'>Category</label>
        <select className='bg-slate-200 p-1 my-1' id='category' name='category' onChange={handleOnChange} value={data.category}>
          <option value={'other'}>select category</option>
          <option value={'fruits'}>Fruits</option>
          <option value={'vegetables'}>Vegetables</option>
          <option value={'ice cream'}>Ice Cream</option>
          <option value={'drinks'}>Drinks</option>
          <option value={'pizza'}>Pizza</option>
          <option value={'flour'}>Flour</option>
          <option value={'rice'}>Rice</option>
          <option value={'tea'}>Tea Leaves</option>
          <option value={'coffee'}>Coffee Beans</option>
        </select>

        <label htmlFor='image' className='px-2'>Image
          <div className='h-40 w-full bg-slate-200 my-1 rounded flex items-center justify-center cursor-pointer'>
            {
              data.image ? <img src={data.image} alt='dataImage' className='h-full w-50'/> : <span className='text-5xl'><IoCloudUploadOutline/></span>
            }

            <input type={'file'} accept='image/*' id='image' onChange={uploadImage} className='hidden'/>
          </div> 
        </label>

        <label htmlFor='price' className='px-2'>Price</label>
        <input type={'text'} className='bg-slate-200 p-1 my-1' id='price' name='price' onChange={handleOnChange} value={data.price}/>

        <label htmlFor='description' className='px-2'>Description</label>
        <textarea rows={2} className='bg-slate-200 p-1 my-1 resize-none' id='description' name='description' onChange={handleOnChange} value={data.description}></textarea>

        <button className='bg-green-500 hover:bg-green-600 text-white text-lg font-medium my-2 drop-shadow'>Save</button>
      </form>
    </div>
  )
}

export default NewProduct
