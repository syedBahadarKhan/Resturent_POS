import sys
import re

filepath = r'e:\Saylani_Internship\ResturentPos\src\pages\waiter\WaiterDashboard.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

if 'Users' not in content:
    content = content.replace('PlusCircle, Bell, Search, Clock, CheckCircle, Utensils', 'PlusCircle, Bell, Search, Clock, CheckCircle, Utensils, Users, FileText, ArrowRight')

new_content = """      <div className={styles.statusGrid}>
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
      </div>"""

# Find existing statusGrid and replace it.
old_status_grid = re.search(r'<div className=\{styles\.statusGrid\}>.*?(?=<div className=\{styles\.readyOrdersSection\})', content, re.DOTALL)

if old_status_grid:
    content = content.replace(old_status_grid.group(0), new_content + '\n\n      ')

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated WaiterDashboard.jsx')
