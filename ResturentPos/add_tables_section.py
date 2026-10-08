import sys
import re

filepath = r'e:\Saylani_Internship\ResturentPos\src\pages\waiter\WaiterDashboard.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Add ChevronRight icon import
if 'ChevronRight' not in content:
    content = content.replace('ArrowRight', 'ArrowRight, ChevronRight')

# Add `tables` to state selection
if 'const tables = useStore(state => state.tables);' not in content:
    content = content.replace('const orders = useStore(state => state.orders);', 'const orders = useStore(state => state.orders);\n  const tables = useStore(state => state.tables);')

tables_section = """
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
"""

# Replace existing sections (readyOrdersSection, preparingSection) with the tables section.
# We'll use re.sub to remove the ready/preparing sections.
old_sections = re.search(r'<div className=\{styles\.readyOrdersSection\}>.*?(?=</div>\s*</div>\s*\);\s*};)', content, re.DOTALL)

if old_sections:
    content = content.replace(old_sections.group(0), tables_section)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated WaiterDashboard.jsx')
