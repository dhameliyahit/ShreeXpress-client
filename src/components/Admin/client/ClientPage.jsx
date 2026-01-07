/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, CardContent, Button, TextField, Chip, Divider } from "@mui/material";
import { FaBox, FaSearch, FaTruck, FaUser, FaRegCalendarAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { User, Package, Settings, PackagePlus } from 'lucide-react';
import { useForm } from "react-hook-form";

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const ClientPage = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    return (
        <div className="min-h-screen p-2 md:p-8">
            {/* Header */}
            <div className="rounded-xl shadow-md border border-gray-300 p-6 mb-8 flex flex-wrap items-center gap-2">
                <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
                    <User className="w-6 h-6" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Client Dashboard</h1>
                    <p className="text-gray-500 mt-1">Welcome to your Client panel.</p>
                    <div className="text-lg space-y-1 mt-2">
                        <p>
                            <strong>Role:</strong> {user.role}
                        </p>
                        <p>
                            <strong>Welcome,</strong> {user.name}
                        </p>
                    </div>
                </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Orders */}
                <div className="p-6 rounded-lg border border-gray-300 shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-indigo-700">
                        <FaBox /> View Orders
                    </h2>
                    <p className="mb-4">Track, update, and manage customer orders.</p>
                    <Button variant="contained" color="primary" className="rounded-lg">
                        Go to Orders
                    </Button>
                </div>

                {/* Track */}
                <div className="p-6 rounded-lg border border-gray-300 shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-green-600">
                        <FaTruck /> Track Orders
                    </h2>
                    <p className="mb-4">Check delivery progress in real-time.</p>
                    <Button variant="contained" color="success" className="rounded-lg">
                        Track Panel
                    </Button>
                </div>

                {/* Shipment */}
                <div className="p-6 rounded-lg border border-gray-300 shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-purple-600">
                        <Package /> My Shipment
                    </h2>
                    <p className="mb-4">View all your shipments.</p>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#7e22ce", color: "#fff" }}
                        className="rounded-lg"
                    >
                        My Shipment
                    </Button>
                </div>

                {/* Settings */}
                <div className="p-6 rounded-lg border border-gray-300 shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2 flex items-center gap-2 text-gray-700">
                        <Settings /> Client Settings
                    </h2>
                    <p className="mb-4">Update your profile and dashboard preferences.</p>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: "#374151", color: "#fff" }}
                        className="rounded-lg"
                    >
                        Settings
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const Track = () => {
    const [trackingId, setTrackingId] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleTrack = async () => {
        if (!trackingId.trim()) {
            toast.error("Please enter a Tracking ID");
            return;
        }

        try {
            setLoading(true);
            setResult(null);

            const token = localStorage.getItem("Authorization");
            const res = await axios.get(`http://localhost:5000/api/courier/track/${trackingId}`,
                { headers: { Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}` } }
            );
            setResult(res.data);

            if (!res.data.parcel) toast.error("Parcel not found");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.error || "Unable to fetch tracking info");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-2 py-4 sm:px-6 lg:px-10">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                        <FaBox className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                            Track Parcel
                        </h2>
                        <p className="text-sm sm:text-base text-gray-500 mt-1">
                            Enter your tracking ID to view shipment status
                        </p>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 sm:p-5 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                    <TextField
                        label="Tracking ID"
                        variant="outlined"
                        size="small"
                        value={trackingId}
                        onChange={(e) => setTrackingId(e.target.value)}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <div className="mr-2 text-gray-400 flex items-center">
                                    <FaSearch />
                                </div>
                            ),
                        }}
                    />

                    <Button
                        variant="contained"
                        size="medium"
                        className="sm:min-w-[160px] rounded-lg"
                        onClick={handleTrack}
                        disabled={loading}
                    >
                        {loading ? "Tracking..." : "Track"}
                    </Button>
                </div>
            </div>

            {/* Result */}
            {result && result.parcel && (
                <Card className="rounded-2xl border border-gray-200 shadow-sm">
                    <CardContent className="p-2 sm:p-6">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
                            <h3 className="text-lg sm:text-xl font-semibold flex items-center gap-2 text-indigo-700">
                                <FaBox /> Parcel Details
                            </h3>
                            <Chip
                                label={result.status.toUpperCase()}
                                color="success"
                                size="small"
                                className="w-fit font-semibold"
                            />
                        </div>

                        <Divider className="mb-5" />

                        {/* Parcel Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <InfoBox icon={<FaBox />} label="Tracking ID">
                                {result.parcel.tracking_number}
                            </InfoBox>

                            <InfoBox icon={<FaTruck />} label="Status">
                                {result.parcel.current_status}
                            </InfoBox>

                            <InfoBox icon={<MdLocationOn />} label="Current Location">
                                {result.parcel.current_status === "delivered"
                                    ? result.parcel.to_branch?.branch_name
                                    : result.parcel.from_branch?.branch_name}
                            </InfoBox>

                            <InfoBox icon={<FaRegCalendarAlt />} label="Created At">
                                {new Date(result.parcel.createdAt).toLocaleString()}
                            </InfoBox>

                            <div className="sm:col-span-2">
                                <InfoBox icon={<MdLocationOn />} label="From → To">
                                    {result.parcel.from_branch?.branch_name} →{" "}
                                    {result.parcel.to_branch?.branch_name}
                                </InfoBox>
                            </div>
                        </div>

                        {/* Sender / Receiver */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <PersonCard
                                title="Sender"
                                name={result.parcel.sender_name}
                                phone={result.parcel.sender_phone}
                                address={result.parcel.sender_address}
                                color="indigo"
                            />
                            <PersonCard
                                title="Receiver"
                                name={result.parcel.receiver_name}
                                phone={result.parcel.receiver_phone}
                                address={result.parcel.receiver_address}
                                color="green"
                            />
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};
const InfoBox = ({ icon, label, children }) => (
    <div className="flex items-start gap-3 p-4 bg-gray-100 rounded-xl text-sm sm:text-base">
        <div className="text-indigo-600 text-lg">{icon}</div>
        <div>
            <p className="font-medium text-gray-600">{label}</p>
            <p className="text-gray-800 break-words">{children}</p>
        </div>
    </div>
);
const PersonCard = ({ title, name, phone, address, color }) => (
    <div className={`p-4 rounded-xl bg-${color}-50 border border-${color}-100`}>
        <h4 className={`font-semibold text-${color}-600 flex items-center gap-2`}>
            <FaUser /> {title}
        </h4>
        <p className="mt-2 text-gray-800 text-sm sm:text-base">
            {name} ({phone})
        </p>
        <p className="text-gray-500 text-sm">{address}</p>
    </div>
);

export const CreateParcel = () => {
    const [branches, setBranches] = useState([]);
    const [branchSearch, setBranchSearch] = useState("");
    const [previewData, setPreviewData] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    const handleSelectBranch = (branch) => {
        setValue("to_branch", branch._id);
        setIsOpen(false);
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

    useEffect(() => {
        if (branches.length > 0) {
            setValue("from_branch", branches[0]._id);
        }
    }, [branches, setValue]);

    const handlePreview = (data) => {
        if (!data.to_branch) {
            toast.error("Please select a branch before previewing.");
            return;
        }
        setPreviewData(data);
    };

    const handleConfirm = async () => {
        try {
            const res = await axios.post(`${API_BASE}/api/courier/new/courier`, previewData, {
                headers: { Authorization: token }
            });
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
        <div className="max-w-5xl mx-auto p-2 sm:p-4 rounded-xl sm:shadow-xl bg-white text-black">
            <div className="sm:mb-6 pb-4 border-b border-gray-100">
                <div className="flex flex-wrap items-start gap-1">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                        <PackagePlus className="w-7 h-7" />
                    </div>

                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">
                            Create New Parcel
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Enter sender, receiver, and shipment details to generate a new parcel
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit(handlePreview)} className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

                <div className="md:col-span-2">
                    <input
                        type="email"
                        placeholder="Sender Email Address"
                        {...register("email", {
                            required: "Email is required to receive tracking number",
                            pattern: {
                                value: /^\S+@\S+\.\S+$/,
                                message: "Please enter a valid email address",
                            },
                        })}
                        className="input input-bordered w-full bg-white text-black border border-gray-300 focus:border-blue-500"
                    />

                    {errors.email ? (
                        <p className="text-red-600 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    ) : (
                        <p className="text-gray-500 text-sm mt-1 flex items-center gap-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 text-blue-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                                />
                            </svg>
                            Please enter a valid email address to receive your tracking number and parcel updates.
                        </p>
                    )}
                </div>

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

                <input type="hidden" {...register("from_branch", { required: true })} />

                {/* Branch Dropdown */}
                <div className="md:col-span-2">
                    <label className="block mb-2 font-semibold">Select Branch</label>

                    <div className="relative w-full">
                        {/* Toggle Button */}
                        <button type="button" onClick={() => setIsOpen((prev) => !prev)}
                            className="btn w-full justify-between bg-white text-black border border-gray-300 hover:border-blue-500"
                        >
                            {branches.find((b) => b._id === watch("to_branch"))?.branch_name || "Select Branch"}
                            <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" >
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
                                        <li key={branch._id}>
                                            <button type="button" onClick={() => handleSelectBranch(branch)}
                                                className={`w-full text-left px-4 py-2 hover:bg-blue-50 ${watch("to_branch") === branch._id ? "bg-blue-100 font-semibold" : ""}`}
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
                    <option value="UPI">UPI</option>
                    <option value="NetBanking">NetBanking</option>
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

export default ClientPage;