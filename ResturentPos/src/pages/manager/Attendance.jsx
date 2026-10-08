import React from 'react';
import styles from './Attendance.module.css';

const Attendance = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Attendance</h1>
          <p>1 records</p>
        </div>
        <button className={styles.markBtn}>+ Mark Attendance</button>
      </div>

      {/* Summary Cards */}
      <div className={styles.cardsGrid}>
        <div className={`${styles.card} ${styles.cardGreen}`}>
          <p className={styles.cardLabel}>Present</p>
          <h2 className={styles.valGreen}>0</h2>
        </div>
        <div className={`${styles.card} ${styles.cardRed}`}>
          <p className={styles.cardLabel}>Absent</p>
          <h2 className={styles.valRed}>1</h2>
        </div>
        <div className={`${styles.card} ${styles.cardYellow}`}>
          <p className={styles.cardLabel}>Late</p>
          <h2 className={styles.valOrange}>0</h2>
        </div>
        <div className={`${styles.card} ${styles.cardWhite}`}>
          <p className={styles.cardLabel}>Total</p>
          <h2 className={styles.valBlack}>1</h2>
        </div>
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
                <th>DATE</th>
                <th>CLOCK IN</th>
                <th>CLOCK OUT</th>
                <th>HOURS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.empName}>khan ali</div>
                  <div className={styles.empId}>EMP-0001</div>
                </td>
                <td>02 Oct 2026</td>
                <td>22:09</td>
                <td>22:09</td>
                <td>0.0h</td>
                <td>
                  <span className={styles.statusAbsent}>ABSENT</span>
                </td>
                <td>
                  <button className={styles.actionBtn}>✕</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.paginationLeft}>
            <span>Showing 1–1 of 1 records</span>
            <select className={styles.pageSelect}>
              <option>25 per page</option>
            </select>
          </div>
          <div className={styles.paginationRight}>
            <button className={styles.pageArrow}>&lt;</button>
            <button className={styles.pageActive}>1</button>
            <button className={styles.pageArrow}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
