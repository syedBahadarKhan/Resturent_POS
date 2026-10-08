import React from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
import styles from './Departments.module.css';

const Departments = () => {
  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Departments</h1>
          <p>1 departments</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.addBtn}>
            <Plus size={16} /> Add Department
          </button>
        </div>
      </div>

      {/* CARDS GRID */}
      <div className={styles.cardsGrid}>
        <div className={styles.deptCard}>
          <div className={styles.cardTop}>
            <div className={styles.titleRow}>
              <h3>finanace</h3>
              <button className={styles.deleteBtn}>
                <Trash2 size={14} />
              </button>
            </div>
            <div className={styles.badge}>77</div>
            <p className={styles.description}>
              this is the finance deortme
            </p>
          </div>
          <div className={styles.cardFooter}>
            <Users size={14} />
            <span>0 employees</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
