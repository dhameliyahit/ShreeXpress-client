import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Layout from '../Layout/Layout';
import Loading from '../Loading';
import { MapPin, Phone, Mail, Clock, Search } from 'lucide-react';

const API_BASE = import.meta.env.VITE_BACKEND_URL;

const BranchesPage = () => {
    const [branches, setBranches] = useState([]);
    const [filteredBranches, setFilteredBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchBranches();
    }, []);

    const fetchBranches = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_BASE}/api/branches`);
            const branchesData = response.data?.data || response.data || [];
            setBranches(branchesData);
            setFilteredBranches(branchesData);
            toast.success('Branches loaded successfully');
        } catch (error) {
            console.error('Error fetching branches:', error);
            toast.error('Failed to load branches');
            // Fallback to empty array
            setBranches([]);
            setFilteredBranches([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        if (query.trim()) {
            const filtered = branches.filter((branch) =>
                branch.name?.toLowerCase().includes(query) ||
                branch.city?.toLowerCase().includes(query) ||
                branch.pincode?.toLowerCase().includes(query) ||
                branch.state?.toLowerCase().includes(query)
            );
            setFilteredBranches(filtered);
        } else {
            setFilteredBranches(branches);
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
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                            Find Our Branches
                        </h1>
                        <p className="text-gray-600">
                            Locate the nearest ShreeXpress branch in your area
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="mb-8 relative">
                        <div className="flex items-center gap-2 bg-white rounded-lg shadow-md p-4 border border-[#383185]">
                            <Search className="w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search by branch name, city, pincode, or state..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="w-full focus:outline-none text-gray-800 placeholder-gray-500"
                            />
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-6">
                        <p className="text-gray-600 font-semibold">
                            Found <span className="text-[#383185] text-lg">{filteredBranches.length}</span> branch{filteredBranches.length !== 1 ? 'es' : ''}
                        </p>
                    </div>

                    {/* Branches Grid */}
                    {filteredBranches.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredBranches.map((branch, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all p-6 border-l-4 border-[#383185]"
                                >
                                    {/* Branch Name */}
                                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                                        {branch.name || 'Branch Name'}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-4">
                                        {branch.city || 'City'}, {branch.state || 'State'}
                                    </p>

                                    {/* Branch Details */}
                                    <div className="space-y-3">
                                        {/* Address */}
                                        {branch.address && (
                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-[#C52024] flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Address</p>
                                                    <p className="text-sm text-gray-700">{branch.address}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Pincode */}
                                        {branch.pincode && (
                                            <div className="flex items-start gap-3">
                                                <MapPin className="w-5 h-5 text-[#383185] flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Pincode</p>
                                                    <p className="text-sm font-semibold text-gray-800">{branch.pincode}</p>
                                                </div>
                                            </div>
                                        )}

                                        {/* Phone */}
                                        {branch.phone && (
                                            <div className="flex items-start gap-3">
                                                <Phone className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Phone</p>
                                                    <a
                                                        href={`tel:${branch.phone}`}
                                                        className="text-sm text-green-600 hover:underline"
                                                    >
                                                        {branch.phone}
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {/* Email */}
                                        {branch.email && (
                                            <div className="flex items-start gap-3">
                                                <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Email</p>
                                                    <a
                                                        href={`mailto:${branch.email}`}
                                                        className="text-sm text-blue-600 hover:underline break-all"
                                                    >
                                                        {branch.email}
                                                    </a>
                                                </div>
                                            </div>
                                        )}

                                        {/* Operating Hours */}
                                        {branch.operatingHours && (
                                            <div className="flex items-start gap-3">
                                                <Clock className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-gray-500">Operating Hours</p>
                                                    <p className="text-sm text-gray-700">{branch.operatingHours}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
                            <Search className="w-12 h-12 text-yellow-600 mx-auto mb-4 opacity-50" />
                            <h3 className="text-lg font-semibold text-yellow-800 mb-2">No Branches Found</h3>
                            <p className="text-yellow-700">
                                Try searching with different keywords or check back later.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default BranchesPage;
