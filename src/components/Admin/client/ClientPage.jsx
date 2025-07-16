import React from 'react'
import { TopBar } from '../../TopBar'

const ClientPage = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return (
        <>
        <TopBar/>
            <h1 className='tex-3xl'>{`Welcome, ${user.name}`}</h1>
        </>
    )
}

export default ClientPage