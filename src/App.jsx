import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import About from './components/pages/About'
import PageNotFound from './components/pages/PageNotFound'
import RequestOfPickup from './components/pages/RequestOfPickup'
import Services from './components/pages/Services'
import ContactUs from './components/pages/ContactUs'
import Login from './components/pages/Login'
import { ToastContainer } from 'react-toastify'
import FranchiseeInquiry from './components/pages/FranchiseeInquiry'

export default function App() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/pickup-request' element={<RequestOfPickup />} />
        <Route path='/franchisee-inquiry' element={<FranchiseeInquiry />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </>
  )
}
