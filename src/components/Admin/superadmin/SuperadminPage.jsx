import React from 'react'
import { TopBar } from '../../TopBar'

const SuperadminPage = () => {
  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <>
      <TopBar />
        <h1 className='text-2xl'>{`Welcome , ${user.role}`}</h1>
        <div className='text-xl'>{`Hello, ${user.name}`}</div>
      </>
    )
}

      export default SuperadminPage