const ClientPage = () => {
    const user = JSON.parse(localStorage.getItem("user"))
    return (
        <>
            <h1 className='tex-3xl'>{`Welcome, ${user.name}`}</h1>
        </>
    )
}

export const Track = () => {
    return (
        <>
            <h2>Track</h2>
        </>
    )
}

export const MyShipments = () => {
    return (
        <>
            <h2>My Shipments</h2>
        </>
    )
}

export default ClientPage