import React from 'react';
import { RefreshCw, FileText, TrendingUp, TrendingDown, Landmark, FileSpreadsheet, Scale, FileArchive } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import styles from './FinanceDashboard.module.css';

// Empty data to create the empty chart look from the image
const chartData = [
  { name: 'Nov 25', revenue: null, expenses: null, profit: null },
  { name: 'Dec 25', revenue: null, expenses: null, profit: null },
  { name: 'Jan 26', revenue: null, expenses: null, profit: null },
  { name: 'Feb 26', revenue: null, expenses: null, profit: null },
  { name: 'Mar 26', revenue: null, expenses: null, profit: null },
  { name: 'Apr 26', revenue: null, expenses: null, profit: null },
  { name: 'May 26', revenue: null, expenses: null, profit: null },
  { name: 'Jun 26', revenue: null, expenses: null, profit: null },
  { name: 'Jul 26', revenue: null, expenses: null, profit: null },
  { name: 'Aug 26', revenue: null, expenses: null, profit: null },
  { name: 'Sep 26', revenue: null, expenses: null, profit: null },
  { name: 'Oct 26', revenue: null, expenses: null, profit: null }
];

const netProfitData = [
  { name: 'Nov 25', profit: 0 },
  { name: 'Dec 25', profit: 0 },
  { name: 'Jan 26', profit: 0 },
  { name: 'Feb 26', profit: 0 },
  { name: 'Mar 26', profit: 0 },
  { name: 'Apr 26', profit: 0 },
  { name: 'May 26', profit: 0 },
  { name: 'Jun 26', profit: 0 },
  { name: 'Jul 26', profit: 0 },
  { name: 'Aug 26', profit: 0 },
  { name: 'Sep 26', profit: 0 },
  { name: 'Oct 26', profit: 0 }
];

const FinanceDashboard = () => {
  return (
    <div className={styles.financeDashboard}>
      {/* HEADER SECTION */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Finance Dashboard</h1>
          <p>Real-time financial overview — 2 October 2026</p>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.periodTabs}>
            <button className={`${styles.tabBtn} ${styles.tabActive}`}>This Month</button>
            <button className={styles.tabBtn}>This Quarter</button>
            <button className={styles.tabBtn}>This Year</button>
          </div>
          <button className={styles.refreshBtn}>
            <RefreshCw size={14} /> Refresh
          </button>
          <button className={styles.reportBtn}>
            <FileText size={14} /> Full Reports
          </button>
        </div>
      </div>

      {/* KPI CARDS SECTION */}
      <div className={styles.kpiGrid}>
        {/* Revenue */}
        <div className={`${styles.kpiCard} ${styles.cardGreen}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconBox} style={{ backgroundColor: '#eef2ff' }}>
              <TrendingUp size={16} color="#6366f1" />
            </div>
            <div className={styles.badgeGreen}>↑ 0.0%</div>
          </div>
          <div className={styles.cardValue}>0</div>
          <div className={styles.cardTitle}>REVENUE</div>
          <div className={styles.cardSub}>vs prev this month</div>
        </div>

        {/* Expenses */}
        <div className={`${styles.kpiCard} ${styles.cardYellow}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconBox} style={{ backgroundColor: '#fee2e2' }}>
              <TrendingDown size={16} color="#ef4444" />
            </div>
            <div className={styles.badgeGreen}>↑ 0.0%</div>
          </div>
          <div className={styles.cardValue}>0</div>
          <div className={styles.cardTitle}>EXPENSES</div>
          <div className={styles.cardSub}>vs prev this month</div>
        </div>

        {/* Net Profit */}
        <div className={`${styles.kpiCard} ${styles.cardGreen}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconBox} style={{ backgroundColor: '#ffedd5' }}>
              <span role="img" aria-label="money bag">💰</span>
            </div>
          </div>
          <div className={styles.cardValue}>0</div>
          <div className={styles.cardTitle}>NET PROFIT</div>
          <div className={styles.cardSub}>0.0% margin</div>
        </div>

        {/* Cash Balance */}
        <div className={`${styles.kpiCard} ${styles.cardBlue}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconBox} style={{ backgroundColor: '#f3f4f6' }}>
              <Landmark size={16} color="#6b7280" />
            </div>
          </div>
          <div className={styles.cardValue}>0</div>
          <div className={styles.cardTitle}>CASH BALANCE</div>
        </div>

        {/* Receivables */}
        <div className={`${styles.kpiCard} ${styles.cardBlue}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconBox} style={{ backgroundColor: '#e0e7ff' }}>
              <FileSpreadsheet size={16} color="#ef4444" style={{ transform: 'rotate(180deg)' }} />
            </div>
          </div>
          <div className={styles.cardValue}>0</div>
          <div className={styles.cardTitle}>RECEIVABLES</div>
          <div className={styles.cardSub}>No overdue</div>
        </div>

        {/* Payables */}
        <div className={`${styles.kpiCard} ${styles.cardPurple}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconBox} style={{ backgroundColor: '#e0e7ff' }}>
              <FileSpreadsheet size={16} color="#ef4444" />
            </div>
          </div>
          <div className={styles.cardValue}>0</div>
          <div className={styles.cardTitle}>PAYABLES</div>
          <div className={styles.cardSub}>No overdue</div>
        </div>

        {/* Tax Liability */}
        <div className={`${styles.kpiCard} ${styles.cardPink}`}>
          <div className={styles.cardHeader}>
            <div className={styles.iconBox} style={{ backgroundColor: '#fce7f3' }}>
              <FileArchive size={16} color="#9ca3af" />
            </div>
          </div>
          <div className={styles.cardValue}>0</div>
          <div className={styles.cardTitle}>TAX LIABILITY</div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className={styles.chartsGrid}>
        {/* Left Chart */}
        <div className={styles.chartPanel}>
          <div className={styles.chartHeader}>
            <div className={styles.chartTitles}>
              <h3>Revenue vs Expenses</h3>
              <p>12-month trend</p>
            </div>
            <div className={styles.chartLegend}>
              <div className={styles.legendItem}><span className={styles.dotGreen}></span>Revenue</div>
              <div className={styles.legendItem}><span className={styles.dotYellow}></span>Expenses</div>
              <div className={styles.legendItem}><span className={styles.dotBlue}></span>Profit</div>
            </div>
          </div>
          
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 4]} ticks={[0,1,2,3,4]} />
                <Line type="monotone" dataKey="revenue" stroke="#1B7F43" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="expenses" stroke="#eab308" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="profit" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Panel */}
        <div className={styles.bankPanel}>
          <div className={styles.bankHeader}>
            <div className={styles.bankTitles}>
              <h3>Bank Balances</h3>
              <p>Active accounts</p>
            </div>
            <a href="#" className={styles.manageLink}>Manage →</a>
          </div>
          
          <div className={styles.emptyState}>
            No bank accounts set up
          </div>
        </div>
      </div>

      {/* THREE-COLUMN STATS SECTION */}
      <div className={styles.statsGrid}>
        {/* Top Customers */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statTitles}>
              <h3>Top Customers</h3>
              <p>By receivable balance</p>
            </div>
            <a href="#" className={styles.manageLink}>View AR →</a>
          </div>
          <div className={styles.emptyStateSmall}>
            No outstanding receivables
          </div>
        </div>

        {/* Top Vendors */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statTitles}>
              <h3>Top Vendors</h3>
              <p>By payable balance</p>
            </div>
          </div>
          <div className={styles.emptyStateSmall}>
            No outstanding payables
          </div>
        </div>

        {/* Expense Breakdown */}
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <div className={styles.statTitles}>
              <h3>Expense Breakdown</h3>
              <p>This Month by category</p>
            </div>
          </div>
          <div className={styles.emptyStateSmall}>
            No expenses recorded
          </div>
        </div>
      </div>

      {/* NET PROFIT TREND CHART */}
      <div className={styles.fullWidthChart}>
        <div className={styles.chartHeader}>
          <div className={styles.chartTitles}>
            <h3>Net Profit Trend</h3>
            <p>Monthly net profit over 12 months</p>
          </div>
          <a href="#" className={styles.manageLink}>Full P&L →</a>
        </div>
        
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={netProfitData} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 4]} ticks={[0,1,2,3,4]} />
              <Line type="monotone" dataKey="profit" stroke="#1B7F43" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT JOURNAL ENTRIES */}
      <div className={styles.journalSection}>
        <div className={styles.journalHeader}>
          <h3>Recent Journal Entries</h3>
          <a href="#" className={styles.manageLink}>View all →</a>
        </div>
        <div className={styles.emptyStateMedium}>
          No journal entries yet
        </div>
      </div>

      {/* QUICK LINKS GRID */}
      <div className={styles.quickLinksGrid}>
        <div className={styles.quickLinkCard}>
          <span className={styles.quickLinkIcon}>📈</span>
          <span className={styles.quickLinkText}>P&L Report</span>
        </div>
        <div className={styles.quickLinkCard}>
          <span className={styles.quickLinkIcon}>🏦</span>
          <span className={styles.quickLinkText}>Balance Sheet</span>
        </div>
        <div className={styles.quickLinkCard}>
          <span className={styles.quickLinkIcon}>⚖️</span>
          <span className={styles.quickLinkText}>Trial Balance</span>
        </div>
        <div className={styles.quickLinkCard}>
          <span className={styles.quickLinkIcon}>💧</span>
          <span className={styles.quickLinkText}>Cash Flow</span>
        </div>
        <div className={styles.quickLinkCard}>
          <span className={styles.quickLinkIcon}>📋</span>
          <span className={styles.quickLinkText}>AR Aging</span>
        </div>
        <div className={styles.quickLinkCard}>
          <span className={styles.quickLinkIcon}>📒</span>
          <span className={styles.quickLinkText}>Journal</span>
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;
