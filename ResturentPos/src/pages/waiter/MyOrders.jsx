import React, { useState } from 'react';
import { Search, ChevronRight, Bell } from 'lucide-react';
import useStore from '../../store/useStore';
import styles from './MyOrders.module.css';

const MyOrders = () => {
  const orders = useStore(state => state.orders);
  const currentUser = useStore(state => state.currentUser);
  
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');

  // Extract Waiter details
  const cashierName = currentUser?.name?.split(' (')[0] || 'Ali Khan';
  const cashierInitials = cashierName.split(' ').filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase();

  // Depending on whether it's manager or waiter, filter appropriately
  const myOrders = orders.filter(o => o.waiterId === currentUser.id);

  const activeOrdersCount = myOrders.filter(o => o.status !== 'PAID' && o.status !== 'DELIVERED').length;
  const readyOrdersCount = myOrders.filter(o => o.status === 'READY').length;
  
  const sentCount = myOrders.filter(o => o.status === 'NEW').length;
  const preparingCount = myOrders.filter(o => o.status === 'PREPARING').length;

  const tabs = ['All', 'New', 'Preparing', 'Ready', 'Served', 'Completed', 'Cancelled'];

  const filteredOrders = myOrders.filter(order => {
    // Tab filter
    let matchesTab = false;
    if (activeTab === 'All') matchesTab = true;
    else if (activeTab === 'New') matchesTab = order.status === 'NEW';
    else if (activeTab === 'Preparing') matchesTab = order.status === 'PREPARING';
    else if (activeTab === 'Ready') matchesTab = order.status === 'READY';
    else if (activeTab === 'Served') matchesTab = order.status === 'DELIVERED';
    else if (activeTab === 'Completed') matchesTab = order.status === 'PAID';
    else if (activeTab === 'Cancelled') matchesTab = order.status === 'CANCELLED';

    // Search filter
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.table.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (order.customerName && order.customerName.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  const getStatusStyles = (status) => {
    switch(status) {
      case 'NEW': return { pill: styles.statusSent, dot: styles.dotBlue, text: 'Sent' };
      case 'PREPARING': return { pill: styles.statusPreparing, dot: styles.dotOrange, text: 'Preparing' };
      case 'READY': return { pill: styles.statusReady, dot: styles.dotGreen, text: 'Ready' };
      case 'DELIVERED': return { pill: styles.statusSent, dot: styles.dotBlue, text: 'Served' };
      case 'PAID': return { pill: styles.statusReady, dot: styles.dotGreen, text: 'Completed' };
      default: return { pill: styles.statusSent, dot: styles.dotBlue, text: status };
    }
  };

  const formatTime = (dateString) => {
    if (!dateString) return '2:35 PM';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={styles.pageWrapper}>
      
      {/* TOPBAR */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <h1>My Orders</h1>
          <p>Track every order you've created</p>
        </div>
        
        <div className={styles.topBarRight}>
          <div className={styles.globalSearchBar}>
            <Search size={16} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search orders, tables..." 
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
            />
          </div>
          
          <div className={styles.notificationWrapper}>
            <Bell size={20} color="#4b5563" />
            <span className={styles.badge}>3</span>
          </div>
          
          <div className={styles.profileSection}>
            <div className={styles.avatar}>{cashierInitials}</div>
            <div className={styles.profileDetails}>
              <span className={styles.profileName}>{cashierName}</span>
              <span className={styles.profileRole}>Waiter</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.metricsCard}>
        <div className={styles.metricBox}>
          <div className={styles.metricBoxTitle}>ACTIVE NOW</div>
          <div className={styles.metricValue}>{activeOrdersCount}</div>
          <div className={styles.metricSubtext}>orders across tables</div>
        </div>
        
        <div className={styles.metricBox}>
          <div className={styles.metricBoxTitle}>NEED ATTENTION</div>
          <div className={`${styles.metricValue} ${styles.metricValueOrange}`}>{readyOrdersCount}</div>
          <div className={styles.metricSubtext}>ready to serve</div>
        </div>
        
        <div className={styles.flowBox}>
          <div className={styles.flowTitle}>Live order flow</div>
          <div className={styles.flowDots}>
            <div className={styles.flowItem}>
              <div className={styles.dotBlue}></div>
              {sentCount} Sent
            </div>
            <div className={styles.flowItem}>
              <div className={styles.dotOrange}></div>
              {preparingCount} Preparing
            </div>
            <div className={styles.flowItem}>
              <div className={styles.dotGreen}></div>
              {readyOrdersCount} Ready
            </div>
          </div>
        </div>
      </div>

      <div className={styles.mainCard}>
        <div className={styles.filtersHeader}>
          <div className={styles.tabs}>
            {tabs.map(tab => (
              <button 
                key={tab}
                className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                {tab === 'Ready' && readyOrdersCount > 0 && (
                  <span className={styles.tabBadge}>{readyOrdersCount}</span>
                )}
              </button>
            ))}
          </div>
          
          <div className={styles.searchBar}>
            <Search size={16} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search order or table..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>ORDER</th>
              <th>TABLE & CUSTOMER</th>
              <th>ITEMS</th>
              <th>TIME</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => {
              const statusDisplay = getStatusStyles(order.status);
              const itemsCount = order.items ? order.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
              
              return (
                <tr key={order.id}>
                  <td>
                    <div className={styles.orderIdBox}>
                      <span className={styles.orderId}>{order.id}</span>
                      <span className={styles.orderDate}>Today</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.customerBox}>
                      <span className={styles.tableNo}>Table {order.table.replace('T', 'T-')}</span>
                      <span className={styles.customerName}>{order.customerName || 'Walk-in'}</span>
                    </div>
                  </td>
                  <td>
                    <span className={styles.itemsCount}>{itemsCount} items</span>
                  </td>
                  <td>
                    <span className={styles.timeText}>{formatTime(order.createdAt)}</span>
                  </td>
                  <td>
                    <div className={`${styles.statusPill} ${statusDisplay.pill}`}>
                      <div className={statusDisplay.dot}></div>
                      {statusDisplay.text}
                    </div>
                  </td>
                  <td>
                    <button className={styles.viewOrderBtn}>
                      View order <ChevronRight size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
            
            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

export default MyOrders;
