import React from 'react'

import './Spinner.css'

const Spinner = () => {
  return (
    <svg className='spinner' role='alert' aria-live='assertive'>
        <circle className='spinner__path' cx='30' cy='30' r='20' fill='none' strokeWidth='2' strokeMiterlimit='10' />
    </svg>
  )
}

export default Spinner