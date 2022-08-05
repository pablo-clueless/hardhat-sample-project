import React from 'react'

const Navbar = ({ isWalletConnected }) => {

  return (
    <nav className='w-full flex items-center justify-between p-4 sm:px-1 py-2 bg-white'>
        <p className='text-base md:text-xl text-primary'>Bank dApp 💰</p>

        <button className={`px-2 py-1 text-sm md:text-base text-white ${isWalletConnected ? 'bg-green-400' : 'bg-red-400'}`}>
            {isWalletConnected ? 'Wallet Connected 🔒' : 'Connect Wallet 🔑'}
        </button>
    </nav>
  )
}

export default Navbar