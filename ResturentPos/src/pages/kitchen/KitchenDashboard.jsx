import React from 'react';
import useStore from '../../store/useStore';
import styles from './KitchenDashboard.module.css';
import { Clock, Play, Check } from 'lucide-react';

const KitchenDashboard = () => {
  const orders = useStore(state => state.orders);
  const currentUser = useStore(state => state.currentUser);
  const viewingAsUserId = useStore(state => state.viewingAsUserId);
  const updateOrderStatus = useStore(state => state.updateOrderStatus);

  const activeKitchenId = viewingAsUserId || currentUser.id;

  // Filter orders for the kitchen
  const kitchenOrders = orders.filter(o => ['NEW', 'PREPARING', 'READY'].includes(o.status));
  
  const newOrders = kitchenOrders.filter(o => o.status === 'NEW');
  const preparingOrders = kitchenOrders.filter(o => o.status === 'PREPARING' && (!viewingAsUserId || o.kitchenId === activeKitchenId));
  const readyOrders = kitchenOrders.filter(o => o.status === 'READY');

  const handleStartPreparing = (id) => updateOrderStatus(id, 'PREPARING');
  const handleMarkReady = (id) => updateOrderStatus(id, 'READY');

  const renderOrderCard = (order, actions) => (
    <div key={order.id} className={styles.orderCard}>
      <div className={styles.orderHeader}>
        <div>
          <div className={styles.orderId}>{order.id}</div>
          <div className={styles.waiterName}>Waiter: {order.waiterName}</div>
        </div>
        <div className={styles.tableBadge}>{order.table}</div>
      </div>
      
      <div className={styles.orderTime}>
        <Clock size={14} />
        {new Date(order.time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
      </div>

      <div className={styles.itemsList}>
        {order.items.map((item, idx) => (
          <div key={idx} className={styles.itemRow}>
            <span className={styles.itemQty}>{item.quantity}x</span>
            <span className={styles.itemName}>{item.name}</span>
          </div>
        ))}
      </div>

      {order.notes && (
        <div className={styles.specialNotes}>
          <strong>Note:</strong> {order.notes}
        </div>
      )}

      <div className={styles.actions}>
        {actions}
      </div>
    </div>
  );

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Kitchen Display System (KDS)</h1>
        <p className="text-muted">Real-time order management.</p>
      </div>

      <div className={styles.kanbanBoard}>
        {/* NEW COLUMN */}
        <div className={styles.column}>
          <div className={`${styles.columnHeader} ${styles.headerNew}`}>
            <h2>NEW ({newOrders.length})</h2>
          </div>
          <div className={styles.columnBody}>
            {newOrders.map(order => renderOrderCard(order, (
              <button 
                className={styles.startBtn}
                onClick={() => handleStartPreparing(order.id)}
              >
                <Play size={16} /> Start Preparing
              </button>
            )))}
          </div>
        </div>

        {/* PREPARING COLUMN */}
        <div className={styles.column}>
          <div className={`${styles.columnHeader} ${styles.headerPreparing}`}>
            <h2>PREPARING ({preparingOrders.length})</h2>
          </div>
          <div className={styles.columnBody}>
            {preparingOrders.map(order => renderOrderCard(order, (
              <button 
                className={styles.readyBtn}
                onClick={() => handleMarkReady(order.id)}
              >
                <Check size={16} /> Mark Ready
              </button>
            )))}
          </div>
        </div>

        {/* READY COLUMN */}
        <div className={styles.column}>
          <div className={`${styles.columnHeader} ${styles.headerReady}`}>
            <h2>READY ({readyOrders.length})</h2>
          </div>
          <div className={styles.columnBody}>
            {readyOrders.map(order => renderOrderCard(order, (
              <div className={styles.waitingForWaiter}>
                Waiting for waiter to deliver...
              </div>
            )))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenDashboard;
