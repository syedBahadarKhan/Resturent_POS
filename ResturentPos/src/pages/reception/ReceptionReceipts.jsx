import React, { useMemo, useState } from 'react';
import { Banknote, Bell, CalendarDays, ChevronDown, CreditCard, Download, FileText, Printer, Search, X } from 'lucide-react';
import useStore from '../../store/useStore';
import styles from './ReceptionReceipts.module.css';

const money = (amount) => `Rs. ${Number(amount || 0).toLocaleString('en-PK')}`;
const toDateKey = (value) => {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
};
const csvCell = (value) => `"${String(value ?? '').replaceAll('"', '""')}"`;

const ReceptionReceipts = () => {
  const bills = useStore((state) => state.bills);
  const orders = useStore((state) => state.orders);
  const notifications = useStore((state) => state.notifications);
  const currentUser = useStore((state) => state.currentUser);
  const [search, setSearch] = useState('');
  const [methodFilter, setMethodFilter] = useState('All payment methods');
  const [dateFilter, setDateFilter] = useState(toDateKey(new Date()));
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const cashierName = currentUser?.name?.split(' (')[0] || 'Cashier';
  const initials = cashierName.split(' ').filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase();

  const receipts = useMemo(() => bills
    .filter((bill) => bill.paymentStatus === 'PAID')
    .map((bill) => {
      const order = orders.find((item) => item.id === bill.orderId);
      const billNumber = String(bill.id || '').match(/\d+/)?.[0] || String(bill.id || '').slice(-4);
      return {
        ...bill,
        order,
        receiptId: `REC-${billNumber}`,
        billId: bill.id,
        table: bill.table || order?.table || 'Take Away',
        method: bill.paymentMethod || 'Cash',
        paidAt: bill.paidAt || bill.time,
      };
    })
    .sort((a, b) => new Date(b.paidAt) - new Date(a.paidAt)), [bills, orders]);

  const todayKey = toDateKey(new Date());
  const todaysReceipts = receipts.filter((receipt) => toDateKey(receipt.paidAt) === todayKey);
  const collectedToday = todaysReceipts.reduce((total, receipt) => total + Number(receipt.grandTotal || 0), 0);
  const methodAmount = (method) => todaysReceipts.reduce((total, receipt) => {
    const receiptMethod = receipt.method.toLowerCase();
    const matches = method === 'Other' ? !['cash', 'card'].includes(receiptMethod) : receiptMethod === method.toLowerCase();
    return total + (matches ? Number(receipt.grandTotal || 0) : 0);
  }, 0);
  const methodPercent = (method) => collectedToday ? Math.round(methodAmount(method) / collectedToday * 100) : 0;

  const visibleReceipts = receipts.filter((receipt) => {
    const queryMatches = [receipt.receiptId, receipt.billId, receipt.orderId, receipt.table]
      .some((value) => String(value || '').toLowerCase().includes(search.trim().toLowerCase()));
    return queryMatches && (methodFilter === 'All payment methods' || receipt.method === methodFilter)
      && toDateKey(receipt.paidAt) === dateFilter;
  });

  const formatDate = (value) => new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const formatTime = (value) => new Date(value).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
  const receiptCsv = (rows) => [
    ['Receipt ID', 'Bill ID', 'Order ID', 'Table', 'Amount', 'Payment Method', 'Date', 'Status'],
    ...rows.map((receipt) => [receipt.receiptId, receipt.billId, receipt.orderId, receipt.table, receipt.grandTotal, receipt.method, new Date(receipt.paidAt).toISOString(), 'Paid'])
  ].map((row) => row.map(csvCell).join(',')).join('\n');
  const downloadCsv = (rows, filename) => {
    const file = new Blob([`\uFEFF${receiptCsv(rows)}`], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const downloadReceipt = (receipt) => {
    const itemRows = (receipt.items || []).map((item) => `<tr><td>${item.quantity || 1} x ${item.name}</td><td>Rs. ${Number(item.price * (item.quantity || 1) || 0).toLocaleString('en-PK')}</td></tr>`).join('');
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${receipt.receiptId}</title><style>body{font:15px Arial,sans-serif;color:#17251c;max-width:520px;margin:40px auto;padding:24px;border:1px solid #dfe7e1}h1{font-size:24px;margin:0 0 6px}.muted{color:#718078;font-size:13px}.details{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:24px 0}.details span{color:#718078;font-size:12px}.details strong{display:block;color:#26392d;font-size:14px;margin-top:4px}table{width:100%;border-collapse:collapse}td{padding:12px 0;border-top:1px solid #e7ede9}td:last-child{text-align:right}.total{display:flex;justify-content:space-between;padding:17px 0;border-top:1px solid #e7ede9;font-weight:bold;font-size:18px;color:#168047}</style></head><body><h1>Payment receipt</h1><div class="muted">${receipt.receiptId} - ${formatDate(receipt.paidAt)} at ${formatTime(receipt.paidAt)}</div><div class="details"><div><span>Bill ID</span><strong>${receipt.billId}</strong></div><div><span>Order ID</span><strong>${receipt.orderId}</strong></div><div><span>Table</span><strong>${receipt.table}</strong></div><div><span>Payment method</span><strong>${receipt.method}</strong></div></div><table>${itemRows}</table><div class="total"><span>Paid total</span><span>${money(receipt.grandTotal)}</span></div></body></html>`;
    const file = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${receipt.receiptId}.html`;
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };
  const printReceipt = (receipt) => {
    setSelectedReceipt(receipt);
    window.setTimeout(() => window.print(), 100);
  };

  return (
    <div className={styles.receiptsPage}>
      <header className={styles.topBar}>
        <h1>Receipts</h1>
        <div className={styles.topActions}>
          <label className={styles.globalSearch}><Search size={21} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search order, table, customer, bill..." /></label>
          <button className={styles.notificationButton} aria-label={`${notifications.length} notifications`}><Bell size={22} />{notifications.length > 0 && <i />}</button>
          <button className={styles.accountButton}><span className={styles.avatar}>{initials}</span><span><strong>{cashierName}</strong><small>Cashier</small></span><ChevronDown size={17} /></button>
        </div>
      </header>
      <main className={styles.pageContent}>
        <div className={styles.pageHeading}>
          <div><h1>Receipts</h1><p>View, print and download completed transaction receipts</p></div>
          <button className={styles.exportButton} onClick={() => downloadCsv(visibleReceipts, 'receipts.csv')}><Download size={21} />Export receipts</button>
        </div>

        <section className={styles.summaryCard} aria-label="Receipt summary">
          <div className={styles.summaryMetric}>
            <span className={`${styles.summaryIcon} ${styles.greenIcon}`}><FileText size={25} /></span>
            <div><small>Receipts today</small><strong>{todaysReceipts.length}</strong></div>
          </div>
          <div className={styles.summaryMetric}>
            <span className={`${styles.summaryIcon} ${styles.blueIcon}`}><Banknote size={25} /></span>
            <div><small>Total collected</small><strong>{money(collectedToday)}</strong></div>
          </div>
          <div className={styles.paymentSplit}>
            <small>Payment split</small>
            <div><span>Cash {methodPercent('Cash')}%</span><span>Card {methodPercent('Card')}%</span><span>Other {methodPercent('Other')}%</span></div>
          </div>
        </section>

        <section className={styles.receiptsCard}>
          <div className={styles.filters}>
            <label className={styles.searchBox}><Search size={21} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search receipt, bill or order..." /></label>
            <label className={styles.methodSelect}><select value={methodFilter} onChange={(event) => setMethodFilter(event.target.value)}><option>All payment methods</option>{[...new Set(receipts.map((receipt) => receipt.method))].map((method) => <option key={method}>{method}</option>)}</select><span /></label>
            <label className={styles.dateInput}><CalendarDays size={20} /><input aria-label="Receipt date" type="date" value={dateFilter} onChange={(event) => setDateFilter(event.target.value)} /></label>
          </div>
          <div className={styles.tableTitle}><strong>Completed receipts</strong><span>{visibleReceipts.length} {visibleReceipts.length === 1 ? 'receipt' : 'receipts'}</span></div>
          <div className={styles.tableScroll}>
            <table className={styles.receiptsTable}>
              <thead><tr><th>Receipt ID</th><th>Bill ID</th><th>Order ID</th><th>Table</th><th>Amount</th><th>Payment method</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {visibleReceipts.map((receipt) => (
                  <tr key={receipt.id}>
                    <td className={styles.receiptId}>#{receipt.receiptId}</td><td>#{receipt.billId}</td><td>#{receipt.orderId}</td>
                    <td><span className={styles.tableBadge}>{receipt.table}</span></td><td className={styles.amount}>{money(receipt.grandTotal)}</td>
                    <td><span className={styles.methodText}>{receipt.method.toLowerCase() === 'cash' ? <Banknote size={19} /> : <CreditCard size={19} />}{receipt.method}</span></td>
                    <td><span className={styles.dateCell}>{formatDate(receipt.paidAt)}<small>{formatTime(receipt.paidAt)}</small></span></td>
                    <td><span className={styles.paidBadge}><i />Paid</span></td>
                    <td><div className={styles.rowActions}><button onClick={() => setSelectedReceipt(receipt)}>View</button><button aria-label={`Print ${receipt.receiptId}`} onClick={() => printReceipt(receipt)}><Printer size={20} /></button><button aria-label={`Download ${receipt.receiptId}`} onClick={() => downloadReceipt(receipt)}><Download size={20} /></button></div></td>
                  </tr>
                ))}
                {!visibleReceipts.length && <tr><td className={styles.emptyState} colSpan="9">{receipts.length ? 'No completed receipts match these filters.' : 'Paid bills will appear here as completed receipts.'}</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {selectedReceipt && (
        <div className={styles.modalBackdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedReceipt(null); }}>
          <section className={styles.receiptModal} role="dialog" aria-modal="true" aria-labelledby="receipt-title">
            <div className={styles.modalHeader}><div><h2 id="receipt-title">Payment receipt</h2><p>{selectedReceipt.receiptId} · {formatDate(selectedReceipt.paidAt)} at {formatTime(selectedReceipt.paidAt)}</p></div><button className={styles.closeButton} onClick={() => setSelectedReceipt(null)} aria-label="Close receipt"><X size={20} /></button></div>
            <div className={styles.receiptInfo}><span>Bill ID<strong>#{selectedReceipt.billId}</strong></span><span>Order ID<strong>#{selectedReceipt.orderId}</strong></span><span>Table<strong>{selectedReceipt.table}</strong></span><span>Payment method<strong>{selectedReceipt.method}</strong></span></div>
            <div className={styles.receiptItems}>{(selectedReceipt.items || []).map((item, index) => <div key={`${item.name}-${index}`}><span>{item.quantity || 1} × {item.name}</span><strong>{money(item.price * (item.quantity || 1))}</strong></div>)}</div>
            <div className={styles.receiptTotal}><span>Paid total</span><strong>{money(selectedReceipt.grandTotal)}</strong></div>
            <div className={styles.modalActions}><button onClick={() => printReceipt(selectedReceipt)}><Printer size={18} />Print receipt</button><button onClick={() => downloadReceipt(selectedReceipt)}><Download size={18} />Download</button></div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ReceptionReceipts;
