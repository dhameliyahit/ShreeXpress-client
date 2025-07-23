import React from 'react';
import DashboardLayout from './DashboardLayout';

const DashboardMain = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return <DashboardLayout role={user?.role || 'admin'} />;
};

export default DashboardMain;