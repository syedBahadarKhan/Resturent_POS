import React, { useState } from 'react';
import { Download, FileText, Printer, RefreshCw } from 'lucide-react';
import styles from './FinancialReports.module.css';

const FinancialReports = () => {
  const [activeReport, setActiveReport] = useState('Trial Balance');

  const statements = [
    { name: 'Trial Balance', icon: '⚖️', desc: 'All accounts debit/credit summary' },
    { name: 'Profit & Loss', icon: '📈', desc: 'Revenue vs expenses for period' },
    { name: 'Balance Sheet', icon: '🏦', desc: 'Assets, liabilities, equity' },
    { name: 'Cash Flow', icon: '💧', desc: 'Operating, investing, financing' }
  ];

  const ledgers = [
    { name: 'General Ledger', icon: '📒', desc: 'All posted journal entries' },
    { name: 'Day Book', icon: '📅', desc: 'All transactions by date' },
    { name: 'Cash Book', icon: '💵', desc: 'Cash inflows and outflows' },
    { name: 'Bank Book', icon: '🏦', desc: 'Bank account statement' },
    { name: 'Customer Ledger', icon: '👤', desc: 'Per-customer transaction history' },
    { name: 'Vendor Ledger', icon: '🏭', desc: 'Per-vendor transaction history' }
  ];

  return (
    <div className={styles.reportsContainer}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Financial Reports</h1>
          <p>Real-time reports from posted journal entries</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.btnWhite}>
            <Download size={16} /> Export
          </button>
          <button className={styles.btnRed}>
            <FileText size={16} /> PDF
          </button>
          <button className={styles.btnWhite}>
            <Printer size={16} /> Print
          </button>
          <button className={styles.btnGreen}>
            <RefreshCw size={16} /> Refresh
          </button>
        </div>
      </div>

      {/* FINANCIAL STATEMENTS */}
      <div className={styles.sectionBlock}>
        <h3 className={styles.greenHeading}>FINANCIAL STATEMENTS</h3>
        <div className={styles.cardGrid}>
          {statements.map((item) => (
            <div 
              key={item.name}
              className={`${styles.reportCard} ${activeReport === item.name ? styles.cardActive : ''}`}
              onClick={() => setActiveReport(item.name)}
            >
              <span className={styles.cardIcon}>{item.icon}</span>
              <div className={styles.cardTitle}>{item.name}</div>
              <div className={styles.cardDesc}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* LEDGERS & BOOKS */}
      <div className={styles.sectionBlock}>
        <h3 className={styles.blueHeading}>LEDGERS & BOOKS</h3>
        <div className={styles.cardGrid}>
          {ledgers.map((item) => (
            <div 
              key={item.name}
              className={`${styles.reportCard} ${activeReport === item.name ? styles.cardActive : ''}`}
              onClick={() => setActiveReport(item.name)}
            >
              <span className={styles.cardIcon}>{item.icon}</span>
              <div className={styles.cardTitle}>{item.name}</div>
              <div className={styles.cardDesc}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;
