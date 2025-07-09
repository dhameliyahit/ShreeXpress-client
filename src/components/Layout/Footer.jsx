import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className='w-full py-2 bg-[#222222]'>
        <p className='text-[#ACACAC] max-w-xl text-center md:text-start lg:max-w-7xl py-3 mx-auto text-sm'>© Copyright 2025, All rights reserved | <span className='font-bold'><Link to="/privacy-policy">Privacy Policy</Link></span></p>
      </div>
    </>
  )
}

export default Footer