import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import Layout from '../Layout/Layout';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import Loading from '../Loading';
import { FaTimes } from 'react-icons/fa';


const API_URL = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
    const navigate = useNavigate();
    const { handleSubmit, register } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showForgotModal, setShowForgotModal] = useState(false);


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

            if (user.role) {
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
                                <Link onClick={() => setShowForgotModal(true)}
                                    className="text-sm text-[#383185] hover:underline underline-offset-5">
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
            <ForgotPasswordModal isOpen={showForgotModal} onClose={() => setShowForgotModal(false)} />
        </>
    );
}



function ForgotPasswordModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1); // 1 = email, 2 = OTP, 3 = new password
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSendOtp = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${API_URL}/api/auth/forgot-password`, { email });
            toast.success(res.data.message);
            setStep(2);
        } catch (err) {
            toast.error(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async () => {
        try {
            setLoading(true);
            const res = await axios.post(`${API_URL}/api/auth/verify-otp`, { email, otp });
            toast.success(res.data.message);
            setStep(3);
        } catch (err) {
            toast.error(err.response?.data?.message || "Invalid OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${API_URL}/api/auth/reset-password`, { email, password });
            toast.success(res.data.message);
            onClose(); // Close modal after success
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <>
        {loading && <Loading />}
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-xl w-full max-w-md relative transition-all duration-300 ease-in-out">
                {/* Close Button */}
                <button
                    className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200"
                    onClick={onClose}
                >
                    <FaTimes size={18} />
                </button>

                {/* Step 1 - Email */}
                {step === 1 && (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Forgot Password</h2>
                        <input
                            type="email"
                            className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            onClick={handleSendOtp}
                            className="w-full bg-[#383185] hover:bg-[#2f296e] text-white font-semibold py-2.5 rounded-lg transition duration-300 cursor-pointer"
                        >
                            {loading ? "Sending..." : "Send OTP"}
                        </button>
                    </>
                )}

                {/* Step 2 - OTP */}
                {step === 2 && (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Enter OTP</h2>
                        <input
                            type="text"
                            className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button
                            onClick={handleVerifyOtp}
                            className="w-full bg-[#383185] hover:bg-[#2f296e] text-white font-semibold py-2.5 rounded-lg transition duration-300 cursor-pointer"
                        >
                            {loading ? "Verifying..." : "Verify OTP"}
                        </button>
                    </>
                )}

                {/* Step 3 - Reset Password */}
                {step === 3 && (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Reset Password</h2>
                        <input
                            type="password"
                            className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            className="w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            onClick={handleResetPassword}
                            className="w-full bg-[#383185] hover:bg-[#2f296e] text-white font-semibold py-2.5 rounded-lg transition duration-300 cursor-pointer"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </>
                )}
            </div>
        </div>
        </>
    );
}
