import React from 'react';
import { Link } from 'react-router-dom';
import styles from './InventoryDashboard.module.css';

const InventoryDashboard = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Inventory</h1>
          <p>Stock health & operations overview</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.alertBtn}>
            <span className={styles.alertDot}></span>
            0 Low Stock Alerts
          </button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className={styles.cardsGrid}>
        {/* Card 1 */}
        <div className={`${styles.card} ${styles.cardYellow}`}>
          <p className={styles.cardTitle}>Total Products</p>
          <h2 className={styles.valOrange}>3</h2>
          <p className={styles.cardSubtitle}>in catalogue</p>
        </div>

        {/* Card 2 */}
        <div className={`${styles.card} ${styles.cardGreen}`}>
          <p className={styles.cardTitle}>Stock Value</p>
          <h2 className={styles.valGreen}>PKR 0</h2>
          <p className={styles.cardSubtitle}>at average cost</p>
        </div>

        {/* Card 3 */}
        <div className={`${styles.card} ${styles.cardBlue}`}>
          <p className={styles.cardTitle}>Warehouses</p>
          <h2 className={styles.valBlue}>0</h2>
          <p className={styles.cardSubtitle}>active locations</p>
        </div>

        {/* Card 4 */}
        <div className={`${styles.card} ${styles.cardPurple}`}>
          <p className={styles.cardTitle}>Movements Today</p>
          <h2 className={styles.valPurple}>0</h2>
          <p className={styles.cardSubtitle}>stock moves</p>
        </div>
      </div>

      {/* Panels */}
      <div className={styles.panelsLayout}>
        {/* Low Stock Alerts Panel */}
        <div className={styles.panelLeft}>
          <div className={styles.panelHeader}>
            <h3>Low Stock Alerts</h3>
            <Link to="/manager/inventory/low-stock" className={styles.viewAllLink}>View all →</Link>
          </div>
          <div className={styles.panelBody}>
            <div className={styles.emptyState}>
              <div className={styles.checkIcon}>✅</div>
              <p>All stock levels healthy</p>
            </div>
          </div>
        </div>

        {/* Categories Panel */}
        <div className={styles.panelRight}>
          <div className={styles.panelHeader}>
            <h3>Categories</h3>
          </div>
          <div className={styles.panelBody}>
            <div className={styles.emptyState}>
              <p>No categories</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Section */}
      <div className={styles.quickAccessSection}>
        <h3 className={styles.sectionTitle}>Quick Access</h3>
        <div className={styles.quickAccessGrid}>
          <Link to="/manager/inventory/products" className={`${styles.qaCard} ${styles.qaYellow}`}>
            <span className={styles.qaIcon}>📦</span>
            <span className={styles.qaText}>Products</span>
          </Link>
          <Link to="/manager/inventory/transfers" className={`${styles.qaCard} ${styles.qaBlue}`}>
            <span className={styles.qaIcon}>🔄</span>
            <span className={styles.qaText}>Stock Transfers</span>
          </Link>
          <Link to="/manager/inventory/adjustments" className={`${styles.qaCard} ${styles.qaPurple}`}>
            <span className={styles.qaIcon}>✏️</span>
            <span className={styles.qaText}>Stock Adjustments</span>
          </Link>
          <Link to="/manager/inventory/lot-batch" className={`${styles.qaCard} ${styles.qaGreen}`}>
            <span className={styles.qaIcon}>🏷️</span>
            <span className={styles.qaText}>Lot & Batch</span>
          </Link>
          <Link to="/manager/inventory/serial-numbers" className={`${styles.qaCard} ${styles.qaIndigo}`}>
            <span className={styles.qaIcon}>🔢</span>
            <span className={styles.qaText}>Serial Numbers</span>
          </Link>
          <Link to="/manager/inventory/pricelists" className={`${styles.qaCard} ${styles.qaLightGreen}`}>
            <span className={styles.qaIcon}>💰</span>
            <span className={styles.qaText}>Price Lists</span>
          </Link>
          <Link to="/manager/inventory/units" className={`${styles.qaCard} ${styles.qaTeal}`}>
            <span className={styles.qaIcon}>📏</span>
            <span className={styles.qaText}>Units of Measure</span>
          </Link>
          <Link to="/manager/inventory/valuation" className={`${styles.qaCard} ${styles.qaPink}`}>
            <span className={styles.qaIcon}>📊</span>
            <span className={styles.qaText}>Valuation</span>
          </Link>
        </div>
      </div>

      {/* Recent Stock Movements */}
      <div className={styles.fullWidthPanel}>
        <div className={styles.panelHeader}>
          <h3>Recent Stock Movements</h3>
          <Link to="/manager/inventory/movements" className={styles.viewAllLink}>View all →</Link>
        </div>
        <div className={styles.panelBodySmall}>
          <p className={styles.emptyText}>No movements yet</p>
        </div>
      </div>
    </div>
  );
};

export default InventoryDashboard;
