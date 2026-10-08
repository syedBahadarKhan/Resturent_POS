import sys

filepath = r'e:\Saylani_Internship\ResturentPos\src\pages\waiter\WaiterDashboard.module.css'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

new_css = """
.statusGrid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.metricCard {
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.02);
}

.metricIconBox {
  width: 54px;
  height: 54px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.metricData {
  display: flex;
  flex-direction: column;
}

.metricTitle {
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  margin-bottom: 2px;
}

.metricValue {
  font-size: 28px;
  font-weight: 700;
  color: #0f172a;
  line-height: 1.1;
  margin-bottom: 4px;
}

.metricSub {
  font-size: 12px;
  color: #94a3b8;
}

.alertBanner {
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  border-left: 4px solid #16a34a;
  border-radius: 8px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.alertIconBox {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: #dcfce7;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.alertContent {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.alertLabel {
  font-size: 11px;
  font-weight: 800;
  color: #15803d;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.alertTitle {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b;
  margin: 0 0 4px 0;
}

.alertSub {
  font-size: 13px;
  color: #64748b;
  margin: 0;
}

.alertBtn {
  background-color: #16a34a;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 10px 16px;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.alertBtn:hover {
  background-color: #15803d;
}
"""

import re
# We'll replace existing .statusGrid and .statusBox related CSS
content = re.sub(r'\.statusGrid\s*\{.*?(?=\.readyOrdersSection)', new_css, content, flags=re.DOTALL)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated WaiterDashboard.module.css')
