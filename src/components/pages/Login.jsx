import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import Layout from '../Layout/Layout';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../Loading';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

    const handleLogin = async (data) => {
        try {
            setLoading(true);
            const res = await axios.post(`${API_URL}/api/auth/login`, {
                email: data.email,
                password: data.password
            });
            setLoading(false);
            const { token, user } = res.data;

            localStorage.setItem("Authorization", `Bearer ${token}`);
            localStorage.setItem("user", JSON.stringify(user));

            toast.success("Login Successful");

            if (user.role === "admin") {
                navigate("/admin");
            } else if (user.role === "superadmin") {
                navigate("/superadmin");
            } else if (user.role === "client") {
                navigate("/client");
                navigate("/dashboard");
            } else if (user.role === "superadmin") {
                navigate("/dashboard");
            } else if (user.role === "client") {
                navigate("/dashboard");
            } else {
                navigate("/login");
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Login Failed");
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading />}
            <Layout>
                <div className="min-h-screen flex flex-col items-center justify-center sm:p-4">
                    <div className="w-full max-w-md bg-white shadow-xl rounded-lg sm:py-8 sm:px-8 py-6 px-4">
                        {/* Logo */}
                        <div className="text-center mb-6">
                            <img
                                src="assets/ShreeXpressLogo.png"
                                alt="ShreeXpress Courier Service"
                                className="h-16 mx-auto object-contain"
                            />
                            <h2 className="sm:text-2xl text-xl font-bold text-gray-700 mt-2">Welcome Back</h2>
                            <p className="sm:text-sm text-xs text-gray-500">Login to ShreeXpress Courier Service</p>
                        </div>

                        {/* Form */}
                        <form className="space-y-4" onSubmit={handleSubmit(handleLogin)}>
                            <div>
                                <label className="block text-sm font-medium text-gray-600">Email</label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    placeholder="you@example.com"
                                    className="mt-1 w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#383185] border-gray-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600">Password</label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        {...register("password")}
                                        placeholder="••••••••"
                                        className="mt-1 w-full text-black px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-[#383185] border-gray-300"
                                        required
                                    />
                                    <div
                                        onClick={togglePassword}
                                        className="absolute text-lg right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </div>
                                </div>
                            </div>

                            <div className="text-right">
                                <Link to="/forgot-password" className="text-sm text-[#383185] hover:underline underline-offset-5">
                                    Forgot Password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#383185] hover:bg-[#363353] cursor-pointer text-white py-2 rounded-lg text-lg font-medium transition duration-200"
                            >
                                Login
                            </button>
                        </form>

                        {/* Back to Home */}
                        <Link
                            to="/"
                            className="text-center text-[#383185] hover:underline underline-offset-5 mt-5 flex justify-center items-center gap-1"
                        >
                            <FaArrowLeft />
                            <span>Back to Home</span>
                        </Link>
                    </div>
                </div>
            </Layout>
        </>
    );
}

