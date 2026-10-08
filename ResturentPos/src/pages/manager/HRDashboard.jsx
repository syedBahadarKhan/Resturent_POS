import React from 'react';
import styles from './HRDashboard.module.css';

const HRDashboard = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>HR Dashboard</h1>
          <p>Friday, 2 October</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.refreshBtn}>Refresh</button>
        </div>
      </div>

      {/* CARDS GRID */}
      <div className={styles.cardsGrid}>
        {/* Total Employees */}
        <div className={`${styles.card} ${styles.cardWhite}`}>
          <p className={styles.cardLabel}>Total Employees</p>
          <h2 className={`${styles.cardValue} ${styles.valBlack}`}>0</h2>
        </div>

        {/* Active */}
        <div className={`${styles.card} ${styles.cardGreen}`}>
          <p className={styles.cardLabel}>Active</p>
          <h2 className={`${styles.cardValue} ${styles.valGreen}`}>0</h2>
        </div>

        {/* On Leave Today */}
        <div className={`${styles.card} ${styles.cardOrange}`}>
          <p className={styles.cardLabel}>On Leave Today</p>
          <h2 className={`${styles.cardValue} ${styles.valOrange}`}>0</h2>
        </div>

        {/* Present Today */}
        <div className={`${styles.card} ${styles.cardBlue}`}>
          <p className={styles.cardLabel}>Present Today</p>
          <h2 className={`${styles.cardValue} ${styles.valBlue}`}>0</h2>
        </div>

        {/* Open Positions */}
        <div className={`${styles.card} ${styles.cardPurple}`}>
          <p className={styles.cardLabel}>Open Positions</p>
          <h2 className={`${styles.cardValue} ${styles.valPurple}`}>0</h2>
        </div>

        {/* Pending Appraisals */}
        <div className={`${styles.card} ${styles.cardRed}`}>
          <p className={styles.cardLabel}>Pending Appraisals</p>
          <h2 className={`${styles.cardValue} ${styles.valRed}`}>0</h2>
        </div>

        {/* Active Loans */}
        <div className={`${styles.card} ${styles.cardWhite}`}>
          <p className={styles.cardLabel}>Active Loans</p>
          <h2 className={`${styles.cardValue} ${styles.valDark}`}>0</h2>
        </div>

        {/* Warnings This Month */}
        <div className={`${styles.card} ${styles.cardWhite}`}>
          <p className={styles.cardLabel}>Warnings This Month</p>
          <h2 className={`${styles.cardValue} ${styles.valDark}`}>0</h2>
        </div>
      </div>

      {/* BOTTOM PANELS */}
      <div className={styles.bottomPanels}>
        {/* Headcount by Department */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>Headcount by Department</h2>
            <a href="#" className={styles.purpleLink}>Manage →</a>
          </div>
          <div className={styles.panelBodyEmpty}>
            No department data
          </div>
        </div>

        {/* HR Modules */}
        <div className={styles.panel}>
          <div className={styles.panelHeader}>
            <h2>HR Modules</h2>
          </div>
          <div className={styles.modulesGrid}>
            
            <div className={styles.moduleCard}>
              <span className={styles.moduleIcon}>👤</span>
              <div className={styles.moduleText}>
                <h4>Employees</h4>
                <p>0</p>
              </div>
            </div>

            <div className={styles.moduleCard}>
              <span className={styles.moduleIcon}>📢</span>
              <div className={styles.moduleText}>
                <h4>Recruitment</h4>
                <p>0</p>
              </div>
            </div>

            <div className={styles.moduleCard}>
              <span className={styles.moduleIcon}>⏱️</span>
              <div className={styles.moduleText}>
                <h4>Attendance</h4>
                <p>0</p>
              </div>
            </div>

            <div className={styles.moduleCard}>
              <span className={styles.moduleIcon}>⛱️</span>
              <div className={styles.moduleText}>
                <h4>Leave</h4>
                <p>0</p>
              </div>
            </div>

            <div className={styles.moduleCard}>
              <span className={styles.moduleIcon}>💵</span>
              <div className={styles.moduleText}>
                <h4>Payroll</h4>
                <p>&nbsp;</p>
              </div>
            </div>

            <div className={styles.moduleCard}>
              <span className={styles.moduleIcon}>⭐</span>
              <div className={styles.moduleText}>
                <h4>Appraisals</h4>
                <p>0</p>
              </div>
            </div>

            <div className={styles.moduleCard}>
              <span className={styles.moduleIcon}>🎓</span>
              <div className={styles.moduleText}>
                <h4>Training</h4>
                <p>0</p>
              </div>
            </div>

            <div className={styles.moduleCard}>
              <span className={styles.moduleIcon}>⚠️</span>
              <div className={styles.moduleText}>
                <h4>Warnings</h4>
                <p>0</p>
              </div>
            </div>

            <div className={styles.moduleCard}>
              <span className={styles.moduleIcon}>💳</span>
              <div className={styles.moduleText}>
                <h4>Loans</h4>
                <p>0</p>
              </div>
            </div>

            <div className={styles.moduleCard}>
              <span className={styles.moduleIcon}>🏛️</span>
              <div className={styles.moduleText}>
                <h4>EOBI</h4>
                <p>&nbsp;</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
