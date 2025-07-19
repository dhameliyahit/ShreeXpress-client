import React, { useState } from 'react';
import Sidebar from './SideBar';
import AdminPage from '../Admin/admin/AdminPage';
import ClientPage from '../Admin/client/ClientPage';
import SuperadminPage from '../Admin/superadmin/SuperadminPage';

const DashboardLayout = ({ role = 'admin' }) => {
  const [selectedPage, setSelectedPage] = useState('Dashboard');

  const renderContent = () => {
    if (role === 'admin') {
      if (selectedPage === 'Dashboard') return <h2>📊 Admin Dashboard</h2>;
      if (selectedPage === 'Shipments') return <h2>📦 Shipments</h2>;
      if (selectedPage === 'Clients') return <AdminPage />;
    }

    if (role === 'client') {
      if (selectedPage === 'Track') return <ClientPage />;
      if (selectedPage === 'My Shipments') return <h2>📦 My Shipments</h2>;
    }

    if (role === 'superadmin') {
      if (selectedPage === 'Dashboard') return <h2>📊 Superadmin Dashboard</h2>;
      if (selectedPage === 'Admins') return <SuperadminPage />;
      if (selectedPage === 'Analytics') return <h2>📈 Analytics</h2>;
    }

    return <div>Page not found</div>;
  };

  return (
    <div className="flex h-screen">
      <Sidebar role={role} onItemClick={setSelectedPage} selected={selectedPage} />
      <div className="flex-1 p-4 overflow-y-auto">{renderContent()}</div>
    </div>
  );
};

export default DashboardLayout;
