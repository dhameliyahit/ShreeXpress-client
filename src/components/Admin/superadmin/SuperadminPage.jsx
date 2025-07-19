import React from 'react'
import { TopBar } from '../../TopBar'
import DashboardLayout from '../DashboardLayout'

const SuperadminPage = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  const userRole = 'superadmin';

  return (
    <>
      <TopBar />
      <DashboardLayout role={userRole} />

      <h1 className='text-2xl'>{`Welcome , ${user.role}`}</h1>
      <div className='text-xl'>{`Hello, ${user.name}`}</div>
    </>
  )
}

export default SuperadminPage