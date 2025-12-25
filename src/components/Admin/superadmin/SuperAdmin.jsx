/* eslint-disable react-refresh/only-export-components */
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
                    <h2 className="text-2xl font-semibold text-gray-800">👥 All Users</h2>
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
            });

            if (res.status === 200 || res.status === 201) {
                console.log("Admin created successfully:", res.data);
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

export const Branches = () => {
    const [branches, setBranches] = useState([]);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem("Authorization");

    const GetAllBranches = async () => {
        try {
            setLoading(true);
            setBranches([]);
            const res = await axios.get(`${VITE_BACKEND_URL}/api/branches/all/branch`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            setBranches(res.data);
        } catch (error) {
            console.error("Error fetching branches:", error.message);
            toast.error("Failed to fetch branches");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        GetAllBranches();
    }, []);

    return (
        <>
            {loading && <Loading />}
            <div className="p-4 sm:p-6 md:p-8 bg-white text-black">
                <h2 className="text-2xl font-bold mb-4">
                    <span className="text-[#C2221F]">ShreeXpress Courier</span>{" "}
                    <span className="text-[#21294D]">Service PVT LTD</span>
                </h2>
                <p className="mb-6 text-md font-bold">Our All Branches</p>
                <div className="overflow-x-auto overflow-y-auto h-[80vh] shadow-lg rounded-lg border border-gray-200">
                    <table className="table table-pin-rows table-pin-cols w-full">
                        <thead className='text-white'>
                            <tr>
                                <th className="px-4 py-2">Sr No.</th>
                                <th className="px-4 py-2">Branch Name</th>
                                <th className="px-4 py-2">Branch Address</th>
                                <th className="px-4 py-2">Contact No</th>
                                <th className="px-4 py-2">Pincode</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branches.map((branche, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50 hover:bg-gray-100"}
                                >
                                    <td className="px-4 py-2">{index + 1}</td>
                                    <td className="px-4 py-2">{branche.branch_name}</td>
                                    <td className="px-4 py-2">{branche.address}</td>
                                    <td className="px-4 py-2">{branche.phone}</td>
                                    <td className="px-4 py-2">{branche.pincode}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
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
                headers: {
                    Authorization: token,
                }
            })

            console.log("OTP Logs Response:", res.data);
            setLogs(res.data);
        } catch (error) {
            console.log("Error fetching logs:", error.message);
            toast.error("Failed to fetch logs");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLogs();
    }, []);

    return (
        <>
            {loading && <Loading />}
            <h1 className='text-md font-bold my-2'>All Logs from Forget Password Users</h1>
            <div className='overflow-auto h-[80vh]'>
                <table className='table table-sm table-pin-rows table-pin-cols'>
                    <thead>
                        <tr>
                            <th>Sr No.</th>
                            <th>to_email</th>
                            <th>from_email</th>
                            <th>otp</th>
                            <th>status</th>
                            <th>ip_address</th>
                            {/* <th>user_agent</th> */}
                            <th>created_at</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            logs.map((log, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{log.to_email}</td>
                                    <td>{log.from_email}</td>
                                    <td>{log.otp}</td>
                                    <td>
                                        <span className={`inline-block px-3 py-1 text-xs font-semibold rounded
                                            ${log.status === 'verified' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                            {log.status}
                                        </span>
                                    </td>
                                    <td>{log.ip_address}</td>
                                    {/* <td>{log.user_agent}</td> */}
                                    <td>{new Date(log.created_at).toLocaleString("en-IN", {
                                        dateStyle: "medium",
                                        timeStyle: "short",
                                    })}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export const Block_email = () => {
    const [blackEmails, setBlackEmails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [reason, setReason] = useState('');
    const token = localStorage.getItem("Authorization");

    //onclick call
    const AddBloackEmail = async (e) => {
        e.preventDefault();
        if (!email || !reason) {
            toast.error("Email and reason are required");
            return;
        }
        try {
            setLoading(true);
            const res = await axios.post(`${VITE_BACKEND_URL}/api/block-email`, { email, reason }, {
                headers: {
                    Authorization: token,
                },
                body: JSON.stringify({ email, reason }),
            });
            console.log("Block Email Response:", res.data);
            if (res.data) {
                toast.success("Email blocked successfully");
                setBlackEmails([...blackEmails, { email, reason }]);
                setEmail('');
                setReason('');
            } else {
                toast.error(res.data.message || "Failed to block email OR ALready Exist");
            }
        } catch (error) {
            console.error("Error blocking email:", error);
            toast.error("Error blocking email OR ALready Exist");
        } finally {
            setLoading(false);
        }
    }

    const GetAllBloackEmail = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${VITE_BACKEND_URL}/api/blocked-emails`, {
                headers: {
                    Authorization: token,
                }
            });
            console.log("Blocked Emails Response:", res.data);
            if (res.data) {
                setBlackEmails(res.data);
            } else {
                toast.error(res.data || "Failed to fetch blocked emails");
            }
        } catch (error) {
            console.error("Error fetching blocked emails:", error.message);
            toast.error("Failed to fetch blocked emails");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        GetAllBloackEmail();
    }, []);

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            const res = await axios.delete(`${VITE_BACKEND_URL}/api/block-email/${id}`, {
                headers: {
                    Authorization: token,
                }
            });
            console.log("Delete Block Email Response:", res.data);
            if (res.data) {
                toast.success("Email unblocked successfully");
                setBlackEmails(blackEmails.filter(email => email.id !== id));
            } else {
                toast.error(res.data || "Failed to unblock email");
            }
        } catch (error) {
            console.error("Error unblocking email:", error);
            toast.error("Error unblocking email");
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            {loading && <Loading />}
            <div className='flex justify-between border-b-2 py-2 items-center'>
                <h1 className='text-md font-bold'>Block Emails</h1>
                <button className="btn btn-primary" onClick={() => document.getElementById('addBEmail').showModal()}>Add Block Email</button>
                {/* modal  */}
                <dialog id="addBEmail" className="modal">
                    <div className="modal-box text-white">
                        <h3 className="font-bold text-lg">Enter Block Email Id</h3>
                        <p className="py-4 text-sm">Press ESC key or click the button below to close</p>
                        <div className="modal-action flex flex-col">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <label className="floating-label my-2">
                                    <span>Your Email</span>
                                    <input onChange={(e) => setEmail(e.target.value)} type="text" placeholder="mail@site.com" className="input input-md" />
                                </label>
                                <label className="floating-label my-2">
                                    <span>reason</span>
                                    <textarea type="text" onChange={(e) => setReason(e.target.value)} placeholder="Enter Reason" className="textarea" />
                                </label>

                                <button onClick={AddBloackEmail} className="btn btn-success">{loading ? "Loading ..." : "Submit"}</button>
                                <button className="btn mx-2">close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </div>

            <div className='overflow-auto h-[80vh]'>
                <table className='table table-pin-rows table-pin-cols'>
                    <thead className='text-white'>
                        <tr>
                            <th>Sr No.</th>
                            <th>Email</th>
                            <th>Reason</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blackEmails.map((email, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{email.email}</td>
                                <td>{email.reason}</td>
                                <td> <button onClick={() => handleDelete(email.id)} className='btn btn-error'>Delete</button> </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export const AddBranch = () => {
    const token = localStorage.getItem("Authorization");
    const user = JSON.parse(localStorage.getItem("user"));

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

            const payload = { ...data, created_by: user?._id };

            await axios.post(`${VITE_BACKEND_URL}/api/branches/new/branch`, payload,
                { headers: { Authorization: token } }
            );

            toast.success("Branch added successfully");
            reset();
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {loading && <Loading />}

            <div className="w-full py-2 px-2 sm:py-5 md:py-10 md:px-4">
                <div className="w-full max-w-2xl mx-auto bg-white sm:shadow-lg rounded-xl p-2 sm:p-5 md:p-10">
                    <h2 className="text-4xl font-extrabold text-[#383185] text-center mb-10 tracking-tight">
                        <span className="inline-block border-b-4 border-[#383185] pb-1">
                            Add New Branch
                        </span>
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Branch Name */}
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-black">
                                Branch Name
                            </label>
                            <input
                                {...register("branch_name", { required: "Branch name is required" })}
                                placeholder="Enter branch name"
                                className=" w-full bg-gray-100  px-4 py-3 rounded-lg text-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#383185] "
                            />
                            {errors.branch_name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.branch_name.message}
                                </p>
                            )}
                        </div>

                        {/* Address */}
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-black">
                                Branch Address
                            </label>
                            <textarea
                                {...register("address", { required: "Address is required" })}
                                placeholder="Enter branch address"
                                rows={3}
                                className=" w-full bg-gray-100  px-4 py-3 rounded-lg text-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#383185] "
                            />
                            {errors.address && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.address.message}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-black">
                                Contact Number
                            </label>
                            <input
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: "Phone must be 10 digits",
                                    },
                                })}
                                placeholder="Enter 10 digit number"
                                className=" w-full bg-gray-100  px-4 py-3 rounded-lg text-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#383185] "
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* Pincode */}
                        <div>
                            <label className="block text-sm font-semibold mb-1 text-black">
                                Pincode
                            </label>
                            <input
                                {...register("pincode", {
                                    required: "Pincode is required",
                                    pattern: {
                                        value: /^[0-9]{6}$/,
                                        message: "Pincode must be 6 digits",
                                    },
                                })}
                                placeholder="Enter 6 digit pincode"
                                className=" w-full bg-gray-100  px-4 py-3 rounded-lg text-gray-800 placeholder:text-gray-400 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#383185] "
                            />
                            {errors.pincode && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.pincode.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button type="submit" fullWidth variant="contained" disabled={loading} sx={{
                            backgroundColor: "#383185",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "16px",
                            paddingY: 1.2,
                            borderRadius: "0.5rem",
                            "&:hover": {
                                backgroundColor: "#2e285e",
                            },
                        }} >
                            {loading ? (
                                <CircularProgress size={24} sx={{ color: "#fff" }} />
                            ) : (
                                "Add Branch"
                            )}
                        </Button>

                    </form>
                </div>
            </div>
        </>
    );
};

export default SuperadminPage;