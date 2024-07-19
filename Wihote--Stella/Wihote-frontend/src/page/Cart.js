import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import CartProduct from '../component/CartProduct';
import emptyCartImage from '../images/emptyCart.gif';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js'
import { useNavigate } from 'react-router-dom';
import MyModal from '../component/MyModal';

const Cart = () => {

    const [showPaymentOptions, setPaymentOptions] = useState(false);
    
    const productCartItem = useSelector((state) => state.product.cartItem);
    /* console.log(productCartItem); */
    const user = useSelector(state => state.user);
    /* console.log(user) */
    const navigate = useNavigate()

    const totalPrice = productCartItem.reduce((acc, curr) => acc + parseInt(curr.total), 0);
    const totalQty = productCartItem.reduce((acc, curr) => acc + parseInt(curr.qty), 0);

    const handleShowPaymentOptions = () =>{
        setPaymentOptions(preve => !preve)
      }

    const handlePayment = async () => {

        if (user.email) {
            const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
            const res = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/checkout-payment`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(productCartItem)
            })

            if (res.statusCode === 500) {
                return;
            }

            const data = await res.json()
            /* console.log(data) */

            toast("Redirect to payment page");
            stripePromise.redirectToCheckout({ sessionId: data })
        } else {
            toast("Login to Account");
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }
    }

    return (
        <>

            <div className='p-2 md:p-4'>
                <h2 className='m-4 text-lg md:text-2xl font-bold text-slate-600'>Your Cart Items</h2>


                {productCartItem[0] ?
                    <div className='my-4 flex'>
                        {/* display card items */}
                        <div className='w-full max-w-2xl'>
                            {
                                productCartItem.map(el => {
                                    return (
                                        <CartProduct
                                            key={el._id}
                                            id={el._id}
                                            name={el.name}
                                            image={el.image}
                                            category={el.category}
                                            qty={el.qty}
                                            price={el.price}
                                            total={el.total}
                                        />
                                    );
                                })
                            }
                        </div>

                        {/* total cart items */}
                        <div className='w-full max-w-md ml-auto px-4'>
                            <h2 className='bg-blue-500 text-white p-2 font-bold text-lg'>Summary</h2>
                            <div className='flex w-full py-2 text-lg border-b'>
                                <p>Total Qty: </p>
                                <p className='ml-auto w-32 font-bold'>{totalQty}</p>
                            </div>
                            <div className='flex w-full py-2 text-lg border-b'>
                                <p>Total Price: </p>
                                <p className='ml-auto w-32 font-bold'><span className='text-red-500'>ksh. </span>{totalPrice}</p>
                            </div>

                            <div className='w-full p-3'>
                                {/* <div className='py-3 mt-2'>
                                    <button className='bg-green-500 w-full text-lg font-bold py-2 text-white' onClick={handlePayment}>PAY WITH CARD</button>
                                </div>

                                <div className='py-3 mt-2'>
                                    <button className='bg-green-500 w-full text-lg font-bold py-2 text-white' onClick={handleShowPaymentOptions}>PAY WITH MPESA</button>
                                    
                                </div> */}
                                <button className='bg-green-500 w-full text-lg font-bold py-2 text-white' onClick={handlePayment}>CHECKOUT</button>
                                
                            </div>
                            {/* <MyModal /> */}
                        </div>
                    </div>

                    : <>
                        <div className='flex w-full justify-center items-center flex-col'>
                            <img src={emptyCartImage} alt='emptyCart' className='w-full max-w-[150px]' />
                            <p className='text-slate-600 text-3xl font-bold'>Cart Empty</p>
                        </div>
                    </>
                }
            </div>
        </>
    )
}

export default Cart;
