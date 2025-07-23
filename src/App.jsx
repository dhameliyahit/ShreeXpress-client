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
import AdminPage from './components/Admin/admin/AdminPage'
import ClientPage from './components/Admin/client/ClientPage'
import SuperadminPage from './components/Admin/superadmin/SuperAdminPage'
import DashboardMain from './components/Admin/DashboardMain'

export default function App() {
  const context = useContext(ThemeContext);
  const { theme } = context;
  return (
    <div className={`${theme === 'light' ? 'bg-white text-black' : 'dark:bg-[#05070A] dark:text-white'} transition-all duration-300`}>
      <Progress />
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
        <Route path="/dashboard" element={<DashboardMain />} />
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        }
        />

        <Route path="/superadmin" element={
          <ProtectedRoute allowedRoles={["superadmin"]}>
            <SuperadminPage />
          </ProtectedRoute>
        }
        />

        <Route path="/client" element={
          <ProtectedRoute allowedRoles={["client"]}>
            <ClientPage />
          </ProtectedRoute>
        }
        />
      </Routes>
    </div>
  )
}