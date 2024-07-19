import React, { useState } from 'react';
import './css/MyModal.css';


export default function MyModal() {

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
        setModal(!modal)
    }

    return <div className='fixed inset-0 bg-black bg opacity-30 backdrop-blur-sm'>

    <button className='bg-green-500 w-full text-lg font-bold py-2 text-white' onClick={toggleModal}>CHECKOUT</button>

        {
            modal && (
                <div className='modal'>
                    <div className='overlay'></div>
                    <div className='modal-content'>
                        <div className='flex items-center justify-between'>
                            <button>CARD</button>
                            <button>MPESA</button>
                        </div>
                        <div>
                            <button className='close-modal' onClick={toggleModal}>CLOSE</button>
                        </div>
                    </div>
                </div>
            )
        }

    </div>;
}