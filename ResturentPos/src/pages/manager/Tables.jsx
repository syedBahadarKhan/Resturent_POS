import React from 'react';
import { RefreshCw } from 'lucide-react';
import styles from './Tables.module.css';

const Tables = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Table Management</h1>
          <p>Floor plan • Live status • Refreshes every 15s</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.iconBtn}>
            <RefreshCw size={14} className={styles.refreshIcon} />
          </button>
          <button className={styles.primaryBtn}>+ Add Table</button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className={styles.statsGrid}>
        <div className={`${styles.statCard} ${styles.bgWhite}`}>
          <p className={styles.cardTitle}>TOTAL</p>
          <h2 className={styles.valDark}>1</h2>
        </div>
        <div className={`${styles.statCard} ${styles.bgGreen}`}>
          <p className={styles.cardTitle}>AVAILABLE</p>
          <h2 className={styles.valGreen}>1</h2>
        </div>
        <div className={`${styles.statCard} ${styles.bgRed}`}>
          <p className={styles.cardTitle}>OCCUPIED</p>
          <h2 className={styles.valRed}>0</h2>
        </div>
        <div className={`${styles.statCard} ${styles.bgYellow}`}>
          <p className={styles.cardTitle}>RESERVED</p>
          <h2 className={styles.valOrange}>0</h2>
        </div>
        <div className={`${styles.statCard} ${styles.bgBlue}`}>
          <p className={styles.cardTitle}>CLEANING</p>
          <h2 className={styles.valBlue}>0</h2>
        </div>
      </div>

      {/* Table Grid (Floor Plan) */}
      <div className={styles.tableGrid}>
        {/* Available Table Card */}
        <div className={styles.tableItem}>
          <div className={styles.tableHeader}>
            <div className={styles.tableNameWrapper}>
              <div className={styles.statusDot}></div>
              <h3 className={styles.tableName}>Table First</h3>
            </div>
            <span className={styles.statusBadge}>AVAILABLE</span>
          </div>
          <p className={styles.tableSubtitle}>t-1</p>
          
          <div className={styles.seatsInfo}>
            <div className={styles.seatIcons}>
              <div className={styles.seat}></div>
              <div className={styles.seat}></div>
              <div className={styles.seat}></div>
              <div className={styles.seat}></div>
            </div>
            <span className={styles.seatsText}>4 seats</span>
          </div>
          
          <div className={styles.tableFooter}>
            <span className={styles.emptyText}>Empty</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tables;
