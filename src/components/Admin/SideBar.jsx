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
import {
  FaBars,
  FaTachometerAlt,
  FaShippingFast,
  FaUsers,
  FaChartBar,
} from 'react-icons/fa';

const iconMap = {
  Dashboard: <FaTachometerAlt size={18} />,
  Shipments: <FaShippingFast size={18} />,
  Clients: <FaUsers size={18} />,
  Admins: <FaUsers size={18} />,
  Analytics: <FaChartBar size={18} />,
};

const Sidebar = ({ role = 'admin', onItemClick, selected }) => {
  const [open, setOpen] = useState(true);

  const navItems = {
    admin: ['Dashboard', 'Shipments', 'Clients'],
    superadmin: ['Dashboard', 'Admins', 'Analytics'],
    client: ['Dashboard'],
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
      }}
    >
      {/* Toggle */}
      <Box sx={{ p: 2, display: 'flex', justifyContent: open ? 'flex-end' : 'center' }}>
        <IconButton onClick={() => setOpen(!open)} size="small" sx={{ color: 'black' }}>
          <FaBars />
        </IconButton>
      </Box>

      {/* List */}
      <List sx={{ px: 1 }}>
        {navItems[role]?.map((label) => {
          const isActive = selected === label;

          return (
            <Tooltip key={label} title={!open ? label : ''} placement="right" arrow>
              <ListItemButton
                onClick={() => onItemClick(label)}
                sx={{
                  mb: 1,
                  borderRadius: 2,
                  px: open ? 2 : 1,
                  py: 1.5,
                  bgcolor: isActive ? '#000' : '#fff',
                  color: isActive ? '#fff' : '#000',
                  '&:hover': {
                    bgcolor: isActive ? '#111' : '#f5f5f5',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    color: isActive ? '#fff' : '#000',
                    justifyContent: 'center',
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
                      sx: { ml: 1 },
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
