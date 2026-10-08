import React, { useState } from 'react';
import styles from './Loans.module.css';

const Loans = () => {
  const [loans, setLoans] = useState([]);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Employee Loans</h1>
          <p>{loans.length} loans · Outstanding: 0.00</p>
        </div>
        <button className={styles.newLoanBtn}>+ New Loan</button>
      </div>

      {/* Table Section */}
      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>NO</th>
                <th>BORROWER</th>
                <th>TYPE</th>
                <th>AMOUNT</th>
                <th>TENURE</th>
                <th>EMI</th>
                <th>BALANCE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            {loans.length > 0 && (
              <tbody>
                {/* Loan rows would go here */}
              </tbody>
            )}
          </table>
          
          {loans.length === 0 && (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>💰</span>
              <p className={styles.emptyText}>No loans</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Loans;
