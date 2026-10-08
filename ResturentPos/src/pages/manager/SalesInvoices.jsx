import React from 'react';
import { Download, Plus, Search, ChevronDown, MessageCircle, Printer, Check } from 'lucide-react';
import styles from './SalesInvoices.module.css';

const SalesInvoices = () => {
  return (
    <div className={styles.salesInvoicesContainer}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Sales Invoices</h1>
          <p>1 invoices · Rs. 3,088.97 outstanding</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.exportBtn}>
            <Download size={16} /> Export
          </button>
          <button className={styles.newBtn}>
            <Plus size={16} /> New Invoice
          </button>
        </div>
      </div>

      {/* KPI CARDS */}
      <div className={styles.kpiGrid}>
        {/* Total Invoiced */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.iconDoc}>📄</span>
            <span className={styles.kpiLabel}>TOTAL INVOICED</span>
          </div>
          <div className={`${styles.kpiValue} ${styles.valBlack}`}>Rs. 3,088.97</div>
          <div className={styles.kpiSub}>1 invoices</div>
        </div>

        {/* Collected */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.iconCheck}>✅</span>
            <span className={styles.kpiLabel}>COLLECTED</span>
          </div>
          <div className={`${styles.kpiValue} ${styles.valGreen}`}>Rs. 0.00</div>
          <div className={styles.kpiSub}>0 paid</div>
        </div>

        {/* Outstanding */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.iconHourglass}>⏳</span>
            <span className={styles.kpiLabel}>OUTSTANDING</span>
          </div>
          <div className={`${styles.kpiValue} ${styles.valOrange}`}>Rs. 3,088.97</div>
          <div className={styles.kpiSub}>1 open</div>
        </div>

        {/* Overdue */}
        <div className={styles.kpiCard}>
          <div className={styles.kpiTop}>
            <span className={styles.iconWarn}>⚠️</span>
            <span className={styles.kpiLabel}>OVERDUE</span>
          </div>
          <div className={`${styles.kpiValue} ${styles.valRed}`}>0</div>
          <div className={styles.kpiSub}>need attention</div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className={styles.filterBar}>
        <div className={styles.searchBox}>
          <Search size={16} color="#94a3b8" />
          <input type="text" placeholder="Invoice no or customer..." />
        </div>
        <div className={styles.selectBox}>
          <span>Status: All</span>
          <ChevronDown size={14} />
        </div>
        <div className={styles.selectBox}>
          <span>Date: All</span>
          <ChevronDown size={14} />
        </div>
        <div className={styles.amountFilter}>
          <span className={styles.amountLabel}>Amount:</span>
          <input type="text" placeholder="Min" className={styles.minMaxInput} />
          <span>-</span>
          <input type="text" placeholder="Max" className={styles.minMaxInput} />
        </div>
      </div>

      {/* TABLE */}
      <div className={styles.tableContainer}>
        <table className={styles.invoiceTable}>
          <thead>
            <tr>
              <th>INVOICE NO</th>
              <th>CUSTOMER</th>
              <th>Date ▼</th>
              <th>DUE / STATUS</th>
              <th>Total ↕</th>
              <th>Balance ↕</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className={styles.invNoWrap}>
                  <span className={styles.invBadge}>INV-00001</span>
                  <span className={styles.invLabelSmall}>1L</span>
                </div>
              </td>
              <td className={styles.customerName}>(Sample) Office Lunch Account</td>
              <td className={styles.dateCol}>02-Oct-<br/>2026</td>
              <td>
                <span className={styles.statusSent}>
                  <span className={styles.blueDot}></span> Sent
                </span>
              </td>
              <td className={styles.totalText}>Rs. 3,088.97</td>
              <td className={styles.balanceText}>Rs. 3,088.97</td>
              <td>
                <div className={styles.actionsWrap}>
                  <span className={styles.paidAction}>Paid ✓</span>
                  <button className={styles.iconBtn}><MessageCircle size={18} /></button>
                  <button className={styles.iconBtn}><Printer size={18} /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SalesInvoices;
