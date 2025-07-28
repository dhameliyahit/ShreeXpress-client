import {
    Button, Typography, Paper, Table, TableHead, TableBody, TableRow, TableCell,
    TextField, CircularProgress, Alert
} from '@mui/material'; import { useForm } from "react-hook-form";
import Sidebar from "../SideBar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Loading from '../../Loading';




const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const SuperAdminPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <>
            <div className="min-h-screen p-4 md:p-8">
                {/* Header */}
                <div className="rounded-xl shadow-md border border-gray-400 p-6 mb-8">
                    <h1 className="text-3xl font-bold mb-2">🛠️ Admin Dashboard</h1>
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
                        <Button variant="contained" color="primary" onClick={fetchUsers}>
                            Refresh
                        </Button>
                        <label className="text-sm font-medium text-gray-700">Filter by Role:</label>
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

                <p className="text-md text-gray-500 my-2">
                    Total Users: {users.length}
                </p>

                {/* User Table */}
                <div className="overflow-x-auto rounded-xl shadow border border-gray-400">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-6 py-3 text-left text-sm font-semibold">SR No</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                                <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
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

            const res = await axios.post(
                `${VITE_BACKEND_URL}/api/auth/new/admin`,
                data,
                {
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
            <div className="max-w-2xl mx-auto  rounded-xl shadow-md border border-gray-400 p-3 sm:p-6">
                <h2 className="text-2xl font-bold text-center my-8">
                    ➕ Add New Admin
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block font-mediummb-1">Name</label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            {...register("name", { required: "Name is required" })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block font-medium mb-1">Email</label>
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block font-medium mb-1">Password</label>
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    {/* Role */}
                    <div>
                        <label className="block font-medium mb-1">Role</label>
                        <select
                            {...register("role")}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            <option value="admin">Admin</option>
                            <option value="superadmin">Super Admin</option>
                        </select>
                    </div>

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        className="w-full"
                        sx={{ py: 1.5, fontWeight: 600, borderRadius: 2 }}
                    >
                        Add Admin
                    </Button>
                </form>
            </div>
        </>
    );
};

export const Analytics = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">📈 Analytics Dashboard</h2>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="shadow-md p-4 rounded-xl text-center">
                    <h3 className="text-lg font-semibold">Total Admins</h3>
                    <p className="text-3xl font-bold text-blue-600 mt-2">12</p>
                </div>

                <div className="shadow-md p-4 rounded-xl text-center">
                    <h3 className="text-lg font-semibold">Total Clients</h3>
                    <p className="text-3xl font-bold text-green-600 mt-2">58</p>
                </div>

                <div className="shadow-md p-4 rounded-xl text-center">
                    <h3 className="text-lg font-semibold">Parcels Issued</h3>
                    <p className="text-3xl font-bold text-purple-600 mt-2">320</p>
                </div>

                <div className="shadow-md p-4 rounded-xl text-center">
                    <h3 className="text-lg font-semibold">Branches</h3>
                    <p className="text-3xl font-bold text-yellow-600 mt-2">5</p>
                </div>
            </div>
        </div>
    );
};

export const SqlEditor = () => {
    const [query, setQuery] = useState('SELECT * FROM users;');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <Typography variant="h4" className="text-center font-bold">
                🧠 SQL Editor
            </Typography>

            <TextField
                label="Write SQL query"
                multiline
                rows={5}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                fullWidth
                variant="outlined"
            />

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
                <Alert severity="error" className="mt-4">{error}</Alert>
            )}

            {response && (
                <Paper elevation={3} className="p-4">
                    <Typography variant="h6" gutterBottom>
                        ✅ Query Result: {response.command} | Rows: {response.rowCount}
                    </Typography>

                    {response.rows?.length > 0 ? (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {response.fields.map((field) => (
                                        <TableCell key={field}><strong>{field}</strong></TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {response.rows.map((row, idx) => (
                                    <TableRow key={idx}>
                                        {response.fields.map((field) => (
                                            <TableCell key={field}>{String(row[field])}</TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    ) : (
                        <Typography className="mt-4">✅ Query executed. No rows returned.</Typography>
                    )}
                </Paper>
            )}
        </div>
    );
};

export default SuperAdminPage;