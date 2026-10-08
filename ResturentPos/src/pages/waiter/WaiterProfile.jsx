import React, { useState } from 'react';
import { Pencil, Lock, LogOut, Search, Bell } from 'lucide-react';
import useStore from '../../store/useStore';
import styles from './WaiterProfile.module.css';

const WaiterProfile = () => {
  const currentUser = useStore(state => state.currentUser);
  const logout = useStore(state => state.logout);
  
  const [globalSearch, setGlobalSearch] = useState('');

  const cashierName = currentUser?.name?.split(' (')[0] || 'Ali Khan';
  const cashierInitials = cashierName.split(' ').filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase();
  const employeeId = 'WTR-0248'; // Mock
  const email = 'ali.khan@mehfil.pk'; // Mock
  const phone = '+92 300 123 4567'; // Mock

  const handleLogout = () => {
    logout();
    window.location.href = '/login';
  };

  return (
    <div className={styles.pageWrapper}>
      
      {/* TOPBAR */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <h1>My Profile</h1>
          <p>Manage your personal details</p>
        </div>
        
        <div className={styles.topBarRight}>
          <div className={styles.globalSearchBar}>
            <Search size={16} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search orders, tables..." 
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
          </div>
          
          <div className={styles.notificationWrapper}>
            <Bell size={20} color="#4b5563" />
            <span className={styles.badge}>3</span>
          </div>
          
          <div className={styles.profileSection}>
            <div className={styles.avatarTop}>{cashierInitials}</div>
            <div className={styles.profileDetails}>
              <span className={styles.profileName}>{cashierName}</span>
              <span className={styles.profileRole}>Waiter</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.profileContainer}>
        
        {/* HEADER CARD */}
        <div className={styles.headerCard}>
          <div className={styles.banner}></div>
          <div className={styles.headerContent}>
            
            <div className={styles.avatarSection}>
              <div className={styles.avatar}>{cashierInitials}</div>
              <div className={styles.userInfo}>
                <h2 className={styles.userName}>{cashierName}</h2>
                <div className={styles.userMeta}>
                  <span className={styles.activeBadge}>
                    <span className={styles.dotGreen}></span>
                    Active
                  </span>
                  <span>Waiter · Morning shift</span>
                </div>
              </div>
            </div>

            <button className={styles.editBtn}>
              <Pencil size={16} />
              Edit profile
            </button>
            
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className={styles.mainContent}>
          <h3 className={styles.sectionTitle}>Personal information</h3>
          <p className={styles.sectionSubtitle}>Your restaurant account and contact details.</p>

          <div className={styles.infoGrid}>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>EMPLOYEE ID</span>
              <span className={styles.infoValue}>{employeeId}</span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>ROLE</span>
              <span className={styles.infoValue}>Waiter</span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>EMAIL</span>
              <span className={styles.infoValue}>{email}</span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>PHONE</span>
              <span className={styles.infoValue}>{phone}</span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>SHIFT</span>
              <span className={styles.infoValue}>Morning · 10:00 AM-6:00 PM</span>
            </div>
            <div className={styles.infoBox}>
              <span className={styles.infoLabel}>ACCOUNT STATUS</span>
              <span className={styles.infoValue}>Active</span>
            </div>
          </div>

          <div className={styles.settingsCard}>
            <div className={styles.settingsLeft}>
              <div className={styles.iconBox}>
                <Lock size={20} />
              </div>
              <div className={styles.settingsText}>
                <span className={styles.settingsTitle}>Password & security</span>
                <span className={styles.settingsSub}>Last changed 3 months ago</span>
              </div>
            </div>
            <button className={styles.actionBtn}>Change password</button>
          </div>

          <div className={styles.settingsCard}>
            <div className={styles.settingsLeft}>
              <div className={`${styles.iconBox} ${styles.iconBoxRed}`}>
                <LogOut size={20} />
              </div>
              <div className={styles.settingsText}>
                <span className={styles.settingsTitle}>Sign out of this device</span>
                <span className={styles.settingsSub}>You'll need to enter your credentials again.</span>
              </div>
            </div>
            <button className={`${styles.actionBtn} ${styles.actionBtnRed}`} onClick={handleLogout}>
              Logout
            </button>
          </div>

        </div>

      </div>
      </div>
    </div>
  );
};

export default WaiterProfile;
