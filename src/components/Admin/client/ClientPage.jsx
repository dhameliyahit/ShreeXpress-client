import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Card, CardContent, Button, TextField, Chip, Divider } from "@mui/material";
import { FaBox, FaSearch, FaTruck, FaUser, FaRegCalendarAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { User, Package, Settings } from 'lucide-react';

const ClientPage = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};

    return (
        <div className="min-h-screen p-4 md:p-8">
            {/* Header */}
            <div className="rounded-xl shadow-md border border-gray-300 p-6 mb-8 flex items-center gap-3">
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
            const res = await axios.get(
                `http://localhost:5000/api/courier/track/${trackingId}`,
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
        <div className="min-h-screen p-6">
            {/* Header */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                        <FaBox className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                            Track Parcel
                        </h2>
                        <p className="text-gray-500 mt-1">
                            Enter your tracking ID to view shipment status.
                        </p>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <TextField
                    label="Enter Tracking ID"
                    variant="outlined"
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    fullWidth
                    name="trackingId"
                    className="bg-white rounded-2xl shadow-lg"
                    InputProps={{
                        startAdornment: (
                            <div className="px-3 text-gray-400 flex items-center">
                                <FaSearch />
                            </div>
                        ),
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="medium"
                    className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300"
                    onClick={handleTrack}
                    disabled={loading}
                >
                    {loading ? "Tracking..." : "Track Parcel"}
                </Button>
            </div>

            {/* Result */}
            {result && result.parcel && (
                <Card className="rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition p-1">
                    <CardContent className="p-8">
                        {/* Parcel Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-3 text-indigo-700">
                                <FaBox className="text-indigo-600" /> Parcel Information
                            </h2>
                            <Chip
                                label={result.status.toUpperCase()}
                                color="success"
                                variant="filled"
                                className="font-semibold px-4 py-1 rounded-full"
                            />
                        </div>

                        <Divider className="mb-6" />

                        {/* Parcel Details */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-center gap-3 p-4 bg-indigo-50 rounded-xl">
                                <FaBox className="text-indigo-600 text-xl" />
                                <p>
                                    <strong>Tracking ID:</strong>{" "}
                                    {result.parcel.tracking_number}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                                <FaTruck className="text-green-600 text-xl" />
                                <p>
                                    <strong>Status:</strong>{" "}
                                    {result.parcel.current_status}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-red-50 rounded-xl">
                                <MdLocationOn className="text-red-500 text-xl" />
                                <p>
                                    <strong>Current Location:</strong>{" "}
                                    {result.parcel.current_status === "delivered"
                                        ? result.parcel.to_branch?.branch_name
                                        : result.parcel.from_branch?.branch_name}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                <FaRegCalendarAlt className="text-gray-600 text-xl" />
                                <p>
                                    <strong>Created At:</strong>{" "}
                                    {new Date(result.parcel.createdAt).toLocaleString()}
                                </p>
                            </div>

                            <div className="flex items-center gap-3 col-span-2 p-4 bg-purple-50 rounded-xl">
                                <MdLocationOn className="text-purple-600 text-xl" />
                                <p>
                                    <strong>From → To:</strong>{" "}
                                    {result.parcel.from_branch?.branch_name} →{" "}
                                    {result.parcel.to_branch?.branch_name}
                                </p>
                            </div>
                        </div>

                        {/* Sender & Receiver */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-indigo-50 p-6 rounded-2xl shadow-inner hover:shadow-md transition cursor-pointer">
                                <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-600">
                                    <FaUser /> Sender
                                </h3>
                                <p className="mt-2 text-gray-700">{result.parcel.sender_name} ({result.parcel.sender_phone})</p>
                                <p className="text-gray-500 text-sm">{result.parcel.sender_address}</p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-2xl shadow-inner hover:shadow-md transition cursor-pointer">
                                <h3 className="text-lg font-semibold flex items-center gap-2 text-green-600">
                                    <FaUser /> Receiver
                                </h3>
                                <p className="mt-2 text-gray-700">{result.parcel.receiver_name} ({result.parcel.receiver_phone})</p>
                                <p className="text-gray-500 text-sm">{result.parcel.receiver_address}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};


export default ClientPage;