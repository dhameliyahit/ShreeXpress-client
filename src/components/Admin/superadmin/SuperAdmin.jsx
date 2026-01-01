/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress } from '@mui/material';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from '../../Loading';
import { Users, FileText, BarChart2, Settings, UserPlus, MapPin, ShieldAlert, Mail, Phone, Hash, Shield, Trash2, X } from "lucide-react";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const SuperadminPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="min-h-screen p-4 md:p-8">
            {/* Header */}
            <div className="rounded-xl shadow-md border border-gray-400 p-6 mb-8">
                <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-purple-100 text-purple-700">
                        <Settings className="w-7 h-7" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">SuperAdmin Dashboard</h1>
                        <p className="text-gray-500 mt-1">Manage your platform efficiently.</p>
                        <div className="text-lg space-y-1 mt-2">
                            <p><strong>Role:</strong> {user.role}</p>
                            <p><strong>Welcome,</strong> {user.name}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Box 1 - Manage Users */}
                <div className="p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition">
                    <div className="flex items-center gap-2 mb-2">
                        <Users className="w-5 h-5 text-blue-600" />
                        <h2 className="text-xl font-semibold">Manage Users</h2>
                    </div>
                    <p className="mb-4 text-gray-600">View, edit, or remove users from the system.</p>
                    <Button variant="contained" color="primary">Go to Users</Button>
                </div>

                {/* Box 2 - Manage Content */}
                <div className="p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition">
                    <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-green-600" />
                        <h2 className="text-xl font-semibold">Manage Content</h2>
                    </div>
                    <p className="mb-4 text-gray-600">Add or edit website content like posts or updates.</p>
                    <Button variant="contained" color="success">Manage Content</Button>
                </div>

                {/* Box 3 - Analytics */}
                <div className="p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition">
                    <div className="flex items-center gap-2 mb-2">
                        <BarChart2 className="w-5 h-5 text-purple-600" />
                        <h2 className="text-xl font-semibold">Analytics</h2>
                    </div>
                    <p className="mb-4 text-gray-600">Check performance and activity reports.</p>
                    <Button variant="contained" style={{ backgroundColor: "#7e22ce", color: "#fff" }}>
                        View Analytics
                    </Button>
                </div>

                {/* Box 4 - Settings */}
                <div className="p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition">
                    <div className="flex items-center gap-2 mb-2">
                        <Settings className="w-5 h-5 text-gray-700" />
                        <h2 className="text-xl font-semibold">Settings</h2>
                    </div>
                    <p className="mb-4 text-gray-600">Adjust system preferences and configurations.</p>
                    <Button variant="contained" style={{ backgroundColor: "#374151", color: "#fff" }}>
                        Open Settings
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const User = () => {
    const token = localStorage.getItem("Authorization");
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedRole, setSelectedRole] = useState("all");

    const fetchUsers = async () => {
        try {
            setLoading(true);
            let url = `${VITE_BACKEND_URL}/api/auth/all/users`;
            if (selectedRole !== "all") url += `?role=${selectedRole}`;

            const res = await axios.get(url, {
                headers: { Authorization: token },
            });

            if (res.data?.users) {
                setUsers(res.data.users);
            } else {
                toast.error("Failed to fetch users");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error fetching users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [selectedRole]);

    const roleColor = (role) => {
        switch (role) {
            case "superadmin":
                return "bg-red-100 text-red-800 border border-red-200";
            case "admin":
                return "bg-blue-100 text-blue-800 border border-blue-200";
            case "client":
                return "bg-green-100 text-green-800 border border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border border-gray-200";
        }
    };

    return (
        <>
            {loading && <Loading />}
            <div className="sm:p-6 p-2">
                {/* Header */}
                <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">All Users</h2>
                            <p className="text-gray-500 mt-1">Manage and filter users by role.</p>
                        </div>
                    </div>

                    {/* Role Filter */}
                    <div className="relative w-48">
                        <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}
                            className="w-full cursor-pointer appearance-none border border-gray-300 bg-white text-gray-700 px-4 py-2 pr-8 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="all">All</option>
                            <option value="superadmin">Superadmin</option>
                            <option value="admin">Admin</option>
                            <option value="client">Client</option>
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center text-gray-500">
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20" fill="currentColor" >
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.936a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>
                </div>

                <p className="text-md my-2 text-gray-600">Total Users: {users.length}</p>

                {/* User Table */}
                <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">SR No</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold uppercase tracking-wider">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
                                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium text-gray-800">{user.name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{user.email}</td>
                                    <td className="px-6 py-4 text-sm">
                                        <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium shadow-sm ${roleColor(user.role)}`}>
                                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleString("en-IN", {
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
    const token = localStorage.getItem("Authorization");
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const res = await axios.post(`${VITE_BACKEND_URL}/api/auth/new/admin`, data, {
                headers: { Authorization: token },
            });
            if (res.status === 200 || res.status === 201) {
                toast.success(res.data?.message || "Admin created successfully");
                reset();
            } else {
                toast.error(res.data?.message || "Failed to create admin");
            }
        } catch (error) {
            console.error("Error creating admin:", error);
            toast.error(`Error: ${error?.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading />}
            <div className="w-full py-2 px-2 sm:py-5 md:py-10 md:px-4">
                <div className="w-full max-w-2xl mx-auto bg-white sm:shadow-lg rounded-xl p-2 sm:p-5 md:p-10">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                            <UserPlus className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800">Add New Admin</h2>
                            <p className="text-gray-500 mt-1">Create admins with proper roles and access.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Name */}
                        <div>
                            <label className="block text-sm text-black font-semibold mb-1">Name</label>
                            <input type="text" placeholder="Enter name"
                                {...register("name", { required: "Name is required" })}
                                className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm text-black font-semibold mb-1">Email</label>
                            <input type="email" placeholder="Enter email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email format",
                                    },
                                })}
                                className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm text-black font-semibold mb-1">Password</label>
                            <input type="password" placeholder="Enter password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Minimum 6 characters required",
                                    },
                                })}
                                className="w-full border border-gray-200 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        {/* Role */}
                        <div className="relative">
                            <label className="block text-sm text-black font-semibold mb-1">Role</label>
                            <select
                                {...register("role")}
                                className="w-full cursor-pointer appearance-none border border-gray-200 px-4 py-3 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800"
                            >
                                <option disabled selected>-- Select Role --</option>
                                <option value="admin">Admin</option>
                                <option value="superadmin">Super Admin</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 top-6 right-2 flex items-center text-gray-500">
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
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
                                '&:hover': { backgroundColor: '#2e285e' },
                            }}
                        >
                            {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : "Add Admin"}
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
    const [analytics, setAnalytics] = useState({ admins: 0, parcels: 0, branches: 0 });

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const [adminsRes, parcelsRes, branchesRes] = await Promise.all([
                axios.get(`${VITE_BACKEND_URL}/api/auth/all/admin`, { headers: { Authorization: token } }),
                axios.get(`${VITE_BACKEND_URL}/api/courier/all/courier`, { headers: { Authorization: token } }),
                axios.get(`${VITE_BACKEND_URL}/api/branches/all/branch`, { headers: { Authorization: token } }),
            ]);

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

    useEffect(() => { fetchAnalytics(); }, []);

    return (
        <div className="p-2 sm:p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-teal-100 text-teal-600">
                    <BarChart2 className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Analytics Dashboard</h2>
                    <p className="text-gray-500 mt-1">Overview of system admins, parcels, and branches.</p>
                </div>
            </div>

            {loading ? (
                <Loading />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Total Admins */}
                    <div className="relative text-center bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden">
                        <div className="py-3 sm:py-6 p-3 sm:p-4 relative">
                            <h4 className="text-lg font-semibold">Total Admins</h4>
                            <h2 className="text-3xl font-bold mt-2">{analytics.admins}</h2>
                        </div>
                    </div>

                    {/* Parcels Issued */}
                    <div className="relative text-center bg-gradient-to-r from-pink-400 to-red-300 text-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden">
                        <div className="py-3 sm:py-6 p-3 sm:p-4 relative">
                            <h4 className="text-lg font-semibold">Parcels Issued</h4>
                            <h2 className="text-3xl font-bold mt-2">{analytics.parcels}</h2>
                        </div>
                    </div>

                    {/* Branches */}
                    <div className="relative text-center sm:col-span-2 lg:col-span-1 bg-gradient-to-r from-teal-400 to-green-400 text-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden">
                        <div className="py-3 sm:py-6 p-3 sm:p-4 relative">
                            <h4 className="text-lg font-semibold">Branches</h4>
                            <h2 className="text-3xl font-bold mt-2">{analytics.branches}</h2>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const InfoRow = ({ icon, label, value, color = "blue" }) => {
    const colorMap = {
        blue: "bg-blue-100 text-blue-600",
        indigo: "bg-indigo-100 text-indigo-600",
        emerald: "bg-emerald-100 text-emerald-600",
        red: "bg-red-100 text-red-600"
    };

    return (
        <div className="flex items-start gap-3">
            <div className={`p-2 rounded-lg ${colorMap[color]}`}>
                {icon}
            </div>

            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="font-medium text-gray-800">
                    {value || "-"}
                </p>
            </div>
        </div>
    );
};
export const Branches = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const token = localStorage.getItem("Authorization");

    const GetAllBranches = async () => {
        try {
            setLoading(true);
            const res = await axios.get(
                `${VITE_BACKEND_URL}/api/branches/all/branch`,
                { headers: { Authorization: token } }
            );
            setBranches(res.data);
        } catch (error) {
            toast.error("Failed to fetch branches");
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAllBranches();
    }, []);

    const handleRowClick = (branch) => {
        setSelectedBranch(branch);
        setShowModal(true);
    };

    return (
        <>
            {loading && <Loading />}

            <div className="p-4 sm:p-6 md:p-8 bg-white text-black">
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-lg bg-red-100 text-red-600">
                        <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            ShreeXpress Courier Service
                        </h2>
                        <p className="text-gray-500 mt-1">
                            View all our active branches and contact details.
                        </p>
                    </div>
                </div>

                <p className="mb-4 text-md font-semibold text-gray-700">
                    Our All Branches
                </p>

                <div className="overflow-x-auto overflow-y-auto h-[80vh] shadow-lg rounded-lg border border-gray-200">
                    <table className="w-full">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-4 py-2">Sr No.</th>
                                <th className="px-4 py-2">Branch Name</th>
                                <th className="px-4 py-2">Branch Address</th>
                                <th className="px-4 py-2">Contact No</th>
                                <th className="px-4 py-2">Pincode</th>
                            </tr>
                        </thead>

                        <tbody>
                            {branches.map((branch, index) => (
                                <tr
                                    key={branch._id}
                                    onClick={() => handleRowClick(branch)}
                                    className="cursor-pointer hover:bg-gray-100"
                                >
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2 font-semibold">
                                        {branch.branch_name}
                                    </td>
                                    <td className="px-4 py-2">{branch.address}</td>
                                    <td className="px-4 py-2">{branch.phone}</td>
                                    <td className="px-4 py-2">{branch.pincode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Model */}
            {showModal && selectedBranch && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100/60 backdrop-blur-sm">
                    <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-gray-200">
                        <div className="flex items-center justify-between px-6 py-4 border-b">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    Branch Details
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Admin & branch information
                                </p>
                            </div>

                            <button
                                onClick={() => setShowModal(false)}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="rounded-xl border p-4 bg-gray-50">
                                <h4 className="text-sm font-semibold text-gray-600 mb-3">
                                    Branch Information
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    <InfoRow icon={<MapPin />} label="Branch" value={selectedBranch.branch_name} color="blue" />
                                    <InfoRow icon={<Hash />} label="Pincode" value={selectedBranch.pincode} color="indigo" />
                                    <InfoRow icon={<Phone />} label="Phone" value={selectedBranch.phone} color="indigo" />
                                    <div className="sm:col-span-2">
                                        <InfoRow icon={<MapPin />} label="Address" value={selectedBranch.address} />
                                    </div>
                                </div>
                            </div>

                            {/* Admin Info */}
                            <div className="rounded-xl border p-4 bg-white">
                                <h4 className="text-sm font-semibold text-gray-600 mb-3">
                                    Created By (Admin)
                                </h4>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                                    <InfoRow icon={<Users />} label="Name" value={selectedBranch.created_by?.name} color="emerald" />
                                    <InfoRow icon={<Mail />} label="Email" value={selectedBranch.created_by?.email} color="emerald" />
                                    <InfoRow icon={<Shield />} label="Role" value={selectedBranch.created_by?.role} color="emerald" />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center px-6 py-4 border-t bg-gray-50 rounded-b-2xl">
                            <p className="text-xs text-gray-500">
                                Only superadmin can delete branches
                            </p>

                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete Branch
                            </button>
                        </div>
                        {showDeleteConfirm && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-100/60 backdrop-blur-sm">
                                <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl border border-gray-200 p-6">

                                    <div className="flex flex-col items-center gap-4 text-center">
                                        <div className="bg-red-100 text-red-600 p-4 rounded-full">
                                            <Trash2 className="w-6 h-6" />
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-800">Confirm Deletion</h3>
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to delete the branch <b>{selectedBranch.branch_name}</b>? <br />
                                            This action cannot be undone.
                                        </p>

                                        <div className="flex gap-3 mt-4 w-full justify-center">
                                            <button
                                                onClick={() => setShowDeleteConfirm(false)}
                                                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                onClick={async () => {
                                                    try {
                                                        await axios.delete(
                                                            `${VITE_BACKEND_URL}/api/branches/${selectedBranch._id}`,
                                                            { headers: { Authorization: token } }
                                                        );
                                                        toast.success("Branch deleted successfully");
                                                        setShowDeleteConfirm(false);
                                                        setShowModal(false);
                                                        GetAllBranches();
                                                    } catch (error) {
                                                        toast.error(error.response?.data?.error || "Delete failed");
                                                    }
                                                }}
                                                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export const OTP_Logs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("Authorization");

    const fetchLogs = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${VITE_BACKEND_URL}/api/otp-logs`, {
                headers: { Authorization: token },
            });
            setLogs(res.data);
        } catch (error) {
            console.error("Error fetching logs:", error.message);
            toast.error("Failed to fetch OTP logs");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <>
            {loading && <Loading />}
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        OTP Logs
                    </h2>
                    <p className="text-gray-500 text-sm">
                        All logs from users who requested password resets
                    </p>
                </div>
            </div>

            <div className="overflow-auto h-[80vh] shadow-lg rounded-lg border border-gray-200">
                <table className="table table-pin-rows table-pin-cols w-full">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th>Sr No.</th>
                            <th>To Email</th>
                            <th>From Email</th>
                            <th>OTP</th>
                            <th>Status</th>
                            <th>IP Address</th>
                            <th>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map((log, index) => (
                            <tr
                                key={index}
                                className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
                            >
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{log.to_email}</td>
                                <td className="px-4 py-2">{log.from_email}</td>
                                <td className="px-4 py-2">{log.otp}</td>
                                <td className="px-4 py-2">
                                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded ${log.status === 'verified'
                                        ? 'bg-green-500 text-white'
                                        : 'bg-red-500 text-white'
                                        }`}>
                                        {log.status}
                                    </span>
                                </td>
                                <td className="px-4 py-2">{log.ip_address}</td>
                                <td className="px-4 py-2">
                                    {new Date(log.created_at).toLocaleString("en-IN", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export const Block_email = () => {
    const [blackEmails, setBlackEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');
    const token = localStorage.getItem("Authorization");

    // Fetch all blocked emails
    const GetAllBlockedEmails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${VITE_BACKEND_URL}/api/blocked-emails`, {
                headers: { Authorization: token },
            });
            setBlackEmails(res.data || []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch blocked emails");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAllBlockedEmails();
    }, []);

    const AddBlockEmail = async (e) => {
        e.preventDefault();
        if (!email || !reason) {
            toast.error("Email and reason are required");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(
                `${VITE_BACKEND_URL}/api/block-email`,
                { email, reason },
                { headers: { Authorization: token } }
            );
            if (res.data) {
                toast.success("Email blocked successfully");
                setBlackEmails([...blackEmails, { email, reason, id: res.data.id }]);
                setEmail('');
                setReason('');
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to block email");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            await axios.delete(`${VITE_BACKEND_URL}/api/block-email/${id}`, {
                headers: { Authorization: token },
            });
            setBlackEmails(blackEmails.filter((item) => item.id !== id));
            toast.success("Email unblocked successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to unblock email");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading />}
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-red-100 text-red-600">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">Blocked Emails</h2>
                        <p className="text-gray-500 text-sm">Manage blacklisted emails and reasons</p>
                    </div>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => document.getElementById('addBEmail').showModal()}
                >
                    Add Block Email
                </button>
            </div>

            {/* Modal */}
            <dialog id="addBEmail" className="modal">
                <div className="modal-box text-white">
                    <h3 className="font-bold text-lg">Enter Block Email</h3>
                    <p className="py-2 text-sm">Press ESC or click close to exit</p>
                    <form className="flex flex-col gap-2">
                        <input
                            type="text"
                            placeholder="Email"
                            className="input input-bordered w-full"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <textarea
                            placeholder="Reason"
                            className="textarea textarea-bordered w-full"
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                        <div className="flex gap-2 mt-2">
                            <button onClick={AddBlockEmail} className="btn btn-success">
                                {loading ? "Loading..." : "Submit"}
                            </button>
                            <button type="button" className="btn" onClick={() => document.getElementById('addBEmail').close()}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </dialog>

            {/* Table */}
            <div className="overflow-auto h-[80vh] shadow-lg rounded-lg border border-gray-200">
                <table className="table table-pin-rows table-pin-cols w-full">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th>Sr No.</th>
                            <th>Email</th>
                            <th>Reason</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blackEmails.map((item, index) => (
                            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{item.email}</td>
                                <td className="px-4 py-2">{item.reason}</td>
                                <td className="px-4 py-2">
                                    <button onClick={() => handleDelete(item.id)} className="btn btn-error btn-sm">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SuperadminPage;