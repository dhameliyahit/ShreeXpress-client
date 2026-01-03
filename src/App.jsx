import React, { useContext } from 'react'
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
import Progress from './components/Progress'
import ThemeContext from './context/Theme/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import DashboardMain from './components/Admin/DashboardMain'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  const context = useContext(ThemeContext);
  const { theme } = context;
  return (
    <div className={`${theme === 'light' ? 'bg-white text-black' : 'dark:bg-[#05070A] dark:text-white'} transition-all duration-300`}>
      <Progress />
      <ScrollToTop />
      <ToastContainer />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/services' element={<Services />} />
        <Route path='/contact-us' element={<ContactUs />} />
        <Route path='/pickup-request' element={<RequestOfPickup />} />
        <Route path='/franchise-inquiry' element={<FranchiseeInquiry />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<PageNotFound />} />



        <Route path="/dashboard" element={
          <ProtectedRoute allowedRoles={['admin', 'superadmin', 'client']}>
            <DashboardMain />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  )
}