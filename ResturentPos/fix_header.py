import sys

filepath = r'e:\Saylani_Internship\ResturentPos\src\pages\waiter\WaiterDashboard.jsx'
with open(filepath, 'r', encoding='utf-8') as f:
    content = f.read()

# Make sure we import Bell and Search
if 'Bell' not in content:
    content = content.replace('PlusCircle,', 'PlusCircle, Bell, Search,')

header_logic = """  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const cashierName = currentUser?.name?.split(' (')[0] || 'Ali Khan';
  const firstName = cashierName.split(' ')[0];
  const cashierInitials = cashierName.split(' ').filter(bool).map(lambda x: x[0]).join('').slice(0, 2).toUpperCase();
"""
# wait, wait, the `lambda` is python code inside JSX? NO. I need to write javascript!
header_logic_js = """  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const cashierName = currentUser?.name?.split(' (')[0] || 'Ali Khan';
  const firstName = cashierName.split(' ')[0];
  const cashierInitials = cashierName.split(' ').filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase();
"""

if 'const getGreeting' not in content:
    content = content.replace('  const activeWaiterId = ', header_logic_js + '\n  const activeWaiterId = ')

old_header = """      <div className={styles.header}>
        <div>
          <h1>Waiter Dashboard</h1>
          <p className="text-muted">Manage your tables and orders efficiently.</p>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {currentUser.role === 'manager' && !viewingAsUserId && (
            <select 
              value={selectedWaiterId} 
              onChange={(e) => setSelectedWaiterId(e.target.value)}
              style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}
            >
              {waiters.map(w => <option key={w.id} value={w.id}>{w.name}'s Dashboard</option>)}
            </select>
          )}
          <button 
            className={styles.newOrderBtn}
            onClick={() => navigate('/waiter/new-order')}
          >
            <PlusCircle size={20} />
            <span>New Order</span>
          </button>
        </div>
      </div>"""

new_header = """      <div className={styles.header}>
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
      </div>"""

content = content.replace(old_header, new_header)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated WaiterDashboard.jsx')
