import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import styles from './RestaurantDashboard.module.css';

const RestaurantDashboard = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Good evening — Restaurant Dashboard</h1>
          <p>Saturday, 3 October 2026 • Auto-refreshes every 30s</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.primaryBtn}>+ New Order</button>
          <button className={styles.secondaryBtn}>
            <RefreshCw size={14} className={styles.refreshIcon} />
            Refresh
          </button>
        </div>
      </div>

      {/* Tables Overview */}
      <div className={styles.tablesGrid}>
        <div className={`${styles.tableCard} ${styles.bgWhite}`}>
          <p className={styles.cardTitle}>TOTAL TABLES</p>
          <h2 className={styles.valDark}>0</h2>
        </div>
        <div className={`${styles.tableCard} ${styles.bgGreen}`}>
          <p className={styles.cardTitle}>AVAILABLE</p>
          <h2 className={styles.valGreen}>0</h2>
        </div>
        <div className={`${styles.tableCard} ${styles.bgRed}`}>
          <p className={styles.cardTitle}>OCCUPIED</p>
          <h2 className={styles.valRed}>0</h2>
        </div>
        <div className={`${styles.tableCard} ${styles.bgYellow}`}>
          <p className={styles.cardTitle}>RESERVED</p>
          <h2 className={styles.valOrange}>0</h2>
        </div>
        <div className={`${styles.tableCard} ${styles.bgBlue}`}>
          <p className={styles.cardTitle}>CLEANING</p>
          <h2 className={styles.valBlue}>0</h2>
        </div>
      </div>

      {/* Revenue & Orders Overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <p className={styles.statTitle}>TODAY'S REVENUE</p>
          <h2 className={styles.statValGreen}>PKR 0</h2>
          <p className={styles.statSubtitle}>0 completed orders</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statTitle}>TOTAL ORDERS</p>
          <h2 className={styles.statValDark}>0</h2>
          <p className={styles.statSubtitle}>0 done</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statTitle}>AVERAGE ORDER</p>
          <h2 className={styles.statValBlue}>PKR NaN</h2>
          <p className={styles.statSubtitle}>per completed order</p>
        </div>
        <div className={styles.statCard}>
          <p className={styles.statTitle}>KITCHEN PENDING</p>
          <h2 className={styles.statValDark}>0</h2>
          <p className={styles.statSubtitle}>0 delayed</p>
        </div>
      </div>

      {/* Activity Panels */}
      <div className={styles.activityPanels}>
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Active Orders</h3>
            <Link to="/manager/orders" className={styles.panelLink}>View All →</Link>
          </div>
          <div className={styles.panelBody}>
            <p className={styles.emptyText}>No active orders right now</p>
          </div>
        </div>

        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Kitchen Queue</h3>
            <Link to="/manager/kitchen-display" className={styles.panelLink}>Full KDS →</Link>
          </div>
          <div className={styles.panelBody}>
            <div className={styles.emptyStateContainer}>
              <div className={styles.checkIcon}>✅</div>
              <p className={styles.emptyText}>Kitchen is clear!</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className={styles.quickLinksGrid}>
        <Link to="/manager/tables" className={styles.linkCard}>
          <span className={styles.linkIcon}>🪑</span>
          <div>
            <h4 className={styles.linkTitle}>Table Map</h4>
            <p className={styles.linkSubtitle}>View floor plan</p>
          </div>
        </Link>
        <Link to="/manager/orders" className={styles.linkCard}>
          <span className={styles.linkIcon}>🧾</span>
          <div>
            <h4 className={styles.linkTitle}>POS / Orders</h4>
            <p className={styles.linkSubtitle}>Take new order</p>
          </div>
        </Link>
        <Link to="/manager/kitchen-display" className={styles.linkCard}>
          <span className={styles.linkIcon}>👨‍🍳</span>
          <div>
            <h4 className={styles.linkTitle}>Kitchen Display</h4>
            <p className={styles.linkSubtitle}>Live KOT board</p>
          </div>
        </Link>
        <Link to="/manager/menu" className={styles.linkCard}>
          <span className={styles.linkIcon}>📋</span>
          <div>
            <h4 className={styles.linkTitle}>Menu Builder</h4>
            <p className={styles.linkSubtitle}>Manage items & prices</p>
          </div>
        </Link>
        <Link to="/manager/reservations" className={styles.linkCard}>
          <span className={styles.linkIcon}>📅</span>
          <div>
            <h4 className={styles.linkTitle}>Reservations</h4>
            <p className={styles.linkSubtitle}>Upcoming bookings</p>
          </div>
        </Link>
        <Link to="/manager/restaurant/reports" className={styles.linkCard}>
          <span className={styles.linkIcon}>📊</span>
          <div>
            <h4 className={styles.linkTitle}>Reports</h4>
            <p className={styles.linkSubtitle}>Revenue & analytics</p>
          </div>
        </Link>
        <Link to="/manager/restaurant/settings" className={styles.linkCard}>
          <span className={styles.linkIcon}>⚙️</span>
          <div>
            <h4 className={styles.linkTitle}>Settings</h4>
            <p className={styles.linkSubtitle}>Tax, service charge</p>
          </div>
        </Link>
        <Link to="/manager/staff" className={styles.linkCard}>
          <span className={styles.linkIcon}>👥</span>
          <div>
            <h4 className={styles.linkTitle}>Staff</h4>
            <p className={styles.linkSubtitle}>Manage via HR module</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RestaurantDashboard;
