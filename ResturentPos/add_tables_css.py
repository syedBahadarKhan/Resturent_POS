import sys

filepath = r'e:\Saylani_Internship\ResturentPos\src\pages\waiter\WaiterDashboard.module.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

tables_css = """
/* Tables Section */
.tablesSection {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.tablesHeader {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.tablesHeader h2 {
  font-size: 20px;
  font-weight: 500;
  color: #1e293b;
  margin: 0 0 6px 0;
}

.tablesSubtext {
  font-size: 14px;
  color: #64748b;
  margin: 0;
}

.tablesLegend {
  display: flex;
  gap: 20px;
  align-items: center;
  padding-bottom: 6px;
}

.legendItem {
  font-size: 13px;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
}

.dotAvailable { width: 8px; height: 8px; border-radius: 50%; background-color: #cbd5e1; }
.dotInService { width: 8px; height: 8px; border-radius: 50%; background-color: #f97316; }
.dotReady { width: 8px; height: 8px; border-radius: 50%; background-color: #16a34a; }
.dotOccupied { width: 8px; height: 8px; border-radius: 50%; background-color: #64748b; }

.tablesGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.tableCard {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-top-width: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.tableAvailable { border-top-color: #cbd5e1; }
.tableOccupied { border-top-color: #e2e8f0; } /* Standard gray for occupied */
.tablePreparing { border-top-color: #fb923c; }
.tableReady { border-top-color: #22c55e; }

.cardTop {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.tableInfo {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tableLabelText {
  font-size: 11px;
  font-weight: 700;
  color: #94a3b8;
  letter-spacing: 0.5px;
}

.tableNumber {
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1;
}

.statusBadge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.tableAvailable .statusBadge { background: #f1f5f9; color: #475569; }
.tableOccupied .statusBadge { background: #f1f5f9; color: #475569; }
.tablePreparing .statusBadge { background: #fff7ed; color: #c2410c; }
.tableReady .statusBadge { background: #f0fdf4; color: #15803d; }

.seatsInfo {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #94a3b8;
  font-size: 13px;
  margin-top: 4px;
}

.customerInfo {
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: auto;
  padding-top: 16px;
}

.customerName {
  font-size: 15px;
  font-weight: 700;
  color: #1e293b;
}

.orderDetailsText {
  font-size: 13px;
  color: #64748b;
}

.cardActionBtn {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #16a34a;
  font-size: 14px;
  font-weight: 600;
  padding-top: 16px;
  margin-top: 4px;
  border-top: 1px solid #f1f5f9;
}

.cardActionBtn:hover {
  color: #15803d;
}
"""

content = content + "\n" + tables_css

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated WaiterDashboard.module.css')
