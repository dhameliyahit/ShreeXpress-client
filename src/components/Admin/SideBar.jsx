import React, { useState } from 'react';
import {
  FaTachometerAlt,
  FaShippingFast,
  FaUsers,
  FaChartBar,
  FaPlus,
  FaBars,
} from 'react-icons/fa';
import { AiOutlineAim } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { FcSms } from "react-icons/fc";
import { MdOutlineAppBlocking } from "react-icons/md";
import { BiLogoPostgresql } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const iconMap = {
  Dashboard: <FaTachometerAlt size={18} />,
  Shipments: <FaShippingFast size={18} />,
  Clients: <FaUsers size={18} />,
  Admins: <FaUsers size={18} />,
  Analytics: <FaChartBar size={18} />,
  Users: <FaUsers size={18} />,
  AddNewAdmins: <FaPlus size={18} />,
  Track: <AiOutlineAim size={18} />,
  MyShipments: <FaShippingFast size={18} />,
  Editor: <BiLogoPostgresql size={18} />,
  Branches: <FaShippingFast size={18} />,
  OTP_Logs: <FcSms size={18} />,
  Block_email: <MdOutlineAppBlocking size={18} />
};

const Sidebar = ({ role = 'client', onItemClick, selected }) => {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  const navItems = {
    admin: ['Dashboard', 'Shipments', 'Clients'],
    superadmin: ['Dashboard', 'Users', 'AddNewAdmins', 'Analytics', 'Branches', 'OTP_Logs', 'Block_email', 'Editor'],
    client: ['Dashboard', 'Track', 'MyShipments']
  };

  const handleLogout = () => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className={`h-screen bg-white border-r border-gray-200 transition-all duration-300 ${open ? 'w-60' : 'w-20'} flex flex-col`}>
      {/* Toggle */}
      <div  className={`p-4 flex ${open ? 'justify-end' : 'justify-center'}  items-center border-b border-gray-200 cursor-pointer`}>
        <div onClick={() => setOpen(!open)} className='bg-white p-2 flex rounded-full btn'>
        <button onClick={() => setOpen(!open)} className="text-black cursor-pointer text-xl">
          <FaBars />
        </button>
        </div>
      </div>

      {/* Navigation */}
      <ul className={`${open ? "flex-1 " : "flex flex-col"} items-center border-black px-2 space-y-2`}>
        {navItems[role]?.map((label) => {
          const isActive = selected === label;
          const baseStyle = `flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-gray-100 cursor-pointer`;
          const activeStyle = isActive ? 'bg-black text-white hover:bg-gray-900' : 'text-black';

          const content = (
            <li
              key={label}
              onClick={() => onItemClick(label)}
              className={`${baseStyle} ${activeStyle}`}
              data-tip={open ? '' : label}
            >
              <span className="text-lg">{iconMap[label]}</span>
              {open && <span className="text-sm font-medium">{label}</span>}
            </li>
          );

          return open ? (
            content
          ) : (
            <div className="tooltip tooltip-right" key={label} data-tip={label}>
              {content}
            </div>
          );
        })}

        {/* Logout */}
        <div className={`${open ? '' : 'tooltip tooltip-right'}`} data-tip="Logout">
          <li
            onClick={handleLogout}
            className={`flex items-center gap-3 mt-4 px-3 py-2 rounded-lg text-red-500 hover:bg-red-100 cursor-pointer ${open ? '' : 'justify-center'}`}
          >
            <FiLogOut size={18} />
            {open && <span className="text-sm font-medium">Logout</span>}
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
