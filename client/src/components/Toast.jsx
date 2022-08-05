import React from 'react'

import { Spinner } from '../assets'

const Toast = ({type, message, onClear}) => {
    if(type === 'error') {
        return (
            <div className='w-screen h-screen absolute top-0 left-0 grid place-items-center z-20'>
                <div className='h-200 w-300 md:w-500 px-2 py-1 grid place-items-center bg-red-100 text-red-600 border-1 border-red-600'>
                    <div className='w-full text-center'>
                        <p>{message}</p>
                    </div>
                    <button onClick={onClear} className='bg-red-600 text-white px-4 py-1'>
                        Ok
                    </button>
                </div>
            </div>
        )
    }
    
    if(type === 'success') {
        return (
            <div className='w-screen h-screen absolute top-0 left-0 grid place-items-center z-20'>
                <div className='h-200 w-300 md:w-500 px-2 py-1 grid place-items-center bg-green-100 text-green-600 border-1 border-green-600'>
                    <div className='w-full text-center'>
                        <p>{message}</p>
                    </div>
                    <button onClick={onClear} className='bg-green-600 text-white px-4 py-1'>
                        Ok
                    </button>
                </div>
            </div>
        )
    }

    if(type === 'warning') {
        return (
            <div className='w-screen h-screen absolute top-0 left-0 grid place-items-center z-20'>
                <div className='h-200 w-300 md:w-500 px-2 py-1 grid place-items-center bg-yellow-100 text-yellow-600 border-1 border-yellow-600'>
                    <div className='w-full text-center'>
                        <p>{message}</p>
                    </div>
                    <button onClick={onClear} className='bg-yellow-600 text-white px-4 py-1'>
                        Ok
                    </button>
                </div>
            </div>
        )
    }

  return (
    <div className='w-screen h-screen absolute top-0 left-0 grid place-items-center z-20'>
        <div className='h-200 w-300 md:w-500 px-2 py-1 grid place-items-center bg-blue-100 text-blue-600 border-1 border-blue-600'>
            <div className='w-full text-center'>
                <p>{message}</p>
            </div>
            <Spinner />
        </div>
    </div>
  )
}

export default Toast