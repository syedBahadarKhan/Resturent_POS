import React, { useMemo, useState } from 'react';
import { Bell, CalendarDays, ChevronDown, FilePlus2, Search, X } from 'lucide-react';
import useStore from '../../store/useStore';
import styles from './ReceptionBilling.module.css';

const money = (amount) => `Rs. ${Number(amount || 0).toLocaleString('en-PK')}`;

const ReceptionBilling = () => {
  const orders = useStore((state) => state.orders);
  const bills = useStore((state) => state.bills);
  const notifications = useStore((state) => state.notifications);
  const currentUser = useStore((state) => state.currentUser);
  const createBill = useStore((state) => state.createBill);
  const payBill = useStore((state) => state.payBill);
  const [tab, setTab] = useState('Bills');
  const [search, setSearch] = useState('');
  const [billStatus, setBillStatus] = useState('All bill statuses');
  const [paymentStatus, setPaymentStatus] = useState('All payment statuses');
  const [dateFilter, setDateFilter] = useState('Today');
  const [newBillOrder, setNewBillOrder] = useState('');
  const [showNewBillModal, setShowNewBillModal] = useState(false);
  const [paymentBill, setPaymentBill] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Cash');

  const name = currentUser?.name?.split(' (')[0] || 'Cashier';
  const initials = name.split(' ').filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const billsByOrder = useMemo(() => new Map(bills.map((bill) => [bill.orderId, bill])), [bills]);
  const unbilledOrders = orders.filter((order) => order.status === 'DELIVERED' && !billsByOrder.has(order.id));

  const rows = useMemo(() => {
    const savedBills = bills.map((bill) => {
      const order = orders.find((item) => item.id === bill.orderId);
      return {
        key: bill.id,
        id: bill.id,
        orderId: bill.orderId,
        table: bill.table || order?.table,
        customer: bill.customer || order?.customerName || order?.customer || 'Walk-in',
        amount: bill.grandTotal,
        billStatus: bill.billStatus || 'GENERATED',
        paymentStatus: bill.paymentStatus || 'PENDING',
        createdAt: bill.createdAt || bill.time,
        bill,
        order,
      };
    });
    const drafts = orders
      .filter((order) => order.status === 'DELIVERED' && !billsByOrder.has(order.id))
      .map((order) => ({
        key: `draft-${order.id}`,
        id: `DRAFT-${order.id}`,
        orderId: order.id,
        table: order.table,
        customer: order.customerName || order.customer || 'Walk-in',
        amount: order.total ?? order.subtotal ?? 0,
        billStatus: 'DRAFT',
        paymentStatus: 'PENDING',
        createdAt: order.time,
        order,
      }));
    return [...drafts, ...savedBills].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [bills, orders, billsByOrder]);

  const visibleRows = rows.filter((row) => {
    if (tab === 'Payment history' && row.paymentStatus !== 'PAID') return false;
    const matchesQuery = [row.id, row.orderId, row.table, row.customer]
      .some((value) => String(value || '').toLowerCase().includes(search.trim().toLowerCase()));
    const matchesBillStatus = billStatus === 'All bill statuses' || row.billStatus === billStatus.toUpperCase();
    const matchesPaymentStatus = paymentStatus === 'All payment statuses' || row.paymentStatus === paymentStatus.toUpperCase().replaceAll(' ', '_');
    const matchesDate = dateFilter !== 'Today' || new Date(row.createdAt).toDateString() === new Date().toDateString();
    return matchesQuery && matchesBillStatus && matchesPaymentStatus && matchesDate;
  });
  const totalAmount = visibleRows.reduce((sum, row) => sum + Number(row.amount || 0), 0);
  const formatTime = (value) => new Date(value).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  const handleCreateBill = () => {
    if (!newBillOrder) return;
    createBill(newBillOrder);
    setNewBillOrder('');
    setShowNewBillModal(false);
  };
  const handlePayment = () => {
    if (!paymentBill) return;
    payBill(paymentBill.id, paymentMethod);
    setPaymentBill(null);
  };

  return (
    <div className={styles.billingPage}>
      <header className={styles.topBar}>
        <h1>Bills &amp; Payments</h1>
        <div className={styles.topActions}>
          <label className={styles.globalSearch}><Search size={20} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search order, table, customer, bill..." /></label>
          <button className={styles.notificationButton} aria-label={`${notifications.length} notifications`}><Bell size={21} />{notifications.length > 0 && <i />}</button>
          <button className={styles.accountButton}><span className={styles.avatar}>{initials}</span><span><strong>{name}</strong><small>Cashier</small></span><ChevronDown size={17} /></button>
        </div>
      </header>

      <main className={styles.pageContent}>
        <div className={styles.pageHeading}>
          <div><h2>Bills &amp; Payments</h2><p>Generate bills, process payments and review transactions</p></div>
          <button className={styles.newBillButton} onClick={() => { setNewBillOrder(unbilledOrders[0]?.id || ''); setShowNewBillModal(true); }}><FilePlus2 size={21} />Generate new bill</button>
        </div>

        <div className={styles.tabs}>
          <button className={tab === 'Bills' ? styles.activeTab : ''} onClick={() => setTab('Bills')}>Bills <span>{rows.length}</span></button>
          <button className={tab === 'Payment history' ? styles.activeTab : ''} onClick={() => setTab('Payment history')}>Payment history</button>
        </div>

        <section className={styles.billsCard}>
          <div className={styles.filters}>
            <label className={styles.billSearch}><Search size={20} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search bill, order or customer..." /></label>
            <label className={styles.selectWrap}><select value={billStatus} onChange={(event) => setBillStatus(event.target.value)}><option>All bill statuses</option><option>Draft</option><option>Generated</option></select><ChevronDown size={17} /></label>
            <label className={styles.selectWrap}><select value={paymentStatus} onChange={(event) => setPaymentStatus(event.target.value)}><option>All payment statuses</option><option>Pending</option><option>Paid</option></select><ChevronDown size={17} /></label>
            <label className={styles.dateSelect}><CalendarDays size={19} /><select value={dateFilter} onChange={(event) => setDateFilter(event.target.value)}><option>Today</option><option>All dates</option></select><ChevronDown size={16} /></label>
          </div>
          <div className={styles.tableTitle}><strong>{tab === 'Bills' ? dateFilter === 'Today' ? "Today's bills" : 'All bills' : 'Payment history'}</strong><span>{visibleRows.length} {visibleRows.length === 1 ? 'bill' : 'bills'} · {money(totalAmount)}</span></div>
          <div className={styles.tableScroll}>
            <table className={styles.billsTable}>
              <thead><tr><th>Bill ID</th><th>Order ID</th><th>Table</th><th>Customer</th><th>Amount</th><th>Bill status</th><th>Payment status</th><th>Created</th><th>Action</th></tr></thead>
              <tbody>
                {visibleRows.map((row) => (
                  <tr key={row.key}>
                    <td className={styles.billId}>#{row.id}</td><td>#{row.orderId}</td><td><span className={styles.tableBadge}>{row.table || 'Take Away'}</span></td><td>{row.customer}</td><td className={styles.amount}>{money(row.amount)}</td>
                    <td><span className={`${styles.statusBadge} ${row.billStatus === 'DRAFT' ? styles.generated : styles.generated}`}><i />{row.billStatus === 'DRAFT' ? 'Draft' : 'Generated'}</span></td>
                    <td><span className={`${styles.statusBadge} ${row.paymentStatus === 'PAID' ? styles.paid : styles.pending}`}><i />{row.paymentStatus === 'PAID' ? 'Paid' : row.billStatus === 'DRAFT' ? 'Pending' : 'Payment Pending'}</span></td>
                    <td>{formatTime(row.createdAt)}</td>
                    <td>{row.billStatus === 'DRAFT' ? <button className={styles.actionButton} onClick={() => createBill(row.orderId)}>Generate</button> : row.paymentStatus !== 'PAID' ? <button className={styles.actionButton} onClick={() => { setPaymentMethod('Cash'); setPaymentBill(row.bill); }}>Take payment</button> : <span className={styles.paidAction}>Paid</span>}</td>
                  </tr>
                ))}
                {!visibleRows.length && <tr><td className={styles.emptyState} colSpan="9">{rows.length ? 'No bills match these filters.' : 'Bills will appear here when orders are ready for billing.'}</td></tr>}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {showNewBillModal && (
        <div className={styles.modalBackdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) setShowNewBillModal(false); }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="new-bill-title">
            <div className={styles.modalHeader}><div><h3 id="new-bill-title">Generate new bill</h3><p>Select an order ready for billing.</p></div><button onClick={() => setShowNewBillModal(false)} aria-label="Close"><X size={20} /></button></div>
            {unbilledOrders.length ? <><label className={styles.modalSelectLabel}>Order<select value={newBillOrder} onChange={(event) => setNewBillOrder(event.target.value)}>{unbilledOrders.map((order) => <option key={order.id} value={order.id}>#{order.id} · {order.table || 'Take Away'} · {money(order.total ?? order.subtotal)}</option>)}</select></label><button className={styles.confirmButton} onClick={handleCreateBill}>Generate bill</button></> : <p className={styles.noBillOrders}>There are no delivered orders waiting for a bill.</p>}
          </section>
        </div>
      )}

      {paymentBill && (
        <div className={styles.modalBackdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) setPaymentBill(null); }}>
          <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="payment-title">
            <div className={styles.modalHeader}><div><h3 id="payment-title">Take payment</h3><p>Bill #{paymentBill.id} · {money(paymentBill.grandTotal)}</p></div><button onClick={() => setPaymentBill(null)} aria-label="Close"><X size={20} /></button></div>
            <label className={styles.modalSelectLabel}>Payment method<select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}><option>Cash</option><option>Card</option><option>Digital Wallet</option></select></label>
            <button className={styles.confirmButton} onClick={handlePayment}>Confirm payment</button>
          </section>
        </div>
      )}
    </div>
  );
};

export default ReceptionBilling;
