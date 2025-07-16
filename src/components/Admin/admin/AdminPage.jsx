import React from 'react'
import Layout from '../../Layout/Layout'

const AdminPage = () => {

 const user = JSON.parse(localStorage.getItem("user"))
console.log(user)
  return (
    <Layout>
        <h1 className='py-2 text-2xl'>{user.name}</h1>
    </Layout>
  )
}

export default AdminPage