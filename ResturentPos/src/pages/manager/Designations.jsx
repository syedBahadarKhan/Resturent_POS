import React from 'react';
import { Plus, Edit2, Trash2, Users, ChevronDown } from 'lucide-react';
import styles from './Designations.module.css';

const Designations = () => {
  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Designations</h1>
          <p>1 designations</p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.addBtn}>
            <Plus size={16} /> Add Designation
          </button>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className={styles.filterBar}>
        <div className={styles.selectBox}>
          <span>All Departments</span>
          <ChevronDown size={14} />
        </div>
      </div>

      {/* CARDS GRID */}
      <div className={styles.cardsGrid}>
        <div className={styles.designationCard}>
          <div className={styles.cardTop}>
            <div className={styles.titleRow}>
              <h3>kahn</h3>
              <div className={styles.actionBtns}>
                <button className={styles.iconBtn}>
                  <Edit2 size={14} />
                </button>
                <button className={styles.iconBtn}>
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            
            <div className={styles.badgesRow}>
              <span className={styles.badgeGray}>33</span>
              <span className={styles.badgeOrange}>Grade 45</span>
            </div>
            
            <p className={styles.departmentText}>
              Dept: finanace
            </p>
          </div>
          <div className={styles.cardFooter}>
            <Users size={14} />
            <span>0 staff</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Designations;
