import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
    Card,
    CardContent,
    Button,
    TextField,
    Chip,
    Divider,
} from "@mui/material";
import {
    FaBox,
    FaSearch,
    FaTruck,
    FaUser,
    FaRegCalendarAlt,
} from "react-icons/fa";
import { MdLocationOn, MdPayment } from "react-icons/md";
import { AiOutlineFileText } from "react-icons/ai";

const ClientPage = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <div className="min-h-screen p-4 md:p-8">
            {/* Header */}
            <div className="rounded-xl shadow-md border border-gray-300 p-6 mb-8">
                <h1 className="text-3xl  font-bold mb-2">👨🏻‍💼 Client Dashboard</h1>
                <p className="mb-4">Welcome to your Client panel.</p>
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
                {/* Orders */}
                <div className="p-6 rounded-lg border border-gray-300 shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2">📦 View Orders</h2>
                    <p className="mb-4">Track, update, and manage customer orders.</p>
                    <Button variant="contained" color="primary" className="rounded-lg">
                        Go to Orders
                    </Button>
                </div>

                {/* Track */}
                <div className="p-6 rounded-lg border border-gray-300 shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2">🚚 Track Orders</h2>
                    <p className="mb-4">Check delivery progress in real-time.</p>
                    <Button variant="contained" color="success" className="rounded-lg">
                        Track Panel
                    </Button>
                </div>

                {/* Shipment */}
                <div className="p-6 rounded-lg border border-gray-300 shadow hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2">My Shipment</h2>
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
                    <h2 className="text-xl font-semibold mb-2">⚙️ Client Settings</h2>
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
        <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-indigo-700">
                Track Your Parcel
            </h1>

            {/* Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-center">
                <TextField label="Enter Tracking ID" variant="outlined" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} fullWidth name="trackingId" className="bg-white rounded-xl shadow-md"
                    InputProps={{
                        startAdornment: (
                            <div className="px-3 text-gray-400 flex items-center">
                                <FaSearch />
                            </div>
                        ),
                    }} />
                <Button variant="contained" color="primary" size="small" className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300" onClick={handleTrack} disabled={loading} >
                    {loading ? "Tracking..." : "Track Parcel"}
                </Button>
            </div>

            {/* Result */}
            {result && result.parcel && (
                <Card className="shadow-2xl border border-gray-200 rounded-2xl hover:shadow-3xl transition">
                    <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-700">
                                <FaBox className="text-indigo-600" /> Parcel Information
                            </h2>
                            <Chip label={result.parcel.current_status} color="success" variant="outlined" className="font-semibold" />
                        </div>

                        <Divider className="mb-6" />

                        {/* Status Section */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="flex items-center gap-2">
                                <FaBox className="text-blue-600" />
                                <p><strong>Tracking ID:</strong> {result.trackingId}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaTruck className="text-green-600" />
                                <p><strong>Status:</strong> {result.parcel.current_status}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <MdLocationOn className="text-red-500" />
                                <p><strong>Current Location:</strong> {result.currentLocation}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <FaRegCalendarAlt className="text-gray-600" />
                                <p><strong>Created At:</strong> {new Date(result.parcel.created_at).toLocaleString()}</p>
                            </div>
                            <div className="flex items-center gap-2 col-span-2">
                                <MdLocationOn className="text-purple-600" />
                                <p><strong>From → To:</strong> {result.parcel.from_branch_name} → {result.parcel.to_branch_name}</p>
                            </div>
                        </div>

                        <Divider className="mb-6" />

                        {/* Sender & Receiver */}
                        <div className="grid md:grid-cols-2 gap-6 mb-8">
                            <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
                                <h3 className="text-lg font-semibold flex items-center gap-2 text-indigo-600">
                                    <FaUser /> Sender
                                </h3>
                                <p className="mt-1">{result.parcel.sender_name} ({result.parcel.sender_phone})</p>
                                <p className="text-gray-600 text-sm">{result.parcel.sender_address}</p>
                            </div>
                            <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
                                <h3 className="text-lg font-semibold flex items-center gap-2 text-green-600">
                                    <FaUser /> Receiver
                                </h3>
                                <p className="mt-1">{result.parcel.receiver_name} ({result.parcel.receiver_phone})</p>
                                <p className="text-gray-600 text-sm">{result.parcel.receiver_address}</p>
                            </div>
                        </div>

                        <Divider className="mb-6" />

                        {/* Package Details */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-orange-500">
                                <FaBox /> Package Details
                            </h3>
                            <div className="ml-7 mt-2 space-y-1 text-sm">
                                <p><strong>Weight:</strong> {result.parcel.weight} kg</p>
                                <p><strong>Dimensions:</strong> {result.parcel.dimensions}</p>
                                <p><strong>Type:</strong> {result.parcel.package_type}</p>
                            </div>
                        </div>

                        <Divider className="mb-6" />

                        {/* Payment */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-teal-600">
                                <MdPayment /> Payment
                            </h3>
                            <div className="ml-7 mt-2 space-y-1 text-sm">
                                <p><strong>Method:</strong> {result.parcel.payment_method}</p>
                                <div className="flex items-center gap-2">
                                    <strong>Status:</strong>
                                    <Chip label={result.parcel.payment_status} color={result.parcel.payment_status === "success" ? "success" : "error"} size="small" className="font-semibold"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Notes */}
                        {result.parcel.delivery_notes && (
                            <div className="mb-6">
                                <h3 className="text-lg font-semibold flex items-center gap-2">
                                    <AiOutlineFileText /> Delivery Notes
                                </h3>
                                <p className="text-gray-700 ml-7 mt-1 text-sm">{result.parcel.delivery_notes}</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
};

export default ClientPage;