/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress } from '@mui/material';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from '../../Loading';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const SuperadminPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <div className="min-h-screen p-4 md:p-8">
                {/* Header */}
                <div className="rounded-xl shadow-md border border-gray-400 p-6 mb-8">
                    <h1 className="text-3xl font-bold mb-2">🛠️ SuperAdmin Dashboard</h1>
                    <p className=" mb-4">Manage your platform efficiently.</p>
                    <div className="text-lg space-y-1">
                        <p>
                            <strong>Role:</strong> {user.role}
                        </p>
                        <p>
                            <strong>Welcome,</strong> {user.name}
                        </p>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Box 1 - Manage Users */}
                    <div className=" p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2">👥 Manage Users</h2>
                        <p className=" mb-4">
                            View, edit, or remove users from the system.
                        </p>
                        <Button variant="contained" color="primary">Go to Users</Button>
                    </div>

                    {/* Box 2 - Manage Content */}
                    <div className=" p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2">📝 Manage Content</h2>
                        <p className=" mb-4">
                            Add or edit website content like posts or updates.
                        </p>
                        <Button variant="contained" color="success">Manage Content</Button>
                    </div>

                    {/* Box 3 - Analytics */}
                    <div className=" p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2">📈 Analytics</h2>
                        <p className=" mb-4">
                            Check performance and activity reports.
                        </p>
                        <Button variant="contained" style={{ backgroundColor: "#7e22ce", color: "#fff" }}>
                            View Analytics
                        </Button>
                    </div>

                    {/* Box 4 - Settings */}
                    <div className=" p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition">
                        <h2 className="text-xl font-semibold mb-2">⚙️ Settings</h2>
                        <p className=" mb-4">
                            Adjust system preferences and configurations.
                        </p>
                        <Button variant="contained" style={{ backgroundColor: "#374151", color: "#fff" }}>
                            Open Settings
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export const Users = () => {
    const token = localStorage.getItem("Authorization");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState("all");

    const fetchUsers = async () => {
        try {
            setLoading(true);

            let url = `${VITE_BACKEND_URL}/api/auth/all/users`;
            if (selectedRole !== "all") {
                url += `?role=${selectedRole}`;
            }

            const res = await axios.get(url, {
                headers: {
                    Authorization: token,
                },
            });

            if (res.data.success) {
                setUsers(res.data.users);
            } else {
                toast.error("Failed to fetch users");
            }

            setLoading(false);
        } catch (err) {
            console.error("Error:", err);
            toast.error("Error fetching users");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [selectedRole]);

    return (
        <>
            {loading && <Loading />}
            <div className="sm:p-6 p-2">
                {/* Header */}
                <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">👥 All Users</h2>

                    {/* Role Filter */}
                    <div className="flex items-center gap-2">
                        <label className="text-sm font-medium">Filter by Role:</label>
                        <div className="relative w-48">
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                className="w-full cursor-pointer appearance-none border border-gray-300 bg-white text-gray-700 px-4 py-2 pr-8 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">All</option>
                                <option value="superadmin">Superadmin</option>
                                <option value="admin">Admin</option>
                                <option value="client">Client</option>
                            </select>

                            {/* Dropdown icon */}
                            <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                                <svg
                                    className="h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.936a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="text-md  my-2">
                    Total Users: {users.length}
                </p>

                {/* User Table */}
                <div className="overflow-x-auto rounded-xl">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">SR No</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            {users.map((user, index) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium">{user.name}</td>
                                    <td className="px-6 py-4 text-sm">{user.email}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm">
                                        {new Date(user.created_at).toLocaleString("en-IN", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export const AddNewAdmin = () => {
    const token = localStorage.getItem("Authorization")
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        console.log("Submitted Admin:", data);
        console.log("Type of data:", typeof data);

        try {
            setLoading(true);

            const res = await axios.post(`${VITE_BACKEND_URL}/api/auth/new/admin`, data, {
                    headers: {
                        Authorization: token,
                    },
                }
            );


            if (res.status === 200 || res.status === 201) {
                console.log("✅ Admin created successfully:", res.data);
                toast.success(res.data?.message || "Admin created successfully");
                reset(); // Clear form
            } else {
                // Just in case backend responds with unexpected code but no error thrown
                toast.error(res.data?.message || "Failed to create admin");
            }
        } catch (error) {
            console.error("Error creating admin:", error);
            toast.error(`❌ Error: ${error?.response?.data?.message || error.message}`);
        } finally {
            setLoading(false); // Always reset loading
        }
    };


    return (
        <>
            {loading && <Loading />}
            <div className="w-full py-2 px-2 sm:py-5 md:py-10 md:px-4">
                <div className="w-full max-w-2xl mx-auto bg-white sm:shadow-lg rounded-xl p-2 sm:p-5 md:p-10">
                    <h2 className="text-4xl font-extrabold text-[#383185] text-center mb-10 tracking-tight">
                        <span className="inline-block border-b-4 border-[#383185] pb-1">Add New Admin</span>
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm text-black font-semibold mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Enter name"
                                {...register("name", { required: "Name is required" })}
                                className="w-full bg-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#383185] text-gray-800"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-black font-semibold mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Enter email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email format",
                                    },
                                })}
                                className="w-full bg-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#383185] text-gray-800"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-black font-semibold mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters required",
                                    },
                                })}
                                className="w-full bg-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#383185] text-gray-800"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Role */}
                        <div className='relative'>
                            <label className="block text-sm text-black font-semibold mb-1">Role</label>
                            <select
                                {...register("role")}
                                className="w-full cursor-pointer appearance-none bg-gray-100 px-4 py-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#383185] text-gray-800"
                            >
                                <option disabled selected>-- Select Role --</option>
                                <option value="admin">Admin</option>
                                <option value="superadmin">Super Admin</option>
                            </select>

                            {/* Dropdown icon */}
                            <div className="pointer-events-none absolute inset-y-0 top-6 right-2 flex items-center text-gray-500">
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" >
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.936a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                backgroundColor: '#383185',
                                textTransform: 'none',
                                fontWeight: 600,
                                fontSize: '16px',
                                paddingY: 1.2,
                                borderRadius: '0.5rem',
                                '&:hover': {
                                    backgroundColor: '#2e285e',
                                },
                            }}
                        >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: 'white' }} />
                            ) : (
                                "Add Admin"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export const Analytics = () => {
    const token = localStorage.getItem("Authorization");
    const [loading, setLoading] = useState(false);
    const [analytics, setAnalytics] = useState({ admins: 0, parcels: 0, branches: 0, });

    // Data Fetch
    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const adminsRes = await axios.get(`${VITE_BACKEND_URL}/api/auth/all/admin`, {
                headers: { Authorization: token },
            });

            const parcelsRes = await axios.get(`${VITE_BACKEND_URL}/api/courier/all/courier`, {
                headers: { Authorization: token },
            });

            const branchesRes = await axios.get(`${VITE_BACKEND_URL}/api/branches/all/branch`, {
                headers: { Authorization: token },
            });

            setAnalytics({
                admins: adminsRes?.data?.admins.length || 0,
                parcels: parcelsRes?.data.length || 0,
                branches: branchesRes?.data.length || 0,
            });
        } catch (err) {
            console.error("Error:", err);
            toast.error("Error fetching analytics");
        } finally {
            setLoading(false);
        }
    };

    // Function Call
    useEffect(() => {
        fetchAnalytics();
    }, []);

    return (
        <div className="p-2 sm:p-4 md:p-6">
            <h2 className="text-2xl font-bold mb-4">📈 Analytics Dashboard</h2>

            {loading ? (
                <Loading />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="relative text-center bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden">
                        <div className="py-3 sm:py-6 p-3 sm:p-4 relative">
                            <img
                                src="https://demo.bootstrapdash.com/purple-admin-free/dist/themes/assets/images/dashboard/circle.svg"
                                alt="circle-image"
                                className="absolute right-0 top-0 h-full opacity-30 pointer-events-none"
                            />
                            <h4 className="text-lg font-semibold text-center">
                                Total Admins
                            </h4>
                            <h2 className="text-3xl font-bold mt-2">{analytics.admins}</h2>
                        </div>
                    </div>

                    <div className="relative text-center bg-gradient-to-r from-pink-400 to-red-300 text-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden">
                        <div className="py-3 sm:py-6 p-3 sm:p-4 relative">
                            <img
                                src="https://demo.bootstrapdash.com/purple-admin-free/dist/themes/assets/images/dashboard/circle.svg"
                                alt="circle-image"
                                className="absolute right-0 top-0 h-full opacity-30 pointer-events-none"
                            />
                            <h4 className="text-lg font-semibold text-center">
                                Parcels Issued
                            </h4>
                            <h2 className="text-3xl font-bold mt-2">{analytics.parcels}</h2>
                        </div>
                    </div>

                    <div className="relative text-center sm:col-span-2 lg:col-span-1 bg-gradient-to-r from-teal-400 to-green-400 text-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden">
                        <div className="py-3 sm:py-6 p-3 sm:p-4 relative">
                            <img
                                src="https://demo.bootstrapdash.com/purple-admin-free/dist/themes/assets/images/dashboard/circle.svg"
                                alt="circle-image"
                                className="absolute right-0 top-0 h-full opacity-30 pointer-events-none"
                            />
                            <h4 className="text-lg font-semibold text-center">
                                Branches
                            </h4>
                            <h2 className="text-3xl font-bold mt-2">{analytics.branches}</h2>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const SqlEditor = () => {
    const [query, setQuery] = useState('SELECT * FROM users;');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 10;

    const runQuery = async () => {
        setLoading(true);
        setError('');
        setResponse(null);
        try {
            const res = await axios.get(`${VITE_BACKEND_URL}/sql/editor`, {
                params: { query },
            });
            setResponse(res.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Unknown Error');
        } finally {
            setLoading(false);
        }
    };

    const paginatedRows = response?.rows?.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);
    const totalPages = Math.ceil((response?.rows?.length || 0) / rowsPerPage);

    return (
        <div className="mx-auto sm:p-3 md:p-6 space-y-6">
            <h2 className="text-3xl font-bold text-center">🧠 SQL Editor</h2>

            <div>
                <label htmlFor="sql-query" className="block font-semibold mb-2">Write SQL query</label>
                <textarea
                    id="sql-query"
                    className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={5}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="flex justify-end">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={runQuery}
                    disabled={loading}
                >
                    {loading ? <CircularProgress size={24} /> : '▶️ Run'}
                </Button>
            </div>

            {error && (
                <div className="bg-red-100 text-red-800 border border-red-300 px-4 py-2 rounded-md">
                    {error}
                </div>
            )}

            {response && (
                <div className="p-2 md:p-4 overflow-auto">
                    <div className="mb-4 font-semibold">
                        ✅ Query Result: {response.command} | Rows: {response.rowCount}
                    </div>

                    {response.rows?.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200 rounded-md overflow-hidden">
                            <thead className="bg-gray-800 text-white">
                                <tr>
                                    {response.fields
                                        .filter((field) => field.toLowerCase() !== 'password')
                                        .map((field) => (
                                            <th key={field} className="px-6 py-4 text-left font-semibold">
                                                {field}
                                            </th>
                                        ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300">
                                {paginatedRows.map((row, idx) => (
                                    <tr key={idx}>
                                        {response.fields
                                            .filter((field) => field.toLowerCase() !== 'password')
                                            .map((field) => (
                                                <td key={field} className="px-6 py-4">
                                                    {String(row[field])}
                                                </td>
                                            ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-green-600 mt-4">✅ Query executed. No rows returned.</p>
                    )}

                    <div className="flex justify-center gap-2 sm:gap-4 items-center text-black mt-4">
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Prev
                        </button>

                        <div className="space-x-2">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-1 bg-gray-200 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SuperadminPage;