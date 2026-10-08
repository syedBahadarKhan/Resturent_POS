import sys
import re

filepath = r'e:\Saylani_Internship\ResturentPos\src\components\layout\Sidebar.jsx'
with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

if 'User,' not in content:
    content = content.replace('Utensils,', 'Utensils,\n  User,')

old_waiter_menu = '''const waiterMenuStructure = [
  {
    id: 'waiter',
    label: 'Waiter',
    headerLabel: 'Waiter App',
    icon: <Utensils size={16} />,
    subtitle: 'Order Management',
    path: '/waiter',
    subMenus: [
      {
        group: 'MAIN',
        items: [
          { path: '/waiter', label: 'Dashboard' },
          { path: '/waiter/new-order', label: 'New Order' },
          { path: '/waiter/my-orders', label: 'My Orders' }
        ]
      }
    ]
  }
];'''

new_waiter_menu = '''const waiterMenuStructure = [
  { id: 'waiter-dashboard', label: 'Dashboard', icon: <Grid size={22} />, path: '/waiter' },
  { id: 'new-order', label: 'New Order', icon: <ShoppingCart size={22} />, path: '/waiter/new-order' },
  { id: 'my-orders', label: 'Orders', icon: <ClipboardList size={22} />, path: '/waiter/my-orders' },
  { id: 'profile', label: 'Profile', icon: <User size={22} />, path: '/waiter/profile' }
];'''

content = content.replace(old_waiter_menu, new_waiter_menu)

content = content.replace("const isReceptionist = currentUser?.role === 'receptionist';", "const isSingleSidebar = currentUser?.role === 'receptionist' || currentUser?.role === 'waiter';")

content = content.replace("isReceptionist ?", "isSingleSidebar ?")
content = content.replace("isReceptionist &&", "isSingleSidebar &&")

content = content.replace("<strong>Riviera</strong>", "<strong>Mehfil</strong>")
content = content.replace("<div className={styles.receptionBrandMark}>R</div>", "<div className={styles.receptionBrandMark}><Utensils size={24} color=\"#fff\" /></div>")

# Replace "Cashier  Shift A" to handle waiter
content = re.sub(r'<span>Cashier(.*?)Shift', r'<span>{currentUser?.role === \'waiter\' ? \'Waiter\' : \'Cashier\'} · Shift', content)
content = re.sub(r'<span>Cashier.*?{shiftLabel}</span>', r'<span>{currentUser?.role === \'waiter\' ? \'Waiter\' : \'Cashier\'} · {shiftLabel}</span>', content)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)
print('Sidebar Updated')
