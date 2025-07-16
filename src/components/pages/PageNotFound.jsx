import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PageNotFound() {
    const PageNotFoundImg = '/assets/pagenotfound.gif';
    const navigate = useNavigate();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            {/* PageNotFound GIF */}
            <img
                src={PageNotFoundImg}
                alt="Page Not Found"
                className="max-w-full md:max-w-lg mb-6"
            />
            <h1 className="sm:text-3xl text-xl md:text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
            <p className="text-gray-600 mb-6">We couldn't find the page you're looking for.</p>
            <Link
                to={navigate(-1)}
                className="inline-block bg-red-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-700 transition"
            >
                Go Back
            </Link>
        </div>
    );
};

