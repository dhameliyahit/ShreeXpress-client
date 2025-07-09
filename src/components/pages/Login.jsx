import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";

export default function Login() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f5f5f5] to-[#e4e4e4] p-4">
            <div className="w-full max-w-md bg-white shadow-xl rounded-lg sm:py-8 sm:px-8 py-6 px-4">
                {/* Logo */}
                <div className="text-center mb-6">
                    <img
                        src="assets/ShreeXpressLogo.png"
                        alt="ShreeXpress Logo"
                        className="h-16 mx-auto object-contain"
                    />
                    <h2 className="sm:text-2xl text-xl font-bold text-gray-700 mt-2">Welcome Back</h2>
                    <p className="sm:text-sm text-xs text-gray-500">Login to ShreeXpress Courier Service</p>
                </div>

                {/* Form */}
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E31E25] border-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-600">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#E31E25] border-gray-300"
                            required
                        />
                    </div>
                    <div className="text-right">
                        <Link to="/forgot-password" className="text-sm text-[#E31E25] hover:underline underline-offset-5">
                            Forgot Password?
                        </Link>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-[#E31E25] hover:bg-[#c31a1f] text-white py-2 rounded-lg text-lg font-medium transition duration-200"
                    >
                        Login
                    </button>
                </form>

                {/* Register Link */}
                <p className="mt-6 text-center text-sm text-gray-600">
                    Don’t have an account?{" "}
                    <Link to="/register" className="text-[#E31E25] hover:underline underline-offset-5">
                        Register here
                    </Link>
                </p>
            </div>
            
            {/* Home Page Link */}
            <Link to="/" className='text-center text-[#E31E25] hover:underline underline-offset-5 mt-5 flex flex-wrap justify-center items-center'> <FaArrowLeft /> <span> Back to Home </span> </Link>
        </div>
    )
}
