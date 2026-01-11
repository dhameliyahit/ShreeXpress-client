/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress } from '@mui/material';
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from '../../Loading';
import { Users, FileText, BarChart2, Settings, UserPlus, MapPin, ShieldAlert, Mail, Phone, Hash, Shield, Trash2, X, Package, Building2 } from "lucide-react";
import { HiOfficeBuilding } from "react-icons/hi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const SuperadminPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="min-h-screen p-2 md:p-8">
            {/* Header */}
            <div className="rounded-xl shadow-md border border-gray-400 p-6 mb-8">
                <div className="flex flex-wrap items-start md:gap-4">
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
                <div className="p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition hover:scale-105">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Users className="w-5 h-5 text-blue-600" />
                            <h2 className="text-xl font-semibold">Manage Users</h2>
                        </div>
                        <p className="text-sm text-gray-600">View, edit, or remove users from the system.</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 font-medium">QUICK ACCESS</p>
                    </div>
                </div>

                {/* Box 2 - Manage Content */}
                <div className="p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition hover:scale-105">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <FileText className="w-5 h-5 text-green-600" />
                            <h2 className="text-xl font-semibold">Manage Content</h2>
                        </div>
                        <p className="text-sm text-gray-600">Add or edit website content like posts or updates.</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 font-medium">QUICK ACCESS</p>
                    </div>
                </div>

                {/* Box 3 - Analytics */}
                <div className="p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition hover:scale-105">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <BarChart2 className="w-5 h-5 text-purple-600" />
                            <h2 className="text-xl font-semibold">Analytics</h2>
                        </div>
                        <p className="text-sm text-gray-600">Check performance and activity reports.</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 font-medium">QUICK ACCESS</p>
                    </div>
                </div>

                {/* Box 4 - Settings */}
                <div className="p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition hover:scale-105">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Settings className="w-5 h-5 text-gray-700" />
                            <h2 className="text-xl font-semibold">Settings</h2>
                        </div>
                        <p className="text-sm text-gray-600">Adjust system preferences and configurations.</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-500 font-medium">QUICK ACCESS</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const User = () => {
    const token = localStorage.getItem("Authorization");
    const loggedInUserId = JSON.parse(localStorage.getItem("user"))?.id;
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRole, setSelectedRole] = useState("all");
    const [deleteUser, setDeleteUser] = useState(null);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            let url = `${VITE_BACKEND_URL}/api/auth/all/users`;
            if (selectedRole !== "all") url += `?role=${selectedRole}`;

            const res = await axios.get(url, {
                headers: { Authorization: token },
            });

            setUsers(res.data?.users || []);
        } catch (err) {
            toast.error("Error fetching users");
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [selectedRole]);

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`${VITE_BACKEND_URL}/api/auth/users/${id}`,
                { headers: { Authorization: token } }
            );

            toast.success("User deleted successfully");
            setUsers(prev => prev.filter(u => u._id !== id));
            setDeleteUser(null);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to delete user");
        }
    };

    const updateRole = async (id, role) => {
        try {
            await axios.put(`${VITE_BACKEND_URL}/api/auth/user/${id}/role`, { role },
                { headers: { Authorization: token } }
            );

            toast.success("Role updated successfully");
            fetchUsers();
        } catch (err) {
            console.log(err.message);
            toast.error("Failed to update role");
        }
    };

    const roleBadge = (role) => {
        switch (role) {
            case "superadmin":
                return "bg-red-100 text-red-700 border border-red-200";
            case "admin":
                return "bg-blue-100 text-blue-700 border border-blue-200";
            case "client":
                return "bg-green-100 text-green-700 border border-green-200";
            default:
                return "bg-gray-100 text-gray-700 border border-gray-200";
        }
    };

    return (
        <div className="max-w-7xl p-2 mx-auto bg-white rounded-2xl">

            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <Users className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            User Management
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            View and manage system users
                        </p>
                    </div>
                </div>

                <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-primary"
                >
                    <option value="all">All Roles</option>
                    <option value="superadmin">Superadmin</option>
                    <option value="admin">Admin</option>
                    <option value="client">Client</option>
                </select>
            </div>

            {!loading && (
                <p className="text-sm text-gray-600 mb-3">
                    Total Users: <span className="font-semibold">{users.length}</span>
                </p>
            )}

            {/* Table */}
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : users.length === 0 ? (
                <div className="text-center py-16 text-gray-500">
                    No users found
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="min-w-[900px] w-full text-sm">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-4 py-3 text-left">#</th>
                                <th className="px-4 py-3 text-left">Name</th>
                                <th className="px-4 py-3 text-left">Email</th>
                                <th className="px-4 py-3 text-left">Role</th>
                                <th className="px-4 py-3 text-left">Created BY</th>
                                <th className="px-4 py-3 text-left">Joined</th>
                                <th className="px-4 py-3 text-center">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {users.map((user, index) => {
                                return (
                                    <tr key={user._id} className="border-b hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 font-medium">{index + 1}</td>

                                        <td className="px-4 py-3 font-semibold">
                                            {user.name}
                                        </td>

                                        <td className="px-4 py-3 text-gray-600">
                                            {user.email}
                                        </td>

                                        <td className="px-3 py-2">
                                            {String(user._id) === String(loggedInUserId) ? (
                                                <span className={`px-2 py-0.5 rounded text-xs font-medium ${roleBadge(user.role)}`}>
                                                    {user.role.toUpperCase()}
                                                </span>
                                            ) : (
                                                <select value={user.role} onChange={(e) => updateRole(user._id, e.target.value)}
                                                    className="border border-gray-300 rounded-md px-2 py-1 text-xs bg-white focus:ring-1 focus:ring-primary"
                                                >
                                                    <option value="superadmin">Superadmin</option>
                                                    <option value="admin">Admin</option>
                                                    <option value="client">Client</option>
                                                </select>
                                            )}
                                        </td>

                                        <td className="px-4 py-3">
                                            {user.created_by?.email ? (
                                                user.created_by.email
                                            ) : (
                                                <span className="text-gray-400">—</span>
                                            )}
                                        </td>

                                        <td className="px-4 py-3 text-gray-500">
                                            {new Date(user.createdAt).toLocaleDateString("en-IN")}
                                        </td>

                                        <td className="px-4 py-3 text-center">
                                            {String(user._id) !== String(loggedInUserId) && (
                                                <button onClick={() => setDeleteUser(user)}
                                                    className="btn btn-xs bg-red-600 hover:bg-red-700 text-white">
                                                    Delete
                                                </button>
                                            )}
                                        </td>

                                        {deleteUser && (
                                            <div className="fixed inset-0 z-50 bg-black/20 flex items-center justify-center p-4">
                                                <div className="bg-white rounded-xl max-w-md w-full shadow-lg relative">

                                                    <button onClick={() => setDeleteUser(null)} className="absolute right-3 top-3 text-gray-500 hover:text-black">
                                                        ✕
                                                    </button>

                                                    <div className="p-6 text-center">
                                                        <h2 className="text-xl font-bold text-gray-800">
                                                            Delete User
                                                        </h2>

                                                        <p className="text-sm text-gray-600 mt-3">
                                                            Are you sure you want to delete
                                                        </p>

                                                        <p className="font-semibold text-gray-900 mt-1">
                                                            {deleteUser.name} ({deleteUser.role})
                                                        </p>

                                                        <p className="text-xs text-red-600 mt-2">
                                                            This action cannot be undone.
                                                        </p>

                                                        <div className="mt-6 flex justify-center gap-3">
                                                            <button onClick={() => setDeleteUser(null)}
                                                                className="btn btn-sm border border-gray-300" >
                                                                Cancel
                                                            </button>

                                                            <button onClick={() => handleDeleteUser(deleteUser._id)}
                                                                className="btn btn-sm bg-red-600 hover:bg-red-700 text-white"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
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
    const [chartData, setChartData] = useState([]);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);

            const [adminsRes, parcelsRes, branchesRes, parcelsChartRes] = await Promise.all([
                axios.get(`${VITE_BACKEND_URL}/api/auth/all/admin`, { headers: { Authorization: token } }),
                axios.get(`${VITE_BACKEND_URL}/api/courier/all/courier`, { headers: { Authorization: token } }),
                axios.get(`${VITE_BACKEND_URL}/api/branches/all/branch`, { headers: { Authorization: token } }),
                axios.get(`${VITE_BACKEND_URL}/api/courier/analytics`, { headers: { Authorization: token } }),
            ]);

            setAnalytics({
                admins: adminsRes?.data?.admins.length || 0,
                parcels: parcelsRes?.data?.count || 0,
                branches: branchesRes?.data.length || 0,
            });

            setChartData(parcelsChartRes?.data?.parcelsPerDay || []);
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
            <div className="flex flex-wrap items-center gap-2 mb-6">
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
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Admins */}
                        <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-2 sm:p-5 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Total Admins</p>
                                    <h2 className="text-3xl font-bold text-gray-800 mt-1">
                                        {analytics.admins}
                                    </h2>
                                </div>
                                <div className="p-3 bg-blue-100 text-blue-600 rounded-full group-hover:scale-110 transition">
                                    <Users className="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        {/* Parcels */}
                        <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border-l-4 border-rose-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Parcels Issued</p>
                                    <h2 className="text-3xl font-bold text-gray-800 mt-1">
                                        {analytics.parcels}
                                    </h2>
                                </div>
                                <div className="p-3 bg-rose-100 text-rose-600 rounded-full group-hover:scale-110 transition">
                                    <Package className="w-6 h-6" />
                                </div>
                            </div>
                        </div>

                        {/* Branches */}
                        <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-5 border-l-4 border-emerald-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Branches</p>
                                    <h2 className="text-3xl font-bold text-gray-800 mt-1">
                                        {analytics.branches}
                                    </h2>
                                </div>
                                <div className="p-3 bg-emerald-100 text-emerald-600 rounded-full group-hover:scale-110 transition">
                                    <Building2 className="w-6 h-6" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 bg-white rounded-xl shadow-lg sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                Parcels Issued (Last 30 Days)
                            </h3>
                            <span className="text-sm text-gray-500">
                                Daily distribution
                            </span>
                        </div>

                        <ResponsiveContainer width="100%" height={320}>
                            <BarChart data={chartData} margin={{ top: 20, right: 20, left: -20, bottom: 50 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                <XAxis
                                    dataKey="day"
                                    tick={{ fontSize: 11, fill: "#6b7280" }}
                                    angle={-90}
                                    textAnchor="end"
                                />
                                <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "none",
                                        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                                    }}
                                    labelStyle={{ fontWeight: "600" }}
                                />
                                <Bar
                                    dataKey="count"
                                    fill="#f43f5e"
                                    radius={[6, 6, 0, 0]}
                                    barSize={18}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </>
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
            const res = await axios.get(`${VITE_BACKEND_URL}/api/branches/all/branch`,
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

            <div className="p-2 sm:p-6 md:p-8 bg-white text-black">
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
                                <th className="px-4 py-2">#</th>
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
            setLogs(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error("Error fetching logs:", error.message);
            toast.error("Failed to fetch OTP logs");
            setLogs([]);
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

            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <ShieldAlert className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">OTP Logs</h2>
                    <p className="text-gray-500 text-sm">
                        All logs from users who requested password resets
                    </p>
                </div>
            </div>

            <div className="overflow-auto h-[80vh] shadow-lg rounded-lg border border-gray-200">
                {logs.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No OTP logs found</p>
                ) : (
                    <table className="table table-pin-rows table-pin-cols w-full">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th>#</th>
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
                                <tr key={log._id || index}
                                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
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
                                        {log.createdAt || log.created_at
                                            ? new Date(log.createdAt || log.created_at).toLocaleString("en-IN", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            })
                                            : "-"
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
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

    const GetAllBlockedEmails = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${VITE_BACKEND_URL}/api/blocked-emails`, {
                headers: { Authorization: token },
            });
            setBlackEmails(Array.isArray(res.data) ? res.data : []);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch blocked emails");
            setBlackEmails([]);
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
                setBlackEmails([...blackEmails, { _id: res.data._id || Date.now(), email, reason }]);
                setEmail('');
                setReason('');
                document.getElementById('addBEmail').close();
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
            setBlackEmails(blackEmails.filter((item) => (item._id || item.id) !== id));
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
            <div className="flex items-center flex-wrap justify-evenly sm:justify-between mb-4">
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
                {blackEmails.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">No blocked emails found</p>
                ) : (
                    <table className="table table-pin-rows table-pin-cols w-full">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th>#</th>
                                <th>Email</th>
                                <th>Reason</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blackEmails.map((item, index) => (
                                <tr key={item._id || index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{item.email}</td>
                                    <td className="px-4 py-2">{item.reason}</td>
                                    <td className="px-4 py-2">
                                        <button onClick={() => handleDelete(item._id || item.id)} className="btn btn-error btn-sm">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

const Detail = ({ label, value }) => (
    <div>
        <p className="text-gray-500 text-xs">{label}</p>
        <p className="font-medium text-gray-800">{value || "—"}</p>
    </div>
);
export const FranchiseInquiries = () => {
    const [inquiries, setInquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);

    const token = localStorage.getItem("Authorization");

    const fetchInquiries = async () => {
        try {
            const res = await axios.get(`${VITE_BACKEND_URL}/api/franchise/`,
                { headers: { Authorization: token } }
            );
            setInquiries(res.data.data || []);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load franchise inquiries");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${VITE_BACKEND_URL}/api/franchise/${id}`,
                { headers: { Authorization: token } }
            );

            toast.success("Franchise inquiry deleted");

            setInquiries(prev => prev.filter(item => item._id !== id));
            setSelected(null);
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete inquiry");
        }
    };

    return (
        <div className="max-w-7xl mx-auto md:p-4 bg-white rounded-2xl">
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <HiOfficeBuilding className="text-2xl" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Franchise Inquiries
                        </h1>
                        <p className="text-sm text-gray-500">
                            View and manage franchise requests
                        </p>
                    </div>
                </div>

                {!loading && (
                    <div className="text-sm font-medium text-gray-600">
                        Total Requests:
                        <span className="ml-1 font-semibold text-gray-900">
                            {inquiries.length}
                        </span>
                    </div>
                )}
            </div>

            {/* Loading */}
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : inquiries.length === 0 ? (
                <div className="py-16 text-center">
                    <h2 className="text-xl font-semibold text-gray-700">
                        No Franchise Inquiries Found
                    </h2>
                </div>
            ) : (
                <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                    <table className="min-w-[1000px] w-full text-center text-sm">
                        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                            <tr>
                                <th className="px-3 py-2">Name</th>
                                <th className="px-3 py-2">Email</th>
                                <th className="px-3 py-2">Phone</th>
                                <th className="px-3 py-2">Location</th>
                                <th className="px-3 py-2">Experience</th>
                                <th className="px-3 py-2">Created At</th>
                                <th className="px-3 py-2">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {inquiries.map((item) => (
                                <tr key={item._id} className="border-b hover:bg-gray-50 transition">
                                    <td className="px-3 py-2 font-semibold">
                                        {item.first_name} {item.last_name}
                                    </td>
                                    <td className="px-3 py-2">{item.email}</td>
                                    <td className="px-3 py-2">{item.phone}</td>
                                    <td className="px-3 py-2">{item.location}</td>
                                    <td className="px-3 py-2">
                                        {Math.floor(item.no_of_experience / 12)}y{" "}
                                        {item.no_of_experience % 12}m
                                    </td>
                                    <td className="px-3 py-2">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-3 py-2">
                                        <button onClick={() => setSelected(item)} className="btn btn-xs bg-primary text-white">
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* MODAL */}
            {selected && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-xl w-full shadow-lg relative">
                        <button onClick={() => setSelected(null)} className="absolute right-3 top-3 text-gray-500 hover:text-black">
                            <X />
                        </button>

                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4">
                                Franchise Inquiry Details
                            </h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <Detail label="Name" value={`${selected.first_name} ${selected.last_name}`} />
                                <Detail label="Email" value={selected.email} />
                                <Detail label="Phone" value={selected.phone} />
                                <Detail label="Location" value={selected.location} />
                                <Detail label="Pincode" value={selected.pincode} />
                                <Detail label="Current Business" value={selected.current_business} />
                                <Detail label="Experience"
                                    value={`${Math.floor(selected.no_of_experience / 12)} Years ${selected.no_of_experience % 12} Months`}
                                />
                                <Detail label="Submitted On" value={new Date(selected.createdAt).toLocaleString()} />
                            </div>

                            <div className="mt-4">
                                <p className="text-sm font-semibold text-gray-600 mb-1">
                                    Message
                                </p>
                                <div className="p-3 bg-gray-100 rounded-lg text-sm">
                                    {selected.message}
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button onClick={() => handleDelete(selected._id)} className="btn btn-sm bg-red-600 hover:bg-red-700 text-white">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const Contact = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("Authorization");

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${VITE_BACKEND_URL}/api/contact`, {
                headers: { Authorization: token },
            });
            setContacts(res.data);
        } catch (error) {
            console.error("Error fetching contacts:", error.message);
            toast.error("Failed to fetch contact requests");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
        <>
            {loading && <Loading />}

            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
                    <Mail className="w-6 h-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Contact Requests
                    </h2>
                    <p className="text-gray-500 text-sm">
                        All messages submitted through the contact form
                    </p>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-auto h-[80vh] shadow-lg rounded-lg border border-gray-200">
                <table className="table table-pin-rows table-pin-cols w-full">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Message</th>
                            <th>Submitted At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.length === 0 ? (
                            <tr>
                                <td colSpan={10} className="text-center py-6 text-gray-500">
                                    No contact requests found
                                </td>
                            </tr>
                        ) : (
                            contacts.map((contact, index) => (
                                <tr key={contact._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}>
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{contact.full_name}</td>
                                    <td className="px-4 py-2">{contact.email}</td>
                                    <td className="px-4 py-2">{contact.phone_number}</td>
                                    <td className="px-4 py-2">{contact.message}</td>
                                    <td className="px-4 py-2">
                                        {contact.createdAt ? new Date(contact.createdAt).toLocaleString("en-IN", {
                                            dateStyle: "medium",
                                            timeStyle: "short",
                                        }) : "-"}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default SuperadminPage;