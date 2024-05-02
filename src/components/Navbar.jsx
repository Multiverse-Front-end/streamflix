import React from 'react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between p-4 z-[100] w-full absolute'>
    
      <h1 className='text-white text-4xl font-bold cursor-pointer'>
        STREAMFLIX
      </h1>
      <div>
       
          <button className='text-white pr-4'>Account</button>

        <button
        
          className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'
        >
          Logout
        </button>
      </div>
      <div>
      
          <button className='text-white pr-4'>Sign In</button>
       
          <button className='bg-red-600 px-6 py-2 rounded cursor-pointer text-white'>
            Sign Up
          </button>

      </div>
    )
  </div>
  )
}

export default Navbar;