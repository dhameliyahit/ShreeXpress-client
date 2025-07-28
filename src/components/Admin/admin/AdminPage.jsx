/* eslint-disable react-hooks/exhaustive-deps */
import { Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../../Loading";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const AdminPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="min-h-screen p-4 md:p-8">
            {/* Header */}
            <div className="rounded-xl shadow-md border border-gray-400 p-6 mb-8">
                <h1 className="text-3xl font-bold mb-2">🛡️ Admin Dashboard</h1>
                <p className="mb-4">Welcome to your admin panel.</p>
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
                {/* Box 1 - View Orders */}
                <div className="p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2">📦 View Orders</h2>
                    <p className="mb-4">Track, update, and manage customer orders.</p>
                    <Button variant="contained" color="primary">
                        Go to Orders
                    </Button>
                </div>

                {/* Box 2 - Manage Couriers */}
                <div className="p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2">🚚 Manage Couriers</h2>
                    <p className="mb-4">Assign or remove couriers and track their delivery progress.</p>
                    <Button variant="contained" color="success">
                        Courier Panel
                    </Button>
                </div>

                {/* Box 3 - Revenue */}
                <div className="p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2">💰 Revenue</h2>
                    <p className="mb-4">View daily or monthly revenue and profits.</p>
                    <Button variant="contained" style={{ backgroundColor: "#7e22ce", color: "#fff" }}>
                        View Revenue
                    </Button>
                </div>

                {/* Box 4 - Admin Settings */}
                <div className="p-6 rounded-lg border border-gray-400 shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2">⚙️ Admin Settings</h2>
                    <p className="mb-4">Configure your dashboard or update your profile.</p>
                    <Button variant="contained" style={{ backgroundColor: "#374151", color: "#fff" }}>
                        Settings
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const CreateParcel = () => {
    return (
        <>
            <h2>CreateParcel</h2>
        </>
    )
}

export const AddNewClient = () => {
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

            const res = await axios.post(`${VITE_BACKEND_URL}/api/auth/new/client`, data, {
                headers: {
                    Authorization: token,
                },
            });

            if (res.status === 200 || res.status === 201) {
                console.log("✅ Admin created successfully:", res.data);
                toast.success(res.data?.message || "Client created successfully");
                reset(); // Clear form
            } else {
                // Just in case backend responds with unexpected code but no error thrown
                toast.error(res.data?.message || "Failed to create client");
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
            <div className="w-full py-2 px-2 sm:py-5 md:py-10 md:px-4">
                <div className="w-full max-w-2xl mx-auto bg-white sm:shadow-lg rounded-xl p-2 sm:p-5 md:p-10">
                    <h2 className="text-4xl font-extrabold text-[#383185] text-center mb-10 tracking-tight">
                        <span className="inline-block border-b-4 border-[#383185] pb-1">Add New Client</span>
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
                                "Add Client"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('Authorization');

    const fetchClient = async () => {
        try {
            setLoading(true);

            const res = await axios.get(`${VITE_BACKEND_URL}/api/auth/all/client`, {
                headers: {
                    Authorization: token,
                },
            });

            if (res.data.success) {
                if (res.data.users.length === 0) {
                    toast.info("No clients found.");
                } else {
                    setClients(res.data.users);
                }
            } else {
                toast.error(res.data.message || "Failed to fetch clients.");
            }

        } catch (err) {
            console.error("Error fetching clients:", err);
            toast.error("Server error while fetching clients.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchClient();
    }, []);

    console.log(clients);

    return (
        <>
            {loading && <Loading />}
            <div className="sm:p-6 p-2">
                {/* Header */}
                <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">👥 All Client</h2>
                </div>

                <p className="text-md  my-2">
                    Total Users: {clients.length}
                </p>

                {/* User Table */}
                <div className="overflow-x-auto rounded-xl">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">SR No</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Joined</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            {clients.map((client, index) => (
                                <tr key={client.id}>
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4 font-medium">{client.name}</td>
                                    <td className="px-6 py-4 text-sm">{client.email}</td>
                                    <td className="px-6 py-4 text-sm">
                                        {new Date(client.created_at).toLocaleString("en-IN", {
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
}

export default AdminPage