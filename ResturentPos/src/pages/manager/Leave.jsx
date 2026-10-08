import React, { useState } from 'react';
import styles from './Leave.module.css';

const Leave = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Leave Requests</h1>
          <p>{leaveRequests.length} requests</p>
        </div>
        <button className={styles.newLeaveBtn}>+ New Leave</button>
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <select className={styles.dropdown}>
          <option>Status: All</option>
        </select>
        <select className={styles.dropdown}>
          <option>Date: All</option>
        </select>
      </div>

      {/* Table Section */}
      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>EMPLOYEE</th>
                <th>TYPE</th>
                <th>FROM</th>
                <th>TO</th>
                <th>DAYS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            {leaveRequests.length > 0 && (
              <tbody>
                {/* Leave request rows would go here */}
              </tbody>
            )}
          </table>
          
          {leaveRequests.length === 0 && (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>🌴</span>
              <p className={styles.emptyText}>No leave requests</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leave;
