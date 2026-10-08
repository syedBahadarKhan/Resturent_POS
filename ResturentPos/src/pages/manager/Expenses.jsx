import React from 'react';
import { Plus, Search, ChevronDown } from 'lucide-react';
import styles from './Expenses.module.css';

const Expenses = () => {
  return (
    <div className={styles.expensesContainer}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Expenses</h1>
          <p>0 expenses · Showing: 0.00</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.newBtn}>
            <Plus size={16} /> New Expense
          </button>
        </div>
      </div>

      {/* CATEGORY CARDS */}
      <div className={styles.categoryGrid}>
        <div className={styles.categoryCard}>
          <span className={styles.categoryIcon}>✈️</span>
          <span className={styles.categoryText}>Travel</span>
        </div>
        <div className={styles.categoryCard}>
          <span className={styles.categoryIcon}>🍽️</span>
          <span className={styles.categoryText}>Meals & Food</span>
        </div>
        <div className={styles.categoryCard}>
          <span className={styles.categoryIcon}>📎</span>
          <span className={styles.categoryText}>Office Supplies</span>
        </div>
        <div className={styles.categoryCard}>
          <span className={styles.categoryIcon}>💡</span>
          <span className={styles.categoryText}>Utilities</span>
        </div>
        <div className={styles.categoryCard}>
          <span className={styles.categoryIcon}>🏢</span>
          <span className={styles.categoryText}>Rent</span>
        </div>
        <div className={styles.categoryCard}>
          <span className={styles.categoryIcon}>👷</span>
          <span className={styles.categoryText}>Salaries</span>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className={styles.filterBar}>
        <div className={styles.searchBox}>
          <Search size={16} color="#94a3b8" />
          <input type="text" placeholder="Expense no, description, m..." />
        </div>
        <div className={styles.selectBox}>
          <span>Category: All</span>
          <ChevronDown size={14} />
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

      {/* TABLE / EMPTY STATE */}
      <div className={styles.tableContainer}>
        <table className={styles.expenseTable}>
          <thead>
            <tr>
              <th>NO</th>
              <th>DATE</th>
              <th>DESCRIPTION</th>
              <th>CATEGORY</th>
              <th>ACCOUNT / COST CENTER</th>
              <th>METHOD</th>
              <th>AMOUNT</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
        </table>
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>💸</span>
          <p>No expenses yet</p>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
