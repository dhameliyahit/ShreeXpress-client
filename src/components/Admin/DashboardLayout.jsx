import { useState } from 'react';
import Sidebar from './SideBar';
import AdminPage, { AddNewClient, Shipments, Clients, AddBranch } from '../Admin/admin/AdminPage';
import ClientPage, { Track, CreateParcel } from '../Admin/client/ClientPage';
import SuperadminPage, { User, AddNewAdmin, Analytics, Branches, OTP_Logs, Block_email, FranchiseInquiries, Contact } from './superadmin/SuperAdmin';
import { TopBar } from '../TopBar';

const DashboardLayout = ({ role }) => {
    const [selectedPage, setSelectedPage] = useState('Dashboard');

    const renderContent = () => {
        if (role === 'admin') {
            if (selectedPage === 'Dashboard') return <AdminPage />;
            if (selectedPage === 'Clients') return <Clients />;
            if (selectedPage === 'AddNewClient') return <AddNewClient />;
            if (selectedPage === 'Shipments') return <Shipments />
            if (selectedPage === 'AddBranch') return <AddBranch />;
        }

        if (role === 'client') {
            if (selectedPage === 'Dashboard') return <ClientPage />;
            if (selectedPage === 'Track') return <Track />;
            if (selectedPage === 'CreateParcel') return <CreateParcel />;
        }

        if (role === 'superadmin') {
            if (selectedPage === 'Dashboard') return <SuperadminPage />;
            if (selectedPage === 'User') return <User />;
            if (selectedPage === 'AddNewAdmins') return <AddNewAdmin />;
            if (selectedPage === 'Analytics') return <Analytics />;
            if (selectedPage === 'Branches') return <Branches />;
            if (selectedPage === 'Franchise') return <FranchiseInquiries />;
            if (selectedPage === 'Contact') return <Contact />;
            if (selectedPage === 'OTP_Logs') return <OTP_Logs />;
            if (selectedPage === 'Block_email') return <Block_email />;
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