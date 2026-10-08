import React, { useMemo, useState } from 'react';
import { Bell, CalendarDays, ChevronDown, ChevronRight, Search, X } from 'lucide-react';
import useStore from '../../store/useStore';
import styles from './ReceptionOrders.module.css';

const money = (amount) => `Rs. ${Number(amount || 0).toLocaleString('en-PK')}`;
const itemCount = (items = []) => items.reduce((total, item) => total + (item.quantity || 1), 0);

const ReceptionOrders = () => {
  const orders = useStore((state) => state.orders);
  const bills = useStore((state) => state.bills);
  const notifications = useStore((state) => state.notifications);
  const currentUser = useStore((state) => state.currentUser);
  const [search, setSearch] = useState('');
  const [tableFilter, setTableFilter] = useState('All tables');
  const [waiterFilter, setWaiterFilter] = useState('All waiters');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [dateFilter, setDateFilter] = useState('Today');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const name = currentUser?.name?.split(' (')[0] || 'Cashier';
  const initials = name.split(' ').filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const billsByOrder = useMemo(() => new Map(bills.map((bill) => [bill.orderId, bill])), [bills]);
  const rows = useMemo(() => orders.map((order) => {
    const bill = billsByOrder.get(order.id);
    return {
      ...order,
      bill,
      billingStatus: bill ? 'Generated' : 'Bill Pending',
      paymentLabel: bill?.paymentStatus === 'PAID' || order.paymentStatus === 'PAID' ? 'Paid' : bill ? 'Payment Pending' : 'Pending',
      amount: bill?.grandTotal ?? order.total ?? order.subtotal ?? 0
    };
  }).sort((a, b) => new Date(b.time) - new Date(a.time)), [orders, billsByOrder]);

  const tables = [...new Set(rows.map((order) => order.table).filter(Boolean))];
  const waiters = [...new Set(rows.map((order) => order.waiterName).filter(Boolean))];
  const now = new Date();
  const filteredRows = rows.filter((order) => {
    const queryMatches = [order.id, order.table, order.waiterName, order.bill?.id]
      .some((value) => String(value || '').toLowerCase().includes(search.trim().toLowerCase()));
    const isToday = new Date(order.time).toDateString() === now.toDateString();
    const statusMatches = statusFilter === 'All statuses' || order.billingStatus === statusFilter || order.paymentLabel === statusFilter;
    return queryMatches && (tableFilter === 'All tables' || order.table === tableFilter)
      && (waiterFilter === 'All waiters' || order.waiterName === waiterFilter)
      && statusMatches && (dateFilter !== 'Today' || isToday);
  });

  const formattedTime = (value) => new Date(value).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <div className={styles.ordersPage}>
      <header className={styles.topBar}>
        <h1>Orders</h1>
        <div className={styles.topActions}>
          <label className={styles.globalSearch}><Search size={20} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search order, table, customer, bill..." /></label>
          <button className={styles.notificationButton} aria-label={`${notifications.length} notifications`}><Bell size={21} />{notifications.length > 0 && <i />}</button>
          <button className={styles.accountButton}>
            <span className={styles.avatar}>{initials}</span><span><strong>{name}</strong><small>Cashier</small></span><ChevronDown size={17} />
          </button>
        </div>
      </header>

      <main className={styles.pageContent}>
        <div className={styles.pageHeading}>
          <div><h2>Orders</h2><p>Orders received from restaurant waiters</p></div>
          <span className={styles.liveBadge}><i />Live updates on</span>
        </div>

        <section className={styles.ordersCard}>
          <div className={styles.filters}>
            <label className={styles.orderSearch}><Search size={20} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search order ID..." /></label>
            <label className={styles.selectWrap}><select value={tableFilter} onChange={(event) => setTableFilter(event.target.value)}><option>All tables</option>{tables.map((table) => <option key={table}>{table}</option>)}</select><ChevronDown size={17} /></label>
            <label className={styles.selectWrap}><select value={waiterFilter} onChange={(event) => setWaiterFilter(event.target.value)}><option>All waiters</option>{waiters.map((waiter) => <option key={waiter}>{waiter}</option>)}</select><ChevronDown size={17} /></label>
            <label className={styles.selectWrap}><select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}><option>All statuses</option><option>Bill Pending</option><option>Generated</option><option>Pending</option><option>Payment Pending</option><option>Paid</option></select><ChevronDown size={17} /></label>
            <label className={styles.dateSelect}><CalendarDays size={19} /><select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}><option>Today</option><option>All dates</option></select><ChevronDown size={16} /></label>
          </div>
          <div className={styles.tableTitle}><strong>All orders</strong><span>{filteredRows.length} {filteredRows.length === 1 ? 'order' : 'orders'}</span></div>
          <div className={styles.tableScroll}>
            <table className={styles.ordersTable}>
              <thead><tr><th>Order ID</th><th>Table</th><th>Waiter</th><th>Items</th><th>Order time</th><th>Total</th><th>Billing status</th><th>Payment status</th><th aria-label="Details" /></tr></thead>
              <tbody>
                {filteredRows.map((order) => (
                  <tr key={order.id}>
                    <td className={styles.orderId}>#{order.id}</td>
                    <td><span className={styles.tableBadge}>{order.table || 'Take Away'}</span></td>
                    <td>{order.waiterName || 'Counter'}</td>
                    <td>{itemCount(order.items)} items</td>
                    <td>{formattedTime(order.time)}</td>
                    <td className={styles.amount}>{money(order.amount)}</td>
                    <td><span className={`${styles.statusBadge} ${order.bill ? styles.generated : styles.pending}`}><i />{order.billingStatus}</span></td>
                    <td><span className={`${styles.statusBadge} ${order.paymentLabel === 'Paid' ? styles.paid : styles.pending}`}><i />{order.paymentLabel}</span></td>
                    <td><button className={styles.detailsButton} onClick={() => setSelectedOrder(order)} aria-label={`View order ${order.id}`}><ChevronRight size={21} /></button></td>
                  </tr>
                ))}
                {!filteredRows.length && <tr><td className={styles.emptyState} colSpan="9">{orders.length ? 'No orders match these filters.' : 'Orders received from waiters will appear here.'}</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {selectedOrder && (
        <div className={styles.modalBackdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedOrder(null); }}>
          <section className={styles.orderModal} role="dialog" aria-modal="true" aria-labelledby="order-modal-title">
            <div className={styles.modalHeader}><div><h3 id="order-modal-title">Order details</h3><p>#{selectedOrder.id} · {selectedOrder.table || 'Take Away'} · {formattedTime(selectedOrder.time)}</p></div><button onClick={() => setSelectedOrder(null)} aria-label="Close order details"><X size={20} /></button></div>
            <div className={styles.modalItems}>{(selectedOrder.items || []).map((item, index) => <div key={`${item.name}-${index}`}><span>{item.quantity || 1} × {item.name}</span><strong>{money(item.price * (item.quantity || 1))}</strong></div>)}</div>
            <div className={styles.modalTotal}><span>Total</span><strong>{money(selectedOrder.amount)}</strong></div>
            <div className={styles.modalStatuses}><span>Billing: {selectedOrder.billingStatus}</span><span>Payment: {selectedOrder.paymentLabel}</span></div>
          </section>
        </div>
      )}
    </div>
  );
};

export default ReceptionOrders;
