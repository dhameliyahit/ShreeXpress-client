import { useState, useEffect } from 'react';
import {
    FaTachometerAlt,
    FaShippingFast,
    FaUsers,
    FaChartBar,
    FaPlus,
    FaBars,
    FaStoreAlt,
    FaEnvelope
} from 'react-icons/fa';
import { AiOutlineAim } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { FcSms } from "react-icons/fc";
import { MdOutlineAppBlocking } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { IoMdPersonAdd } from "react-icons/io";
import { FaBoxOpen } from "react-icons/fa";
import { FaCodeBranch } from "react-icons/fa";

const iconMap = {
    Dashboard: <FaTachometerAlt size={18} />,
    Shipments: <FaShippingFast size={18} />,
    Clients: <FaUsers size={18} />,
    Admins: <FaUsers size={18} />,
    Analytics: <FaChartBar size={18} />,
    User: <FaUsers size={18} />,
    AddNewAdmins: <FaPlus size={18} />,
    Track: <AiOutlineAim size={18} />,
    Branches: <FaShippingFast size={18} />,
    Franchise: <FaStoreAlt size={18} />,
    Contact: <FaEnvelope size={16} />,
    OTP_Logs: <FcSms size={18} />,
    Block_email: <MdOutlineAppBlocking size={18} />,
    AddBranch: <FaCodeBranch size={16} />,
    CreateParcel: <FaBoxOpen size={18} />,
    AddNewClient: <IoMdPersonAdd size={18} />,
};

const Sidebar = ({ role = 'client', onItemClick, selected }) => {
    const [open, setOpen] = useState(window.innerWidth >= 768);
    const navigate = useNavigate();

    const navItems = {
        admin: ['Dashboard', 'Shipments', 'CreateParcel', 'AddNewClient', 'Clients', 'AddBranch'],
        superadmin: ['Dashboard', 'User', 'AddNewAdmins', 'Analytics', 'Branches', 'Franchise', 'Contact', 'OTP_Logs', 'Block_email'],
        client: ['Dashboard', 'Track']
    };

    const handleLogout = () => {
        localStorage.removeItem('Authorization');
        localStorage.removeItem('user');
        navigate('/login');
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className={`h-screen bg-white transition-all duration-300 ${open ? 'w-60' : 'w-20'} flex flex-col`}>
            {/* Toggle */}
            <div className={`p-4 flex ${open ? 'justify-end' : "justify-center"}`}>
                <div onClick={() => setOpen(!open)} className='border cursor-pointer flex justify-center items-center border-gray-600 btn btn-accent  bg-white p-2 rounded-full my-0'>
                    <button onClick={() => setOpen(!open)} className="text-black cursor-pointer text-xl font-bold">
                        <FaBars />
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <ul className={`flex flex-col ${open ? 'items-start' : 'items-center'} px-2 space-y-2`}>
                {navItems[role]?.map((label) => {
                    const isActive = selected === label;
                    const baseStyle = `flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-gray-100 cursor-pointer`;
                    const activeStyle = isActive ? 'bg-black text-white hover:bg-gray-900' : 'text-black';

                    const content = (
                        <li key={label} onClick={() => {
                                onItemClick(label);
                                if (window.innerWidth < 768) setOpen(false);
                            }}
                            className={`${baseStyle} ${activeStyle} w-full`}
                        >
                            <span className="text-lg">{iconMap[label]}</span>
                            {open && <span className="text-sm font-medium">{label}</span>}
                        </li>
                    );

                    return open ? (content) : (
                        <div className="tooltip tooltip-right" key={label} data-tip={label}>
                            {content}
                        </div>
                    );
                })}

                {/* Logout */}
                <div className={`${open ? '' : 'tooltip tooltip-right'}`} data-tip="Logout">
                    <li onClick={handleLogout} className={`flex items-center gap-3 mt-4 px-3 py-2 rounded-lg text-red-500 hover:bg-red-100 cursor-pointer ${open ? '' : 'justify-center'}`}>
                        <FiLogOut size={18} />
                        {open && <span className="text-sm font-medium">Logout</span>}
                    </li>
                </div>
            </ul>
        </div>
    );
};

export default Sidebar;
