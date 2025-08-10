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

export const Shipments = () => {
    const [shipments, setShipments] = useState([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem("Authorization"); // JWT token

    const fetchShipments = async () => {
        try {
            console.log("Fetching shipments...");
            const res = await axios.get(
                `${VITE_BACKEND_URL}/api/courier/my/courier`,
                { headers: { Authorization: `${token}` } }
            );
            console.log("Fetched shipments:", res.data.parcels);
            setShipments(res.data.parcels || []);
        } catch (err) {
            console.error("Error fetching shipments:", err);
        } finally {
            setLoading(false);
        }
    };

    const updatePayment = async (id, payment_status, payment_method) => {
        console.log("Updating payment:", { id, payment_status, payment_method });

        // Optimistic state update
        setShipments((prev) =>
            prev.map((parcel) =>
                parcel.id === id
                    ? { ...parcel, payment_status, payment_method }
                    : parcel
            )
        );

        try {
            const res = await axios.patch(
                `${VITE_BACKEND_URL}/api/courier/payment/status`,
                { id, payment_status, payment_method },
                { headers: { Authorization: `${token}` } }
            );
            console.log("Update API response:", res.data);
            toast.success("Update Successfully")
            // Optionally refetch to ensure sync with server
            fetchShipments();
        } catch (err) {
            console.error("Error updating payment:", err);
            toast.error("Error while updateing..")
        }
    };

    useEffect(() => {
        fetchShipments();
    }, []);

    return (
        <div className="max-w-7xl text-white mx-auto p-6 bg-base-200 rounded-xl shadow-lg">
            <h1 className="text-3xl font-bold mb-6 text-center">📦 My Shipments</h1>

            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                </div>
            ) : shipments.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No shipments found.</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
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
                        <tbody>
                            {shipments.map((parcel) => (
                                <tr key={parcel.id}>
                                    <td className="font-semibold">{parcel.tracking_number}</td>
                                    <td>
                                        {parcel.sender_name}
                                        <br />
                                        <span className="text-sm text-gray-500">{parcel.sender_phone}</span>
                                    </td>
                                    <td>
                                        {parcel.receiver_name}
                                        <br />
                                        <span className="text-sm text-gray-500">{parcel.receiver_phone}</span>
                                    </td>
                                    <td>{parcel.from_branch_name}</td>
                                    <td>{parcel.to_branch_name}</td>
                                    <td>{parcel.weight} g</td>
                                    <td>
                                        <span
                                            className={`badge ${parcel.current_status === "created"
                                                ? "badge-info"
                                                : "badge-success"
                                                }`}
                                        >
                                            {parcel.current_status}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            className="select select-bordered select-sm"
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
                                            className="select select-bordered select-sm"
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
                                            className="btn btn-sm btn-primary"
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
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        watch,
        setValue
    } = useForm();

    const token = localStorage.getItem("Authorization");

    // Fetch ALL branches once
    const fetchBranches = async () => {
        try {
            const url = `${VITE_BACKEND_URL}/api/branches/info/branch`;
            const res = await axios.get(url, {
                headers: { Authorization: `${token}` },
            });
            setBranches(res.data.branches || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchBranches();
    }, []);

    // Handle preview and log form data
    const handlePreview = (data) => {
        console.log("Form Data to Send Backend:", data); // confirm branch ID is sent
        setPreviewData(data);
    };

    const handleConfirm = async () => {
        try {
            const res = await axios.post(`${VITE_BACKEND_URL}/api/courier/new/courier`, previewData, {
                headers: {
                    Authorization: token,
                }
            });
            toast.success("Parcel created successfully!");
            reset();
            setPreviewData(null);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.error || "Failed to create parcel");
        }
    };

    // Filter branches client-side
    const filteredBranches = branches.filter(branch =>
        branch.branch_name.toLowerCase().includes(branchSearch.toLowerCase())
    );

    return (
        <div className="max-w-5xl mx-auto p-6 rounded-xl shadow-xl bg-base-200 text-base-content">
            <h2 className="text-3xl font-bold mb-6 text-center">Create Parcel</h2>

            <form onSubmit={handleSubmit(handlePreview)} className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Sender Details */}
                <h3 className="md:col-span-2 font-semibold text-lg">Sender Details</h3>
                <input type="text" placeholder="Sender Name" {...register("sender_name", { required: true })} className="input input-bordered w-full" />
                {errors.sender_name && <span className="text-error text-sm">Required</span>}

                <input type="text" placeholder="Sender Phone" {...register("sender_phone", { required: true })} className="input input-bordered w-full" />
                {errors.sender_phone && <span className="text-error text-sm">Required</span>}

                <input type="text" placeholder="Sender Address" {...register("sender_address", { required: true })} className="input input-bordered w-full md:col-span-2" />

                {/* Receiver Details */}
                <h3 className="md:col-span-2 font-semibold text-lg mt-2">Receiver Details</h3>
                <input type="text" placeholder="Receiver Name" {...register("receiver_name", { required: true })} className="input input-bordered w-full" />
                {errors.receiver_name && <span className="text-error text-sm">Required</span>}

                <input type="text" placeholder="Receiver Phone" {...register("receiver_phone", { required: true })} className="input input-bordered w-full" />
                {errors.receiver_phone && <span className="text-error text-sm">Required</span>}

                <input type="text" placeholder="Receiver Address" {...register("receiver_address", { required: true })} className="input input-bordered w-full md:col-span-2" />

                {/* Branch Select with client-side search */}
                <div className="md:col-span-2">
                    <label className="block mb-2 font-semibold">Select Branch</label>
                    <div className="dropdown dropdown-bottom w-full">
                        <label tabIndex={0} className="btn w-full justify-between">
                            {branches.find((b) => b.id === watch("to_branch"))?.branch_name || "Select Branch"}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
                        </label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full max-h-64 overflow-y-auto">
                            {/* Search input */}
                            <li className="mb-2">
                                <input
                                    type="text"
                                    placeholder="Search Branch..."
                                    value={branchSearch}
                                    onChange={(e) => setBranchSearch(e.target.value)}
                                    className="input input-bordered w-full"
                                />
                            </li>

                            {/* Branch options */}
                            {filteredBranches.length > 0 ? (
                                filteredBranches.map((branch) => (
                                    <li key={branch.id}>
                                        <button
                                            type="button"
                                            onClick={() => setValue("to_branch", branch.id)} // sets ID
                                            className={`w-full text-left ${watch("to_branch") === branch.id ? "bg-primary text-white" : ""}`}
                                        >
                                            {branch.branch_name}
                                        </button>
                                    </li>
                                ))
                            ) : (
                                <li>
                                    <span className="text-gray-500">No branches found</span>
                                </li>
                            )}
                        </ul>
                    </div>
                    {errors.to_branch && <span className="text-error text-sm">Select a branch</span>}
                </div>

                {/* Other Fields */}
                <input type="number" step="0.01" placeholder="Weight (kg)" {...register("weight", { required: true })} className="input input-bordered w-full" />
                <input type="text" placeholder="Dimensions" {...register("dimensions")} className="input input-bordered w-full" />

                <select {...register("package_type", { required: true })} className="select select-bordered w-full">
                    <option value="">Package Type</option>
                    <option value="Box">Box</option>
                    <option value="Envelope">Envelope</option>
                    <option value="Other">Other</option>
                </select>

                <textarea placeholder="Delivery Notes" {...register("delivery_notes")} className="textarea textarea-bordered w-full md:col-span-2" />

                <select {...register("payment_method", { required: true })} className="select select-bordered w-full">
                    <option value="">Payment Method</option>
                    <option value="Cash">Cash</option>
                    <option value="Card">Card</option>
                    <option value="Online">Online</option>
                </select>

                <button type="submit" className="btn btn-primary md:col-span-2 text-lg font-semibold">Preview Parcel</button>
            </form>

            {/* Preview Modal */}
            {previewData && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-3xl">
                        <h3 className="font-bold text-lg mb-4 text-center">Preview Parcel Details</h3>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra w-full">
                                <thead>
                                    <tr>
                                        <th>Field</th>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(previewData).map(([key, value]) => (
                                        <tr key={key}>
                                            <td className="capitalize">{key.replace(/_/g, " ")}</td>
                                            <td>{value || "N/A"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="modal-action flex justify-between">
                            <button className="btn btn-success" onClick={handleConfirm}>Confirm & Create</button>
                            <button className="btn" onClick={() => setPreviewData(null)}>Back</button>
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
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/new/client`,
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
              className="input input-bordered w-full bg-gray-100 text-gray-800"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-black font-semibold mb-1">
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
              className="input input-bordered w-full bg-gray-100 text-gray-800"
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
              className="input input-bordered w-full bg-gray-100 text-gray-800"
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
            className={`btn w-full text-white font-semibold text-lg ${
              loading ? "loading" : ""
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
    const token = localStorage.getItem('Authorization');

    const fetchClient = async () => {
        try {
            setLoading(true);

            const res = await axios.get(`${VITE_BACKEND_URL}/api/auth/all/client`, {
                headers: {
                    Authorization: token,
                },
            });

            if (res.data) {
                if (res.data.clients.length === 0) {
                    toast.info("No clients found.");
                } else {
                    setClients(res.data.clients);
                    toast.success("My Client's Fetch Successfully")
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
                <div className="overflow-x-auto h-[80vh] rounded-xl">
                    <table className="min-w-full divide-y table table-row-pin table-col-poin divide-gray-200">
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