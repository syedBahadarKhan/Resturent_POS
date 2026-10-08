import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Bell, Search, Clock, CheckCircle, Utensils, Users, FileText, ArrowRight, ChevronRight } from 'lucide-react';
import useStore from '../../store/useStore';
import styles from './WaiterDashboard.module.css';

const WaiterDashboard = () => {
  const navigate = useNavigate();
  const orders = useStore(state => state.orders);
  const tables = useStore(state => state.tables);
  const users = useStore(state => state.users);
  const currentUser = useStore(state => state.currentUser);
  const viewingAsUserId = useStore(state => state.viewingAsUserId);
  
  const waiters = users.filter(u => u.role === 'waiter');
  const [selectedWaiterId, setSelectedWaiterId] = useState('');

  useEffect(() => {
    if (currentUser.role === 'manager' && !selectedWaiterId && waiters.length > 0 && !viewingAsUserId) {
      setSelectedWaiterId(waiters[0].id);
    }
  }, [currentUser, waiters, selectedWaiterId, viewingAsUserId]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const cashierName = currentUser?.name?.split(' (')[0] || 'Ali Khan';
  const firstName = cashierName.split(' ')[0];
  const cashierInitials = cashierName.split(' ').filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase();

  const activeWaiterId = viewingAsUserId || (currentUser.role === 'manager' ? selectedWaiterId : currentUser.id);
  
  // Waiter's own orders
  const myOrders = orders.filter(o => o.waiterId === activeWaiterId);
  const pendingOrders = myOrders.filter(o => o.status === 'NEW' || o.status === 'PREPARING');
  const readyOrders = myOrders.filter(o => o.status === 'READY');
  const deliveredOrders = myOrders.filter(o => o.status === 'DELIVERED');

  const updateOrderStatus = useStore(state => state.updateOrderStatus);

  const markDelivered = (orderId) => {
    updateOrderStatus(orderId, 'DELIVERED');
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>{getGreeting()}, {firstName}</h1>
          <p>Here's what needs your attention right now.</p>
        </div>
        
        <div className={styles.headerRight}>
          {currentUser.role === 'manager' && !viewingAsUserId && (
            <select 
              value={selectedWaiterId} 
              onChange={(e) => setSelectedWaiterId(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
            >
              {waiters.map(w => <option key={w.id} value={w.id}>{w.name}'s Dashboard</option>)}
            </select>
          )}
          
          <div className={styles.searchWrapper}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search orders, tables..." 
              className={styles.searchInput} 
            />
          </div>
          
          <div className={styles.notificationWrapper}>
            <Bell size={20} />
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

      <div className={styles.contentWrapper}>
            <div className={styles.statusGrid}>
        <div className={styles.metricCard}>
          <div className={styles.metricIconBox} style={{ backgroundColor: '#f1f5f9' }}>
            <Users size={20} color="#475569" />
          </div>
          <div className={styles.metricData}>
            <span className={styles.metricTitle}>My Active Tables</span>
            <span className={styles.metricValue}>06</span>
            <span className={styles.metricSub}>2 available now</span>
          </div>
        </div>
        
        <div className={styles.metricCard}>
          <div className={styles.metricIconBox} style={{ backgroundColor: '#f0f9ff' }}>
            <FileText size={20} color="#0284c7" />
          </div>
          <div className={styles.metricData}>
            <span className={styles.metricTitle}>Active Orders</span>
            <span className={styles.metricValue}>08</span>
            <span className={styles.metricSub}>Across 6 tables</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIconBox} style={{ backgroundColor: '#fff7ed' }}>
            <Clock size={20} color="#d97706" />
          </div>
          <div className={styles.metricData}>
            <span className={styles.metricTitle}>Preparing</span>
            <span className={styles.metricValue}>04</span>
            <span className={styles.metricSub}>Avg. 18 minutes</span>
          </div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricIconBox} style={{ backgroundColor: '#f0fdf4' }}>
            <CheckCircle size={20} color="#16a34a" />
          </div>
          <div className={styles.metricData}>
            <span className={styles.metricTitle}>Ready to Serve</span>
            <span className={styles.metricValue}>02</span>
            <span className={styles.metricSub}>Serve promptly</span>
          </div>
        </div>
      </div>

      <div className={styles.alertBanner}>
        <div className={styles.alertIconBox}>
          <Bell size={20} color="#16a34a" />
        </div>
        <div className={styles.alertContent}>
          <span className={styles.alertLabel}>READY TO SERVE</span>
          <h3 className={styles.alertTitle}>2 orders are waiting at the kitchen pass</h3>
          <p className={styles.alertSub}>Order #ORD-1050 · Table T-12 has been ready for 2 minutes.</p>
        </div>
        <button className={styles.alertBtn}>
          View ready orders
          <ArrowRight size={18} />
        </button>
      </div>

      
      <div className={styles.tablesSection}>
        <div className={styles.tablesHeader}>
          <div>
            <h2>Restaurant Tables</h2>
            <p className={styles.tablesSubtext}>Your assigned floor · Main dining area</p>
          </div>
          <div className={styles.tablesLegend}>
            <span className={styles.legendItem}><span className={styles.dotAvailable}></span> Available</span>
            <span className={styles.legendItem}><span className={styles.dotInService}></span> In service</span>
            <span className={styles.legendItem}><span className={styles.dotReady}></span> Ready</span>
          </div>
        </div>

        <div className={styles.tablesGrid}>
          {tables.slice(0, 8).map(table => {
            const activeOrder = orders.find(o => o.table === table.number && o.status !== 'DELIVERED' && o.status !== 'PAID');
            
            let status = 'Available';
            let statusClass = styles.tableAvailable;
            let dotClass = styles.dotAvailable;
            let actionText = 'Start order';
            let customerName = 'Ready for guests';
            let orderDetails = 'Tap to start an order';
            let seats = 4; // Mock data
            
            if (activeOrder) {
              actionText = 'Open table';
              customerName = activeOrder.customerName || 'Walk-in Customer';
              const itemsCount = activeOrder.items ? activeOrder.items.reduce((acc, item) => acc + item.quantity, 0) : 0;
              orderDetails = `#${activeOrder.id.replace('ORD-', '')} · ${itemsCount} items`;
              
              if (activeOrder.status === 'READY') {
                status = 'Ready to Serve';
                statusClass = styles.tableReady;
                dotClass = styles.dotReady;
              } else if (activeOrder.status === 'PREPARING') {
                status = 'Preparing';
                statusClass = styles.tablePreparing;
                dotClass = styles.dotPreparing;
              } else {
                status = 'Occupied';
                statusClass = styles.tableOccupied;
                dotClass = styles.dotOccupied;
              }
            }

            return (
              <div key={table.id} className={`${styles.tableCard} ${statusClass}`}>
                <div className={styles.cardTop}>
                  <div className={styles.tableInfo}>
                    <span className={styles.tableLabelText}>TABLE</span>
                    <span className={styles.tableNumber}>{table.number.replace('T', 'T-')}</span>
                  </div>
                  <div className={styles.statusBadge}>
                    <span className={dotClass}></span>
                    {status}
                  </div>
                </div>
                
                <div className={styles.seatsInfo}>
                  <Users size={16} />
                  <span>{seats} seats</span>
                </div>
                
                <div className={styles.customerInfo}>
                  <span className={styles.customerName}>{customerName}</span>
                  <span className={styles.orderDetailsText}>{orderDetails}</span>
                </div>
                
                <button className={styles.cardActionBtn}>
                  {actionText}
                  <ChevronRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
</div>
    </div>
  );
};

export default WaiterDashboard;
