import React from 'react'
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="w-full min-h-[80vh] overflow-hidden">
                {children}
            </main>
            <Footer />
        </>
    );
};

export default Layout;
