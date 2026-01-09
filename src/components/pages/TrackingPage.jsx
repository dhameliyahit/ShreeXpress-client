/* eslint-disable react-hooks/exhaustive-deps */
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../Layout/Layout';
import Loading from '../Loading';
import { Package, Truck, MapPin, Clock, AlertCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const TrackingPage = () => {
    const { trackingNumber } = useParams();
    const [shipment, setShipment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchTrackingData();
    }, [trackingNumber]);

    const fetchTrackingData = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await axios.get(
                `${API_BASE}/api/courier/track/${trackingNumber}`
            );
            setShipment(response?.data);
            toast.success('Shipment found!');
        } catch (err) {
            setError(err.response?.data?.message || 'Shipment not found. Please check the tracking number.');
            toast.error('Error fetching tracking information');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <Loading />
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="min-h-screen p-4 md:p-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#383185] to-indigo-500 bg-clip-text text-transparent">
                            Shipment Tracking
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Tracking ID
                            <span className="ml-2 inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-[#383185]">
                                {trackingNumber}
                            </span>
                        </p>
                    </div>

                    {error ? (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
                            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-red-800 mb-1">Not Found</h3>
                                <p className="text-red-700">{error}</p>
                            </div>
                        </div>
                    ) : shipment ? (
                        <div className="space-y-6">
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 border-l-4 border-l-[#383185] hover:shadow-md transition">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Status */}
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="p-3 rounded-full bg-indigo-100">
                                            <Package className="w-6 h-6 text-[#383185]" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs uppercase tracking-wide text-gray-500">Status</p>
                                            <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700 capitalize">
                                                {shipment.parcel.current_status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Weight */}
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="p-3 rounded-full bg-emerald-100">
                                            <Truck className="w-6 h-6 text-emerald-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs uppercase tracking-wide text-gray-500">Weight</p>
                                            <p className="text-lg font-semibold text-gray-800">
                                                {shipment.parcel.weight} kg
                                            </p>
                                        </div>
                                    </div>

                                    {/* Package */}
                                    <div className="flex items-center justify-center gap-3">
                                        <div className="p-3 rounded-full bg-purple-100">
                                            <Clock className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div className="text-left">
                                            <p className="text-xs uppercase tracking-wide text-gray-500">Package</p>
                                            <p className="text-lg font-semibold text-gray-800 capitalize">
                                                {shipment.parcel.package_type}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* From */}
                                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                                    <h3 className="flex items-center gap-2 text-sm font-semibold text-[#383185] mb-4">
                                        <MapPin className="w-4 h-4" /> Sender
                                    </h3>

                                    <div className="space-y-1 text-sm text-gray-700">
                                        <p className="font-semibold">{shipment.parcel.sender_name}</p>
                                        <p>{shipment.parcel.sender_address}</p>
                                        <p className="text-gray-500">{shipment.parcel.sender_phone}</p>
                                        <span className="inline-block mt-2 rounded-md bg-gray-100 px-2 py-1 text-xs">
                                            {shipment.parcel.from_branch?.branch_name}
                                        </span>
                                    </div>
                                </div>

                                {/* To */}
                                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                                    <h3 className="flex items-center gap-2 text-sm font-semibold text-red-600 mb-4">
                                        <MapPin className="w-4 h-4" /> Receiver
                                    </h3>

                                    <div className="space-y-1 text-sm text-gray-700">
                                        <p className="font-semibold">{shipment.parcel.receiver_name}</p>
                                        <p>{shipment.parcel.receiver_address}</p>
                                        <p className="text-gray-500">{shipment.parcel.receiver_phone}</p>
                                        <span className="inline-block mt-2 rounded-md bg-gray-100 px-2 py-1 text-xs">
                                            {shipment.parcel.to_branch?.branch_name}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {shipment.history.length > 0 && (
                                <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                                    <h3 className="text-lg font-semibold mb-6">Tracking History</h3>

                                    <div className="relative border-l-2 border-indigo-200 pl-6 space-y-6">
                                        {shipment.history.map((event, index) => (
                                            <div key={index} className="relative">
                                                <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#383185]" />
                                                <p className="font-semibold capitalize">{event.status}</p>
                                                <p className="text-sm text-gray-600">{event.note}</p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date(event.createdAt).toLocaleString()}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-semibold mb-4">Additional Information</h3>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">Created</p>
                                        <p className="font-semibold">
                                            {new Date(shipment.parcel.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500">Payment</p>
                                        <p className="font-semibold capitalize">
                                            {shipment.parcel.payment_method}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500">Status</p>
                                        <p className="font-semibold capitalize">
                                            {shipment.parcel.payment_status}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-gray-500">Dimensions</p>
                                        <p className="font-semibold">
                                            {shipment.parcel.dimensions}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 flex items-start gap-4">
                            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                            <div>
                                <h3 className="text-lg font-semibold text-yellow-800 mb-1">No Data</h3>
                                <p className="text-yellow-700">No tracking information available for this shipment.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default TrackingPage;
