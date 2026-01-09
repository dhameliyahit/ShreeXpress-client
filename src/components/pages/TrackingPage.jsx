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
        const fetchTrackingData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(
                    `${API_BASE}/api/shipment/track/${trackingNumber}`
                );
                setShipment(response.data?.data || response.data);
                toast.success('Shipment found!');
            } catch (err) {
                setError(err.response?.data?.message || 'Shipment not found. Please check the tracking number.');
                toast.error('Error fetching tracking information');
            } finally {
                setLoading(false);
            }
        };
        fetchTrackingData();
    }, [trackingNumber]);

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
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                            Track Your Shipment
                        </h1>
                        <p className="text-gray-600">
                            Tracking Number: <span className="font-semibold text-[#383185]">{trackingNumber}</span>
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
                            {/* Status Overview */}
                            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-[#383185]">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {/* Order Status */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-blue-100 rounded-lg">
                                            <Package className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Status</p>
                                            <p className="text-lg font-semibold text-gray-800 capitalize">
                                                {shipment.status || 'Processing'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Weight */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-green-100 rounded-lg">
                                            <Truck className="w-6 h-6 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Weight</p>
                                            <p className="text-lg font-semibold text-gray-800">
                                                {shipment.weight || 'N/A'} kg
                                            </p>
                                        </div>
                                    </div>

                                    {/* Delivery Type */}
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-purple-100 rounded-lg">
                                            <Clock className="w-6 h-6 text-purple-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">Type</p>
                                            <p className="text-lg font-semibold text-gray-800 capitalize">
                                                {shipment.deliveryType || 'Standard'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* From & To */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* From */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-[#383185]" />
                                        From
                                    </h3>
                                    <div className="space-y-2 text-gray-700">
                                        <p><span className="font-semibold">Name:</span> {shipment.senderName || 'N/A'}</p>
                                        <p><span className="font-semibold">Address:</span> {shipment.senderAddress || 'N/A'}</p>
                                        <p><span className="font-semibold">City:</span> {shipment.senderCity || 'N/A'}</p>
                                        <p><span className="font-semibold">Pincode:</span> {shipment.senderPincode || 'N/A'}</p>
                                        <p><span className="font-semibold">Phone:</span> {shipment.senderPhone || 'N/A'}</p>
                                    </div>
                                </div>

                                {/* To */}
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-[#C52024]" />
                                        To
                                    </h3>
                                    <div className="space-y-2 text-gray-700">
                                        <p><span className="font-semibold">Name:</span> {shipment.receiverName || 'N/A'}</p>
                                        <p><span className="font-semibold">Address:</span> {shipment.receiverAddress || 'N/A'}</p>
                                        <p><span className="font-semibold">City:</span> {shipment.receiverCity || 'N/A'}</p>
                                        <p><span className="font-semibold">Pincode:</span> {shipment.receiverPincode || 'N/A'}</p>
                                        <p><span className="font-semibold">Phone:</span> {shipment.receiverPhone || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Timeline */}
                            {shipment.timeline && shipment.timeline.length > 0 && (
                                <div className="bg-white rounded-lg shadow-md p-6">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-[#383185]" />
                                        Tracking History
                                    </h3>
                                    <div className="space-y-4">
                                        {shipment.timeline.map((event, index) => (
                                            <div key={index} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="w-4 h-4 bg-[#383185] rounded-full border-2 border-white"></div>
                                                    {index < shipment.timeline.length - 1 && (
                                                        <div className="w-0.5 h-12 bg-gray-300 my-2"></div>
                                                    )}
                                                </div>
                                                <div className="pb-4">
                                                    <p className="font-semibold text-gray-800">{event.status || event.title}</p>
                                                    <p className="text-sm text-gray-600">{event.location || event.message}</p>
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {new Date(event.timestamp || event.date).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Additional Info */}
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Details</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Created Date</p>
                                        <p className="font-semibold text-gray-800">
                                            {shipment.createdAt ? new Date(shipment.createdAt).toLocaleDateString() : 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Expected Delivery</p>
                                        <p className="font-semibold text-gray-800">
                                            {shipment.expectedDelivery ? new Date(shipment.expectedDelivery).toLocaleDateString() : 'N/A'}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Amount</p>
                                        <p className="font-semibold text-gray-800">₹{shipment.amount || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Courier</p>
                                        <p className="font-semibold text-gray-800">{shipment.courierName || 'N/A'}</p>
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
