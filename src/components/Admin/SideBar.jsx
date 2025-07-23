// Sidebar.js
import React, { useState } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  IconButton,
} from '@mui/material';
import { FaTachometerAlt, FaShippingFast, FaUsers, FaChartBar,FaPlus,FaBars } from 'react-icons/fa';
import { AiOutlineAim } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';

const iconMap = {
  Dashboard: <FaTachometerAlt size={18} />,
  Shipments: <FaShippingFast size={18} />,
  Clients: <FaUsers size={18} />,
  Admins: <FaUsers size={18} />,
  Analytics: <FaChartBar size={18} />,
  ShowAdmins: <FaUsers size={18} />,
  AddNewAdmins: <FaPlus size={18} />,
  Analytics: <FaChartBar size={18} />,
  Track: <AiOutlineAim size={18} />,
  MyShipments: <FaShippingFast size={18} />
};

const Sidebar = ({ role = 'admin', onItemClick, selected }) => {
  const [open, setOpen] = useState(true);

  const navItems = {
    admin: ['Dashboard', 'Shipments', 'Clients'],
    superadmin: ['Dashboard', 'ShowAdmins', 'AddNewAdmins', 'Analytics'],
    client: ['Dashboard', 'Track', 'MyShipments']
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('Authorization');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Box
      sx={{
        height: '100vh',
        width: open ? 240 : 72,
        bgcolor: 'white',
        borderRight: '1px solid #e0e0e0',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        flexDirection: 'column'
      }}
    >
      {/* Toggle */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: open ? 'flex-end' : 'center' }}>
        <IconButton onClick={() => setOpen(!open)} size="medium" sx={{ color: 'black' }}>
          <FaBars />
        </IconButton>
      </Box>

      {/* List is handled below, duplicate removed */}
      {/* Navigation List */}
      <List sx={{ px: 1, flex: 1 }}>
        {navItems[role]?.map((label) => {
          const isActive = selected === label;

          const button = (
            <ListItemButton
              onClick={() => onItemClick(label)}
              sx={{
                mb: 1,
                borderRadius: 2,
                px: open ? 2 : 1,
                py: 1.5,
                bgcolor: isActive ? '#000' : '#fff',
                justifyContent: open ? 'initial' : 'center',
                color: isActive ? '#fff' : '#000',
                '&:hover': {
                  bgcolor: isActive ? '#111' : '#f5f5f5'
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  color: isActive ? '#fff' : '#000',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {iconMap[label]}
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: 500,
                    sx: { ml: 1 }
                  }}
                />
              )}
            </ListItemButton>
          );

          return open ? (
            <Box key={label}>{button}</Box>
          ) : (
            <Tooltip key={label} title={label} placement="right" arrow>
              <Box>{button}</Box>
            </Tooltip>
          );
        })}

        {/* Logout Item */}
        {(() => {
          const logoutButton = (
            <ListItemButton
              onClick={handleLogout}
              sx={{
                mt: 2,
                borderRadius: 2,
                px: open ? 2 : 1,
                py: 1.5,
                justifyContent: open ? 'initial' : 'center',
                color: '#f44336',
                '&:hover': {
                  bgcolor: '#fdecea'
                }
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  color: '#f44336',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FiLogOut size={18} />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Logout"
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: 500,
                    sx: { ml: 1 }
                  }}
                />
              )}
            </ListItemButton>
          );

          return open ? (
            <Box>{logoutButton}</Box>
          ) : (
            <Tooltip title="Logout" placement="right" arrow>
              <Box>{logoutButton}</Box>
            </Tooltip>
          );
        })()}
      </List>
    </Box>
  );
};

export default Sidebar;
