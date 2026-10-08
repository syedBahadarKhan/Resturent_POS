import React from 'react';
import { Menu, Bell, Search, Calendar, ChevronDown } from 'lucide-react';
import useStore from '../../store/useStore';
import styles from './Header.module.css';

const Header = ({ toggleSidebar }) => {
  const currentUser = useStore((state) => state.currentUser);
  const notifications = useStore((state) => state.notifications);
  const unreadCount = notifications.length;

  // Format date: "Thursday, Oct 1, 2026" and time "10:24 AM"
  // Using fixed date as per mockup instructions, or dynamic but formatted exactly
  const dateStr = "Thursday, Oct 1, 2026";
  const timeStr = "10:24 AM";

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        <div className={styles.searchWrapper}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search anything... (orders, tables, menu, staff)" 
            className={styles.searchInput} 
          />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.notificationWrapper}>
          <button className={styles.iconBtn}>
            <Bell size={18} />
            <span className={styles.badge}>3</span>
          </button>
        </div>

        <div className={styles.dateTimeWrapper}>
          <div className={styles.iconBtn}>
            <Calendar size={18} />
          </div>
          <div className={styles.dateTimeText}>
            <span className={styles.dateText}>{dateStr}</span>
            <span className={styles.timeText}>{timeStr}</span>
          </div>
        </div>

        <div className={styles.profileDropdown}>
          <div className={styles.avatar}>A</div>
          <div className={styles.profileDetails}>
            <span className={styles.profileName}>Admin Manager</span>
            <span className={styles.profileStatus}><span className={styles.statusDot}></span> Online</span>
          </div>
          <ChevronDown size={16} className={styles.chevron} />
        </div>
      </div>
    </header>
  );
};

export default Header;
