import React from 'react';
import styles from './Payroll.module.css';

const Payroll = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Payroll</h1>
          <p>Monthly payroll runs with GL integration</p>
        </div>
        <button className={styles.newRunBtn}>+ New Payroll Run</button>
      </div>

      <div className={styles.contentLayout}>
        {/* Left Column: Payroll Runs */}
        <div className={styles.leftColumn}>
          <div className={styles.runsHeader}>
            <h2>Payroll Runs</h2>
          </div>
          
          <div className={styles.runList}>
            <div className={styles.runCard}>
              <div className={styles.runCardHeader}>
                <h3>Oct 2026</h3>
                <span className={styles.draftBadge}>Draft</span>
              </div>
              <p className={styles.employeeCount}>1 employees</p>
              <p className={styles.amount}>6,610.45</p>
              <button className={styles.deleteBtn}>Delete</button>
            </div>
          </div>

          <div className={styles.pagination}>
            <div className={styles.paginationText}>
              Showing<br />
              1–1 of 1<br />
              records
            </div>
            <div className={styles.paginationControls}>
              <select className={styles.pageSelect}>
                <option>25 per page</option>
              </select>
              <button className={styles.pageArrow} disabled>&lt;</button>
            </div>
          </div>
        </div>

        {/* Right Column: Empty Details */}
        <div className={styles.rightColumn}>
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>💼</span>
            <h3>Select a payroll run to view details</h3>
            <p>Or create a new payroll run</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
