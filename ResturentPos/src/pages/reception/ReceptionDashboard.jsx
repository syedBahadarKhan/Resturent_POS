import React, { useMemo, useState } from 'react';
import { Bell, Check, ChevronDown, ChevronRight, ClipboardList, Clock3, CreditCard, FileText, Printer, Search, Wallet, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import styles from './ReceptionDashboard.module.css';

const money = (amount) => `Rs. ${Number(amount || 0).toLocaleString('en-PK')}`;
const itemCount = (items = []) => items.reduce((sum, item) => sum + (item.quantity || 1), 0);

const ReceptionDashboard = () => {
  const orders = useStore((state) => state.orders);
  const bills = useStore((state) => state.bills);
  const notifications = useStore((state) => state.notifications);
  const currentUser = useStore((state) => state.currentUser);
  const generateBill = useStore((state) => state.generateBill);
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [successMessage, setSuccessMessage] = useState('');

  const today = new Date();
  const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const isToday = (value) => {
    const date = new Date(value);
    return date >= startOfToday && date < endOfToday;
  };
  const cashierName = currentUser?.name?.split(' (')[0] || 'Cashier';
  const firstName = cashierName.split(' ')[0];
  const initials = cashierName.split(' ').filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  const hour = today.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
  const shiftHours = currentUser?.shift === 'morning' ? '09:00 AM - 05:00 PM' : currentUser?.shift === 'evening' ? '05:00 PM - 01:00 AM' : '09:00 PM - 05:00 AM';

  const pendingBillOrders = orders.filter((order) => order.status === 'DELIVERED' && order.paymentStatus !== 'PAID');
  const pendingPayments = orders.filter((order) => order.paymentStatus !== 'PAID');
  const todayOrders = orders.filter((order) => isToday(order.time));
  const todayRevenue = bills.filter((bill) => isToday(bill.time)).reduce((sum, bill) => sum + bill.grandTotal, 0);
  const dueAmount = pendingPayments.reduce((sum, order) => sum + (order.total || 0) * 1.2, 0);

  const records = useMemo(() => {
    const billed = bills.map((bill) => ({
      key: bill.id,
      orderId: bill.orderId,
      table: bill.table,
      waiter: bill.waiter || 'Counter',
      items: itemCount(bill.items),
      time: bill.time,
      amount: bill.grandTotal,
      status: 'Generated',
      bill,
      order: orders.find((order) => order.id === bill.orderId)
    }));
    const waiting = orders
      .filter((order) => order.status === 'DELIVERED' && order.paymentStatus !== 'PAID')
      .map((order) => ({
        key: order.id,
        orderId: order.id,
        table: order.table,
        waiter: order.waiterName || 'Counter',
        items: itemCount(order.items),
        time: order.time,
        amount: (order.total || 0) * 1.2,
        status: 'Bill Pending',
        order
      }));
    return [...waiting, ...billed]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 8);
  }, [bills, orders]);

  const filteredRecords = records.filter((record) =>
    [record.orderId, record.table, record.waiter, record.status]
      .some((value) => String(value || '').toLowerCase().includes(search.trim().toLowerCase()))
  );

  const recentPayments = useMemo(() => bills
    .filter((bill) => bill.paymentStatus === 'PAID')
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .slice(0, 4), [bills]);

  const cashierActivity = useMemo(() => {
    const billEvents = bills.flatMap((bill) => [
      { key: `${bill.id}-generated`, type: 'bill', title: 'Bill generated', detail: `#${bill.id} for Table ${bill.table || 'Take Away'}`, time: bill.time },
      { key: `${bill.id}-paid`, type: 'payment', title: 'Payment received', detail: `${money(bill.grandTotal)} via ${bill.paymentMethod || 'Cash'}`, time: bill.time }
    ]);
    const billedOrderIds = new Set(bills.map((bill) => bill.orderId));
    const completedEvents = orders
      .filter((order) => order.status === 'COMPLETED' && !billedOrderIds.has(order.id))
      .map((order) => ({ key: `${order.id}-completed`, type: 'completed', title: 'Order completed', detail: `#${order.id} - Table ${order.table || 'Take Away'}`, time: order.time }));
    return [...billEvents, ...completedEvents]
      .sort((a, b) => new Date(b.time) - new Date(a.time))
      .slice(0, 5);
  }, [bills, orders]);

  const openRecord = (record) => {
    setSuccessMessage('');
    setSelectedRecord(record);
  };

  const handleGenerateBill = () => {
    if (!selectedRecord?.order) return;
    generateBill(selectedRecord.order.id, paymentMethod);
    setSelectedRecord(null);
    setSuccessMessage(`Bill generated for ${selectedRecord.orderId}.`);
  };

  const selectedOrder = selectedRecord?.order;
  const selectedBill = selectedRecord?.bill;
  const selectedSubtotal = selectedBill?.subtotal ?? selectedOrder?.subtotal ?? selectedOrder?.total ?? 0;
  const selectedDiscount = selectedBill?.discount ?? selectedOrder?.discount ?? 0;
  const selectedTax = selectedBill?.tax ?? Math.round((selectedSubtotal - selectedDiscount) * 0.15);
  const selectedService = selectedBill?.serviceCharge ?? Math.round((selectedSubtotal - selectedDiscount) * 0.05);
  const selectedTotal = selectedBill?.grandTotal ?? (selectedSubtotal - selectedDiscount + selectedTax + selectedService);

  return (
    <div className={styles.cashierDashboard}>
      <header className={styles.topBar}>
        <h1>Cashier Dashboard</h1>
        <div className={styles.topActions}>
          <label className={styles.searchBox}>
            <Search size={18} />
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search order, table, customer, bill..." />
          </label>
          <div className={styles.notificationButton} aria-label={`${notifications.length} notifications`}>
            <Bell size={19} />{notifications.length > 0 && <span />}
          </div>
          <button className={styles.accountButton} onClick={() => navigate('/reception/settings')}>
            <span className={styles.accountAvatar}>{initials}</span>
            <span className={styles.accountDetails}><strong>{cashierName}</strong><small>Cashier</small></span>
            <ChevronDown size={16} />
          </button>
        </div>
      </header>

      <main className={styles.dashboardContent}>
        <div className={styles.welcomeRow}>
          <div>
            <h2>{greeting}, {firstName}</h2>
            <p>Here&apos;s what needs your attention today, {today.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
          </div>
          <div className={styles.shiftBadge}><span className={styles.shiftDot} /><strong>Shift active</strong><span className={styles.shiftDivider} />{shiftHours}</div>
        </div>

        {successMessage && <div className={styles.successMessage}><Check size={15} />{successMessage}<button onClick={() => setSuccessMessage('')} aria-label="Dismiss message"><X size={15} /></button></div>}

        <section className={styles.statsGrid} aria-label="Today's cashier summary">
          <article className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.greenIcon}`}><ClipboardList size={19} /></div>
            <div className={styles.statInfo}><span>Orders received today</span><strong>{todayOrders.length}</strong><small>{todayOrders.length ? 'Updated today' : 'No orders received yet'}</small></div>
          </article>
          <article className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.orangeIcon}`}><FileText size={19} /></div>
            <div className={styles.statInfo}><span>Pending bills</span><strong>{String(pendingBillOrders.length).padStart(2, '0')}</strong><small>Requires action</small></div>
          </article>
          <article className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.blueIcon}`}><Clock3 size={19} /></div>
            <div className={styles.statInfo}><span>Pending payments</span><strong>{String(pendingPayments.length).padStart(2, '0')}</strong><small>{money(dueAmount)} due</small></div>
          </article>
          <article className={styles.statCard}>
            <div className={`${styles.statIcon} ${styles.greenIcon}`}><Wallet size={19} /></div>
            <div className={styles.statInfo}><span>Today&apos;s revenue</span><strong>{money(todayRevenue)}</strong><small>Paid bills today</small></div>
          </article>
        </section>

        <section className={styles.ordersPanel}>
          <div className={styles.panelHeader}>
            <div><h3>Orders received from waiters</h3><p>Orders ready for billing and payment</p></div>
            <button className={styles.viewAllButton} onClick={() => navigate('/reception/orders')}>View all orders <ChevronRight size={17} /></button>
          </div>
          <div className={styles.tableScroll}>
            <table className={styles.ordersTable}>
              <thead><tr><th>Order ID</th><th>Table</th><th>Waiter</th><th>Items</th><th>Time</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead>
              <tbody>
                {filteredRecords.map((record) => (
                  <tr key={record.key}>
                    <td className={styles.orderId}>{record.orderId}</td>
                    <td><span className={styles.tableBadge}>{record.table || 'Take Away'}</span></td>
                    <td>{record.waiter}</td>
                    <td>{record.items} items</td>
                    <td>{new Date(record.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</td>
                    <td className={styles.amountCell}>{money(record.amount)}</td>
                    <td><span className={`${styles.statusBadge} ${record.status === 'Generated' ? styles.generatedStatus : styles.pendingStatus}`}><span />{record.status}</span></td>
                    <td><button className={`${styles.rowAction} ${record.status === 'Generated' ? styles.reviewAction : styles.generateAction}`} onClick={() => openRecord(record)}>{record.status === 'Generated' ? 'Review bill' : 'Generate bill'}</button></td>
                  </tr>
                ))}
                {!filteredRecords.length && <tr><td className={styles.emptyTable} colSpan="8">{search ? 'No orders match your search.' : 'No orders are waiting for billing yet.'}</td></tr>}
              </tbody>
            </table>
          </div>
        </section>

        <section className={styles.activityGrid}>
          <article className={styles.activityPanel}>
            <div className={styles.activityPanelHeader}>
              <div><h3>Recent payments</h3><p>Latest completed transactions</p></div>
              <button onClick={() => navigate('/reception/billing')}>Payment history</button>
            </div>
            <div className={styles.paymentList}>
              {recentPayments.map((bill) => {
                const PaymentIcon = bill.paymentMethod?.toLowerCase() === 'cash' ? Wallet : CreditCard;
                return (
                  <div className={styles.paymentRow} key={bill.id}>
                    <span className={styles.paymentIcon}><PaymentIcon size={19} /></span>
                    <div className={styles.paymentMain}><strong>#{bill.id}</strong><small>{bill.table || 'Take Away'} · {bill.paymentMethod || 'Cash'}</small></div>
                    <div className={styles.paymentAmount}><strong>{money(bill.grandTotal)}</strong><small>{new Date(bill.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</small></div>
                    <span className={styles.paidBadge}><span />Paid</span>
                  </div>
                );
              })}
              {!recentPayments.length && <div className={styles.activityEmpty}>Completed payments will appear here.</div>}
            </div>
          </article>

          <article className={styles.activityPanel}>
            <div className={styles.activityPanelHeader}><div><h3>Cashier activity</h3><p>Your latest actions</p></div></div>
            <div className={styles.timelineList}>
              {cashierActivity.map((activity) => (
                <div className={styles.timelineItem} key={activity.key}>
                  <span className={`${styles.timelineIcon} ${activity.type === 'bill' ? styles.timelineSuccess : ''}`}>
                    {activity.type === 'bill' || activity.type === 'completed' ? <Check size={16} /> : activity.type === 'payment' ? <Wallet size={15} /> : <Printer size={15} />}
                  </span>
                  <div className={styles.timelineCopy}><strong>{activity.title}</strong><small>{activity.detail}</small></div>
                  <time>{new Date(activity.time).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}</time>
                </div>
              ))}
              {!cashierActivity.length && <div className={styles.activityEmpty}>Your latest cashier actions will appear here.</div>}
            </div>
          </article>
        </section>
      </main>

      {selectedRecord && (
        <div className={styles.modalBackdrop} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelectedRecord(null); }}>
          <section className={styles.billModal} role="dialog" aria-modal="true" aria-labelledby="bill-modal-title">
            <div className={styles.modalHeader}><div><h2 id="bill-modal-title">{selectedBill ? 'Bill details' : 'Generate bill'}</h2><p>{selectedRecord.orderId} - {selectedRecord.table || 'Take Away'}</p></div><button onClick={() => setSelectedRecord(null)} aria-label="Close bill details"><X size={19} /></button></div>
            <div className={styles.modalItems}>
              {(selectedBill?.items || selectedOrder?.items || []).map((item, index) => <div key={`${item.name}-${index}`}><span>{item.quantity || 1} x {item.name}</span><strong>{money(item.price * (item.quantity || 1))}</strong></div>)}
            </div>
            <div className={styles.modalTotals}>
              <div><span>Subtotal</span><strong>{money(selectedSubtotal)}</strong></div>
              <div><span>Discount</span><strong>-{money(selectedDiscount)}</strong></div>
              <div><span>Tax</span><strong>{money(selectedTax)}</strong></div>
              <div><span>Service charge</span><strong>{money(selectedService)}</strong></div>
              <div className={styles.modalGrandTotal}><span>Total</span><strong>{money(selectedTotal)}</strong></div>
            </div>
            {selectedBill ? <div className={styles.paymentInfo}>Paid by {selectedBill.paymentMethod} on {new Date(selectedBill.time).toLocaleString()}</div> : <label className={styles.paymentSelect}>Payment method<select value={paymentMethod} onChange={(event) => setPaymentMethod(event.target.value)}><option>Cash</option><option>Card</option><option>Online</option></select></label>}
            {!selectedBill && <button className={styles.modalConfirm} onClick={handleGenerateBill}><Check size={16} /> Generate bill and mark paid</button>}
          </section>
        </div>
      )}
    </div>
  );
};

export default ReceptionDashboard;
