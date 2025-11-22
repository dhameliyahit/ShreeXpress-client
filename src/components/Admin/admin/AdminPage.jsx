/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loading from "../../Loading";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

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

export const Shipments = () => {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("Authorization"); // JWT token

    const fetchShipments = async () => {
        try {
            const res = await axios.get(
                `${API_BASE}/api/courier/my/courier`,
                { headers: { Authorization: `${token}` } }
            );
            setShipments(res.data.parcels || []);
        } catch (err) {
            console.error("Error fetching shipments:", err);
        } finally {
            setLoading(false);
        }
    };

    const updatePayment = async (id, payment_status, payment_method) => {
        // Optimistic state update
        setShipments((prev) =>
            prev.map((parcel) =>
                parcel.id === id
                    ? { ...parcel, payment_status, payment_method }
                    : parcel
            )
        );

        try {
            await axios.patch(
                `${API_BASE}/api/courier/payment/status`,
                { id, payment_status, payment_method },
                { headers: { Authorization: `${token}` } }
            );
            toast.success("Update Successfully");
            fetchShipments(); // refresh after update
        } catch (err) {
            console.error("Error updating payment:", err);
            toast.error("Error while updating..");
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

    return (
        <div className="max-w-7xl mx-auto p-6 bg-white text-black rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">📦 My Shipments</h1>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : shipments.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No shipments found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full bg-white text-black">
                        <thead className="bg-white text-black">
                            <tr>
                                <th>Tracking No.</th>
                                <th>Sender</th>
                                <th>Receiver</th>
                                <th>From Branch</th>
                                <th>To Branch</th>
                                <th>Weight</th>
                                <th>Status</th>
                                <th>Payment Method</th>
                                <th>Payment Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white text-black">
                            {shipments.map((parcel) => (
                                <tr key={parcel.id} className="bg-white text-black border-b">
                                    <td className="font-semibold">{parcel.tracking_number}</td>
                                    <td>
                                        {parcel.sender_name}
                                        <br />
                                        <span className="text-sm">{parcel.sender_phone}</span>
                                    </td>
                                    <td>
                                        {parcel.receiver_name}
                                        <br />
                                        <span className="text-sm">{parcel.receiver_phone}</span>
                                    </td>
                                    <td>{parcel.from_branch_name}</td>
                                    <td>{parcel.to_branch_name}</td>
                                    <td>{parcel.weight} g</td>
                                    <td>
                                        <span
                                            className={`badge badge-sm ${parcel.current_status === "created"
                                                ? "bg-blue-200 text-black"
                                                : "bg-green-200 text-black"
                                                }`}
                                        >
                                            {parcel.current_status}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            className="select select-bordered select-sm bg-white text-black"
                                            value={parcel.payment_method || ""}
                                            onChange={(e) =>
                                                updatePayment(parcel.id, parcel.payment_status, e.target.value)
                                            }
                                        >
                                            <option value="">Select Method</option>
                                            <option value="Cash">Cash</option>
                                            <option value="Card">Card</option>
                                            <option value="UPI">UPI</option>
                                            <option value="NetBanking">NetBanking</option>
                                        </select>
                                    </td>
                                    <td>
                                        <select
                                            className="select select-bordered select-sm bg-white text-black"
                                            value={parcel.payment_status || ""}
                                            onChange={(e) =>
                                                updatePayment(parcel.id, e.target.value, parcel.payment_method)
                                            }
                                        >
                                            <option value="success">Success</option>
                                            <option value="pending">Pending</option>
                                            <option value="failed">Failed</option>
                                            <option value="cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                updatePayment(
                                                    parcel.id,
                                                    parcel.payment_status,
                                                    parcel.payment_method
                                                )
                                            }
                                            className="btn btn-sm bg-primary text-white hover:bg-primary-focus"
                                        >
                                            Save
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export const CreateParcel = () => {
    const [branches, setBranches] = useState([]);
    const [branchSearch, setBranchSearch] = useState("");
    const [previewData, setPreviewData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectBranch = (id) => {
        setValue("to_branch", id);
        setIsOpen(false); // close dropdown after selecting
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
        setValue,
    } = useForm();

    const token = localStorage.getItem("Authorization");

    useEffect(() => {
        const fetchBranches = async () => {
            try {
                const url = `${API_BASE}/api/branches/info/branch`;
                const res = await axios.get(url, {
                    headers: { Authorization: `${token}` },
                });
                setBranches(res.data.branches || []);
            } catch (err) {
                console.error("Error fetching branches:", err);
            }
        };
        fetchBranches();
    }, [token]);

    const handlePreview = (data) => {
        console.log("Form Data to Send Backend:", data);
        if (!data.to_branch) {
            toast.error("Please select a branch before previewing.");
            return;
        }
        setPreviewData(data);
    };

    const handleConfirm = async () => {
        try {
            const res = await axios.post(
                `${API_BASE}/api/courier/new/courier`,
                previewData,
                {
                    headers: { Authorization: token },
                }
            );
            toast.success("Parcel created successfully!");
            reset();
            setPreviewData(null);
        } catch (error) {
            console.error("Error creating parcel:", error);
            toast.error(error.response?.data?.error || "Failed to create parcel");
        }
    };

    const filteredBranches = branches.filter((branch) =>
        branch.branch_name.toLowerCase().includes(branchSearch.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto p-6 rounded-xl shadow-xl bg-white text-black border border-gray-300">
            <h2 className="text-3xl font-bold mb-6 text-center border-b border-gray-200 pb-3">
                Create Parcel
            </h2>

            <form
                onSubmit={handleSubmit(handlePreview)}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
                {/* Sender Section */}
                <h3 className="md:col-span-2 font-semibold text-lg border-b border-gray-200 pb-2">
                    Sender Details
                </h3>
                <input
                    type="text"
                    placeholder="Sender Name"
                    {...register("sender_name", { required: true })}
                    className="input input-bordered w-full bg-white text-black border border-gray-300 focus:border-blue-500"
                />
                {errors.sender_name && <span className="text-error text-sm">Required</span>}

                <input
                    type="text"
                    placeholder="Sender Phone"
                    {...register("sender_phone", { required: true })}
                    className="input input-bordered w-full bg-white text-black border border-gray-300 focus:border-blue-500"
                />
                {errors.sender_phone && <span className="text-error text-sm">Required</span>}

                <input
                    type="text"
                    placeholder="Sender Address"
                    {...register("sender_address", { required: true })}
                    className="input input-bordered w-full md:col-span-2 bg-white text-black border border-gray-300 focus:border-blue-500"
                />

                {/* Receiver Section */}
                <h3 className="md:col-span-2 font-semibold text-lg border-b border-gray-200 pb-2 mt-4">
                    Receiver Details
                </h3>
                <input
                    type="text"
                    placeholder="Receiver Name"
                    {...register("receiver_name", { required: true })}
                    className="input input-bordered w-full bg-white text-black border border-gray-300 focus:border-blue-500"
                />
                {errors.receiver_name && <span className="text-error text-sm">Required</span>}

                <input
                    type="text"
                    placeholder="Receiver Phone"
                    {...register("receiver_phone", { required: true })}
                    className="input input-bordered w-full bg-white text-black border border-gray-300 focus:border-blue-500"
                />
                {errors.receiver_phone && <span className="text-error text-sm">Required</span>}

                <input
                    type="text"
                    placeholder="Receiver Address"
                    {...register("receiver_address", { required: true })}
                    className="input input-bordered w-full md:col-span-2 bg-white text-black border border-gray-300 focus:border-blue-500"
                />

                {/* Branch Dropdown */}
                <div className="md:col-span-2">
                    <label className="block mb-2 font-semibold">Select Branch</label>

                    <div className="relative w-full">
                        {/* Toggle Button */}
                        <button
                            type="button"
                            onClick={() => setIsOpen((prev) => !prev)}
                            className="btn w-full justify-between bg-white text-black border border-gray-300 hover:border-blue-500"
                        >
                            {branches.find((b) => b.id === watch("to_branch"))?.branch_name || "Select Branch"}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {/* Dropdown */}
                        {isOpen && (
                            <ul
                                className=" absolute mt-1 w-full max-h-64 overflow-y-auto rounded-md border border-gray-300 bg-white text-black shadow-lg z-50">
                                <li className="p-2 sticky top-0 bg-white border-b border-gray-200">
                                    <input
                                        type="text"
                                        placeholder="Search Branch..."
                                        value={branchSearch}
                                        onChange={(e) => setBranchSearch(e.target.value)}
                                        className=" w-full px-3 py-2 border border-gray-300 rounded-md text-black bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 "
                                    />
                                </li>

                                {filteredBranches.length > 0 ? (
                                    filteredBranches.map((branch) => (
                                        <li key={branch.id}>
                                            <button
                                                type="button"
                                                onClick={() => handleSelectBranch(branch.id)}
                                                className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${watch("to_branch") === branch.id ? "bg-blue-100 font-semibold" : ""
                                                    }`}
                                            >
                                                {branch.branch_name}
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-4 py-2 text-gray-500">No branches found</li>
                                )}
                            </ul>
                        )}
                    </div>
                    {errors.to_branch && <span className="text-error text-sm">Select a branch</span>}
                </div>

                {/* Other Fields */}
                <input
                    type="number"
                    step="0.01"
                    placeholder="Weight (kg)"
                    {...register("weight", { required: true })}
                    className="input input-bordered w-full bg-white text-black border border-gray-300 focus:border-blue-500"
                />
                <input
                    type="text"
                    placeholder="Dimensions"
                    {...register("dimensions")}
                    className="input input-bordered w-full bg-white text-black border border-gray-300 focus:border-blue-500"
                />

                <select
                    {...register("package_type", { required: true })}
                    className="select select-bordered w-full bg-white text-black border border-gray-300 focus:border-blue-500"
                >
                    <option value="">Package Type</option>
                    <option value="Box">Box</option>
                    <option value="Envelope">Envelope</option>
                    <option value="Other">Other</option>
                </select>

                <textarea
                    placeholder="Delivery Notes"
                    {...register("delivery_notes")}
                    className="textarea textarea-bordered w-full md:col-span-2 bg-white text-black border border-gray-300 focus:border-blue-500"
                />

                <select
                    {...register("payment_method", { required: true })}
                    className="select select-bordered w-full bg-white text-black border border-gray-300 focus:border-blue-500"
                >
                    <option value="">Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Online">Online</option>
                </select>

                <button
                    type="submit"
                    className="btn btn-primary md:col-span-2 text-lg font-semibold hover:shadow-md"
                >
                    Preview Parcel
                </button>
            </form>

            {/* Preview Modal */}
            {previewData && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white text-black rounded-xl shadow-2xl max-w-3xl w-full mx-4 overflow-hidden">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-2xl font-semibold text-center">Preview Parcel Details</h3>
                        </div>

                        <div className="px-6 py-4 max-h-[60vh] overflow-y-auto">
                            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-gray-200">
                                            Field
                                        </th>
                                        <th className="px-4 py-2 text-left font-semibold text-gray-700 border-b border-gray-200">
                                            Value
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(previewData).map(([key, value]) => (
                                        <tr
                                            key={key}
                                            className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                                        >
                                            <td className="px-4 py-2 capitalize font-medium border-b border-gray-200">
                                                {key.replace(/_/g, " ")}
                                            </td>
                                            <td className="px-4 py-2 border-b border-gray-200">
                                                {value || "N/A"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-3">
                            <button
                                className="px-5 py-2 rounded-lg bg-green-600 text-white font-medium hover:bg-green-700 shadow-sm transition"
                                onClick={handleConfirm}
                            >
                                Confirm & Create
                            </button>
                            <button
                                className="px-5 py-2 rounded-lg bg-gray-200 text-gray-800 font-medium hover:bg-gray-300 shadow-sm transition"
                                onClick={() => setPreviewData(null)}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const AddNewClient = () => {
    const token = localStorage.getItem("Authorization");
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
                `${import.meta.env.API_BASE}/api/auth/new/client`,
                data,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            if (res.status === 200 || res.status === 201) {
                console.log("✅ Admin created successfully:", res.data);
                toast.success(res.data?.message || "Client created successfully");
                reset();
            } else {
                toast.error(res.data?.message || "Failed to create client");
            }
        } catch (error) {
            console.error("Error creating admin:", error);
            toast.error(
                `❌ Error: ${error?.response?.data?.message || error.message}`
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full py-2 px-2 sm:py-5 md:py-10 md:px-4">
            <div className="w-full max-w-2xl mx-auto bg-white sm:shadow-lg rounded-xl p-2 sm:p-5 md:p-10">
                <h2 className="text-4xl font-extrabold text-[#383185] text-center mb-10 tracking-tight">
                    <span className="inline-block border-b-4 border-[#383185] pb-1">
                        Add New Client
                    </span>
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name */}
                    <div>
                        <label className="block text-sm text-black font-semibold mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter name"
                            {...register("name", { required: "Name is required" })}
                            className="input bg-white text-black input-bordered w-full"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm bg-white text-black font-semibold mb-1">
                            Email
                        </label>
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
                            className="input bg-white text-black input-bordered w-full"
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm text-black font-semibold mb-1">
                            Password
                        </label>
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
                            className="input bg-white text-black input-bordered w-full"
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className={`btn w-full text-white font-semibold text-lg ${loading ? "loading" : ""
                            }`}
                        style={{
                            backgroundColor: "#383185",
                        }}
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Client"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export const Clients = () => {
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);

    const token = localStorage.getItem("Authorization");

    const fetchClient = async () => {
        try {
            setLoading(true);

            if (!token) {
                toast.error("No token found. Please log in again.");
                return;
            }

            const authHeader = token.startsWith("Bearer ")
                ? token
                : `Bearer ${token}`;
            console.log(authHeader);

            const res = await axios.get("http://localhost:5000/api/auth/all/client", {
                headers: { Authorization: authHeader }
            });

            if (Array.isArray(res.data.clients)) {
                setClients(res.data.clients);
                if (res.data.clients.length === 0) {
                    toast.info(res.data.message || "No clients found.");
                } else {
                    toast.success(res.data.message || "Clients fetched successfully");
                }
            } else {
                toast.error(res.data.message || "Unexpected response format");
            }
        } catch (err) {
            console.error("Error fetching clients:", err.response?.data || err.message);
            toast.error(
                err.response?.data?.message || "Server error while fetching clients."
            );
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchClient();
    }, []);

    return (
        <>
            {loading && <Loading />}
            <div className="sm:p-6 p-2">
                <div className="mb-4 flex justify-between items-center">
                    <h2 className="text-2xl font-semibold">👥 All Clients</h2>
                </div>

                <p className="text-md my-2">Total Users: {clients.length}</p>

                <div className="overflow-x-auto h-[80vh] rounded-xl">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
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
};

export default AdminPage