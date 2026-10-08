import React from 'react';
import styles from './LowStock.module.css';

const LowStock = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Low Stock Alerts</h1>
          <p>0 products need attention</p>
        </div>
        <div className={styles.headerRight}>
          <select className={styles.warehouseDropdown}>
            <option>All Warehouses</option>
          </select>
        </div>
      </div>

      {/* Cards Grid */}
      <div className={styles.cardsGrid}>
        {/* Out of Stock Card */}
        <div className={`${styles.card} ${styles.cardRed}`}>
          <p className={styles.cardTitle}>Out of Stock</p>
          <h2 className={styles.valRed}>0</h2>
        </div>

        {/* Critical Card */}
        <div className={`${styles.card} ${styles.cardOrange}`}>
          <p className={styles.cardTitle}>Critical</p>
          <h2 className={styles.valOrange}>0</h2>
        </div>

        {/* Low Stock Card */}
        <div className={`${styles.card} ${styles.cardYellow}`}>
          <p className={styles.cardTitle}>Low Stock</p>
          <h2 className={styles.valYellow}>0</h2>
        </div>
      </div>

      {/* Table Section */}
      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>CATEGORY</th>
                <th>AVAILABLE</th>
                <th>MIN</th>
                <th>REORDER QTY</th>
                <th>INCOMING</th>
                <th>STATUS</th>
              </tr>
            </thead>
          </table>
          <div className={styles.emptyState}>
            <div className={styles.checkIcon}>✅</div>
            <p>No alerts</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LowStock;
