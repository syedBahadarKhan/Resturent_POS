import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import useStore from '../../store/useStore';
import styles from './DashboardLayout.module.css';

const DashboardLayout = () => {
  const currentUser = useStore((state) => state.currentUser);
  const location = useLocation();
  const isWaiterContext = currentUser?.role === 'waiter' || location.pathname.startsWith('/waiter');
  const isReceptionContext = currentUser?.role === 'receptionist' || location.pathname.startsWith('/reception');
  const isSingleSidebar = isWaiterContext || isReceptionContext;
  const [sidebarOpen, setSidebarOpen] = useState(() => !isSingleSidebar || window.innerWidth > 1024);

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={`${styles.mainContent} ${isSingleSidebar ? (sidebarOpen ? styles.receptionMainOpen : styles.receptionMainClosed) : (sidebarOpen ? styles.sidebarOpen : styles.sidebarClosed)}`}>
        {!isSingleSidebar && <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />}
        {isSingleSidebar && !sidebarOpen && <button className={styles.receptionMenuToggle} onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={18} /></button>}
        <main className={`${styles.contentArea} ${isSingleSidebar ? styles.receptionContentArea : ''}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;