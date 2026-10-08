import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import WaiterDashboard from '../waiter/WaiterDashboard';
import KitchenDashboard from '../kitchen/KitchenDashboard';
import ReceptionDashboard from '../reception/ReceptionDashboard';
import styles from './ViewAsDashboard.module.css';

const ViewAsDashboard = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const users = useStore(state => state.users);
  const setViewingAsUser = useStore(state => state.setViewingAsUser);
  const clearViewingAsUser = useStore(state => state.clearViewingAsUser);

  const targetUser = users.find(u => u.id === userId);

  useEffect(() => {
    if (targetUser) {
      setViewingAsUser(userId);
    }
    return () => {
      clearViewingAsUser();
    };
  }, [userId, targetUser, setViewingAsUser, clearViewingAsUser]);

  if (!targetUser) {
    return (
      <div className={styles.errorContainer}>
        <h2>User not found</h2>
        <button onClick={() => navigate('/manager/staff')}>Back to Staff Management</button>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (targetUser.role) {
      case 'waiter':
        return <WaiterDashboard />;
      case 'kitchen':
        return <KitchenDashboard />;
      case 'receptionist':
        return <ReceptionDashboard />;
      default:
        return (
          <div className={styles.errorContainer}>
            <h2>Dashboard view not supported for role: {targetUser.role}</h2>
          </div>
        );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.userInfo}>
          <span className={styles.viewingAs}>Viewing as: <strong>{targetUser.name}</strong></span>
          <span className={styles.roleBadge}>Role: <span style={{textTransform: 'capitalize'}}>{targetUser.role}</span></span>
        </div>
        <button 
          className={styles.exitBtn}
          onClick={() => navigate('/manager/staff')}
        >
          Exit Dashboard View
        </button>
      </div>
      <div className={styles.dashboardContent}>
        {renderDashboard()}
      </div>
    </div>
  );
};

export default ViewAsDashboard;
