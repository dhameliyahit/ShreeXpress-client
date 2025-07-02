import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="w-full min-h-[80vh] bg-[#F5F5F5]">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
