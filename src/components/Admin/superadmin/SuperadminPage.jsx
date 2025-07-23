import { Button, Card, CardContent, MenuItem, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import Sidebar from "../SideBar";

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

const dummyAdmins = [
    {
        id: 1,
        name: "Balar Crens",
        email: "balarcrens@example.com",
        role: "Super Admin",
        joined: "2024-07-05",
    },
    {
        id: 2,
        name: "Dhameliya Hit",
        email: "hit@example.com",
        role: "Super Admin",
        joined: "2024-06-12",
    },
];

export const ShowAdmins = () => {
    return (
        <div className="sm:p-6 p-2">
            {/* Header */}
            <div className="mb-4 flex justify-between items-center">
                <h2 className="text-2xl font-semibold">👥 All Admins</h2>
                {/* add a search button PENDING... */}
            </div>

            {/* Table */}
            <div className="overflow-x-auto  rounded-xl shadow border border-gray-400">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-800 text-white">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold">#</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold">Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1F242A]">
                        {dummyAdmins.map((admin, index) => (
                            <tr key={admin.id}>
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4 font-medium">{admin.name}</td>
                                <td className="px-6 py-4 text-sm ">{admin.email}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                                        {admin.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm ">{admin.joined}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export const AddNewAdmin = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log("Submitted Admin:", data);
        alert("✅ Admin added successfully!");
        reset();
    };

    return (
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
                        <option value="Admin">Admin</option>
                        <option value="Super Admin">Super Admin</option>
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

export default SuperAdminPage;