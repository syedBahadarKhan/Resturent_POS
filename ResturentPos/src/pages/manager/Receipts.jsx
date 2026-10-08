import React from 'react';
import { Plus, Search, ChevronDown, MessageCircle, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Receipts.module.css';

const Receipts = () => {
  return (
    <div className={styles.receiptsContainer}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Payment Receipts</h1>
          <p>1 receipts total</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.newBtn}>
            <Plus size={16} /> New Receipt
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className={styles.filterBar}>
        <div className={styles.searchBox}>
          <Search size={16} color="#94a3b8" />
          <input type="text" placeholder="Receipt no, customer, invo..." />
        </div>
        <div className={styles.selectBox}>
          <span>Method: All</span>
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

      {/* TABLE & PAGINATION */}
      <div className={styles.tableContainer}>
        <table className={styles.receiptsTable}>
          <thead>
            <tr>
              <th>RECEIPT NO</th>
              <th>DATE</th>
              <th>CUSTOMER</th>
              <th>INVOICE</th>
              <th>METHOD</th>
              <th>AMOUNT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className={styles.badgeGray}>RCP-00001</span>
              </td>
              <td className={styles.cellText}>02 Oct 2026</td>
              <td className={styles.cellTextDark}>(Sample) Office Lunch ...</td>
              <td>
                <span className={styles.badgeBlue}>INV-00001</span>
              </td>
              <td>
                <span className={styles.methodCell}>
                  💵 Cash
                </span>
              </td>
              <td className={styles.amountCell}>3,088.97</td>
              <td>
                <div className={styles.actionsWrap}>
                  <button className={styles.iconBtn}><MessageCircle size={18} /></button>
                  <button className={styles.iconBtn}><Trash2 size={18} /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* PAGINATION */}
        <div className={styles.paginationFooter}>
          <div className={styles.pageInfo}>
            Showing 1-1 of 1 records
            <div className={styles.perPageSelect}>
              <span>25 per page</span>
              <ChevronDown size={14} />
            </div>
          </div>
          <div className={styles.pageControls}>
            <button className={styles.pageArrow} disabled><ChevronLeft size={16} /></button>
            <button className={styles.pageNumberActive}>1</button>
            <button className={styles.pageArrow} disabled><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipts;
