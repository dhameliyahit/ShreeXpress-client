import React from "react";
import { Link } from "react-router-dom";

export default function PageNotFound() {
    const PageNotFoundImg = 'https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif'
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            {/* PageNotFound GIF */}
            <img
                src={PageNotFoundImg}
                alt="Page Not Found"
                className="max-w-full md:max-w-lg mb-6"
            />
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Oops! Page Not Found</h1>
            <p className="text-gray-600 mb-6">The page you're looking for doesn't exist.</p>
            <Link
                to="/"
                className="inline-block bg-red-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-red-700 transition"
            >
                Go to Home
            </Link>
        </div>
    );
};

