import React, { useState } from 'react';
import Sidebar from './SideBar';
import AdminPage, { Clients, Shipments } from '../Admin/admin/AdminPage';
import ClientPage, { MyShipments, Track } from '../Admin/client/ClientPage';
import SuperadminPage, { AddNewAdmin, ShowAdmins, Analytics, SqlEditor } from '../Admin/superadmin/SuperadminPage';
import { TopBar } from '../TopBar';

const DashboardLayout = ({ role }) => {
    const [selectedPage, setSelectedPage] = useState('Dashboard');

    const renderContent = () => {
        if (role === 'admin') {
            if (selectedPage === 'Dashboard') return <AdminPage />;
            if (selectedPage === 'Shipments') return <Shipments />;
            if (selectedPage === 'Clients') return <Clients />;
        }

        if (role === 'client') {
            if (selectedPage === 'Dashboard') return <ClientPage />;
            if (selectedPage === 'Track') return <Track />;
            if (selectedPage === 'My Shipments') return <MyShipments />;
        }
        
        if (role === 'superadmin') {
            if (selectedPage === 'Dashboard') return <SuperadminPage />;
            if (selectedPage === 'ShowAdmins') return <ShowAdmins />;
            if (selectedPage === 'AddNewAdmins') return <AddNewAdmin />;
            if (selectedPage === 'Analytics') return <Analytics />;
            if (selectedPage === 'Editor') return <SqlEditor />;
        }

        return <div>Page not found</div>;
    };

    return (
        <div className="flex flex-col h-screen">
            <TopBar />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar role={role} onItemClick={setSelectedPage} selected={selectedPage} />
                <div className="flex-1 sm:p-4 p-2 overflow-y-auto">{renderContent()}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
