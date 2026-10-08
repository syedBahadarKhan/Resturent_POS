import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingCart,
  Grid,
  ClipboardList,
  CreditCard,
  ChevronRight,
  MoreHorizontal,
  MenuSquare,
  Users,
  Package,
  Receipt,
  BarChart3,
  LogOut,
  Utensils,
  User,
  X,
  Settings,
  ChevronDown,
  Coffee,
  DollarSign,
  ChefHat
} from 'lucide-react';
import useStore from '../../store/useStore';
import styles from './Sidebar.module.css';

const menuStructure = [
  {
    id: 'home',
    label: 'Home',
    headerLabel: 'Dashboard',
    icon: <Grid size={16} />,
    subtitle: 'Holidays',
    path: '/manager',
    subMenus: []
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: <DollarSign size={16} />,
    subtitle: 'Holidays',
    path: '/manager/billing',
    subMenus: [
      {
        group: 'OVERVIEW',
        items: [
          { path: '/manager/billing', label: 'Dashboard' }
        ]
      },
      {
        group: 'RECEIVABLES',
        items: [
          { path: '/manager/billing/sales', label: 'Sales Invoices' },
          { path: '/manager/billing/receipts', label: 'Receipts' }
        ]
      },
      {
        group: 'PAYABLES',
        items: [
          { path: '/manager/billing/expenses', label: 'Expenses' }
        ]
      },
      {
        group: 'REPORTS',
        items: [
          { path: '/manager/billing/reports', label: 'Financial Reports' }
        ]
      }
    ]
  },
  {
    id: 'hr',
    label: 'HR',
    headerLabel: 'Human Resources',
    subtitle: 'Holidays',
    icon: <Users size={16} />,
    path: '/manager/hr/dashboard',
    subMenus: [
      {
        group: 'OVERVIEW',
        items: [
          { path: '/manager/hr/dashboard', label: 'HR Dashboard' }
        ]
      },
      {
        group: 'PEOPLE',
        items: [
          { path: '/manager/staff', label: 'Employees' },
          { path: '/manager/hr/departments', label: 'Departments' },
          { path: '/manager/hr/designations', label: 'Designations' }
        ]
      },
      {
        group: 'TIME',
        items: [
          { path: '/manager/hr/attendance', label: 'Attendance' },
          { path: '/manager/hr/leave', label: 'Leave' }
        ]
      },
      {
        group: 'PAYROLL',
        items: [
          { path: '/manager/hr/payroll', label: 'Payroll' },
          { path: '/manager/hr/loans', label: 'Loans' }
        ]
      }
    ]
  },
  {
    id: 'stock',
    label: 'Stock',
    headerLabel: 'Inventory',
    subtitle: 'Holidays',
    icon: <Package size={16} />,
    path: '/manager/inventory',
    subMenus: [
      {
        group: 'OVERVIEW',
        items: [
          { path: '/manager/inventory', label: 'Dashboard' }
        ]
      },
      {
        group: 'MASTER DATA',
        items: [
          { path: '/manager/inventory/products', label: 'Products' },
          { path: '/manager/inventory/categories', label: 'Categories' },
          { path: '/manager/inventory/warehouses', label: 'Warehouses' },
          { path: '/manager/inventory/units', label: 'Units of Measure' },
          { path: '/manager/inventory/pricelists', label: 'Price Lists' }
        ]
      },
      {
        group: 'MONITORING',
        items: [
          { path: '/manager/inventory/low-stock', label: 'Low Stock Alerts' }
        ]
      }
    ]
  },
  {
    id: 'restaurant',
    label: 'Restaurant',
    headerLabel: 'Restaurant',
    subtitle: 'Holidays',
    icon: <Coffee size={16} />,
    path: '/manager/restaurant/dashboard',
    subMenus: [
      {
        group: '',
        items: [
          { path: '/manager/restaurant/dashboard', label: 'Dashboard' },
          { path: '/manager/tables', label: 'Tables' },
          { path: '/manager/orders', label: 'Orders / POS' },
          { path: '/manager/kitchen-display', label: 'Kitchen Display' },
          { path: '/manager/menu', label: 'Menu Builder' },
          { path: '/manager/reservations', label: 'Reservations' },
          { path: '/manager/restaurant/reports', label: 'Reports' },
          { path: '/manager/restaurant/settings', label: 'Settings' },
          { path: '/manager/ai-assistant', label: 'AI Assistant' }
        ]
      }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <BarChart3 size={24} />,
    path: '/manager/reports',
    subMenus: [
      {
        group: 'ANALYTICS',
        items: [
          { path: '/manager/reports', label: 'All Reports' }
        ]
      }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings size={24} />,
    path: '/manager/settings',
    subMenus: [
      {
        group: 'SYSTEM',
        items: [
          { path: '/manager/settings', label: 'General Settings' }
        ]
      }
    ]
  }
];

const receptionistMenuStructure = [
  { id: 'reception-dashboard', label: 'Dashboard', icon: <Grid size={18} />, path: '/reception' },
  { id: 'orders', label: 'Orders', icon: <ClipboardList size={18} />, path: '/reception/orders' },
  { id: 'bills', label: 'Bills & Payments', icon: <CreditCard size={18} />, path: '/reception/billing' },
  { id: 'receipts', label: 'Receipts', icon: <Receipt size={18} />, path: '/reception/receipts' }
];

const waiterMenuStructure = [
  { id: 'waiter-dashboard', label: 'Dashboard', icon: <Grid size={22} />, path: '/waiter' },
  { id: 'new-order', label: 'New Order', icon: <ShoppingCart size={22} />, path: '/waiter/new-order' },
  { id: 'my-orders', label: 'Orders', icon: <ClipboardList size={22} />, path: '/waiter/my-orders' },
  { id: 'profile', label: 'Profile', icon: <User size={22} />, path: '/waiter/profile' }
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const currentUser = useStore((state) => state.currentUser);
  const logout = useStore((state) => state.logout);
  const navigate = useNavigate();
  const location = useLocation();

  const isWaiterContext = currentUser?.role === 'waiter' || location.pathname.startsWith('/waiter');
  const isReceptionContext = currentUser?.role === 'receptionist' || location.pathname.startsWith('/reception');

  const [activePrimary, setActivePrimary] = useState(() => {
    if (isReceptionContext) return 'reception-dashboard';
    if (isWaiterContext) return 'waiter';
    return 'finance';
  });
  const visibleMenus = isReceptionContext ? receptionistMenuStructure : 
                       isWaiterContext ? waiterMenuStructure : 
                       menuStructure;
  const [expandedGroups, setExpandedGroups] = useState({
    OVERVIEW: true, RECEIVABLES: true, PAYABLES: true, PEOPLE: true, TIME: true, PAYROLL: true,
    INVENTORY: true, OPERATIONS: true, ANALYTICS: true, SYSTEM: true, REPORTS: true, 'MASTER DATA': true,
    TRACKING: true, MONITORING: true
  });

  useEffect(() => {
    if (isReceptionContext) {
      setActivePrimary(receptionistMenuStructure.find(item => location.pathname === item.path)?.id || 'reception-dashboard');
      return;
    }
    if (isWaiterContext) {
      setActivePrimary(waiterMenuStructure.find(item => location.pathname === item.path)?.id || 'waiter');
      return;
    }
    if (currentUser?.role === 'waiter') {
      setActivePrimary('waiter');
      return;
    }
    if (location.pathname.includes('/staff') || location.pathname.includes('/hr')) setActivePrimary('hr');
    else if (location.pathname.includes('/inventory')) setActivePrimary('stock');
    else if (location.pathname.includes('/billing')) setActivePrimary('finance');
    else if (location.pathname.includes('/restaurant/') || location.pathname.includes('/orders') || location.pathname.includes('/tables') || location.pathname.includes('/kitchen-display') || location.pathname.includes('/menu') || location.pathname.includes('/reservations') || location.pathname.includes('/ai-assistant')) setActivePrimary('restaurant');
    else if (location.pathname.includes('/reports')) setActivePrimary('reports');
    else if (location.pathname.includes('/settings')) setActivePrimary('settings');
    else setActivePrimary('home');
  }, [location.pathname, currentUser?.role]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({ ...prev, [group]: !prev[group] }));
  };

  const activeMenu = visibleMenus.find(m => m.id === activePrimary) || visibleMenus[0];
  const isSingleSidebar = isReceptionContext || isWaiterContext;
  const cashierName = currentUser?.name?.split(' (')[0] || 'Reception';
  const cashierInitials = cashierName.split(' ').filter(Boolean).map(part => part[0]).join('').slice(0, 2).toUpperCase();
  const shiftLabel = currentUser?.shift === 'morning' ? 'Shift A' : currentUser?.shift === 'evening' ? 'Shift B' : currentUser?.shift === 'night' ? 'Shift C' : 'On shift';

  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={() => setIsOpen(false)} />}

      <aside className={`${styles.sidebarWrapper} ${isOpen ? styles.open : styles.closed} ${isSingleSidebar ? styles.receptionistSidebar : ''}`}>
        {/* PRIMARY SIDEBAR */}
        <div className={styles.primarySidebar}>
          {isSingleSidebar ? (
            <div className={styles.receptionBrand}>
              <div className={styles.receptionBrandMark}><Utensils size={24} color="#fff" /></div>
              <div className={styles.receptionBrandText}>
                <strong>Mehfil</strong>
                <span>Restaurant POS</span>
              </div>
            </div>
          ) : (
            <div className={styles.primaryLogo}>
              <div className={styles.logoImg}>
                <ChefHat size={20} color="#10b981" />
              </div>
            </div>
          )}

          <div className={styles.primaryNav}>
            {visibleMenus.map(item => (
              <button
                key={item.id}
                className={`${styles.primaryTab} ${activePrimary === item.id ? styles.primaryTabActive : ''}`}
                onClick={() => {
                  setActivePrimary(item.id);
                  if (item.path) {
                    navigate(item.path);
                    if (window.innerWidth <= 1024) setIsOpen(false);
                  }
                }}
              >
                <div className={styles.primaryIcon}>{item.icon}</div>
                <span>{item.label}</span>
                {isSingleSidebar && activePrimary === item.id && <ChevronRight size={17} className={styles.receptionNavChevron} />}
              </button>
            ))}
          </div>

          {isSingleSidebar ? (
            <div className={styles.receptionistFooter}>
              <div className={styles.receptionistProfile}>
                <div className={styles.receptionistAvatar}>{cashierInitials}</div>
                <div className={styles.receptionistIdentity}>
                  <strong>{cashierName}</strong>
                  <span>{currentUser?.role === 'waiter' ? 'Waiter' : 'Cashier'} · {shiftLabel}</span>
                </div>
                <button className={styles.profileOptions} onClick={() => navigate('/reception/settings')} aria-label="Profile options">
                  <MoreHorizontal size={19} />
                </button>
              </div>
              <button className={styles.receptionistLogout} onClick={handleLogout}>
                <LogOut size={18} /><span>Log out</span>
              </button>
            </div>
          ) : (
            <div className={styles.primaryBottom}>
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Bahadar" className={styles.avatarMini} alt="Profile" />
            </div>
          )}
        </div>

        {/* SECONDARY SIDEBAR */}
        <div className={styles.secondarySidebar}>
          <div className={styles.secHeader}>
            <div className={styles.secHeaderIcon}>
              {activeMenu.icon}
            </div>
            <div className={styles.secHeaderInfo}>
              <h2>{activeMenu.headerLabel || activeMenu.label}</h2>
              <p>{activeMenu.subtitle || '\u00A0'}</p>
            </div>
            <button className={styles.closeBtnMobile} onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className={styles.secNav}>
            {activeMenu.subMenus && activeMenu.subMenus.length > 0 ? (
              activeMenu.subMenus.map((sub, idx) => (
                <div key={idx} className={styles.secGroup}>
                  {sub.group && (
                    <button
                      className={styles.secGroupHeader}
                      onClick={() => toggleGroup(sub.group)}
                    >
                      <div className={styles.groupHeaderLeft}>
                        <div className={styles.groupDot}></div>
                        <span>{sub.group}</span>
                      </div>
                      <ChevronDown size={14} className={`${styles.chevron} ${expandedGroups[sub.group] ? styles.rotated : ''}`} />
                    </button>
                  )}

                  {(!sub.group || expandedGroups[sub.group]) && (
                    <div className={styles.secGroupItems}>
                      {sub.items.map(item => (
                        <NavLink
                          key={item.path}
                          to={item.path}
                          className={({ isActive }) => isActive ? `${styles.secItem} ${styles.secItemActive}` : styles.secItem}
                          onClick={() => {
                            if (window.innerWidth <= 1024) setIsOpen(false);
                          }}
                        >
                          {item.label}
                          {item.badge && <span className={styles.badge}>{item.badge}</span>}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className={styles.noPagesContainer}>
                <span>No pages</span>
              </div>
            )}
          </div>

          <div className={styles.secFooter}>
            <div className={styles.userProfile}>
              <div className={styles.userAvatar}>{currentUser?.name?.charAt(0) || 'U'}</div>
              <div className={styles.userInfo}>
                <h4>{currentUser?.name || 'User'}</h4>
                <p>{currentUser?.role || 'Staff'}</p>
              </div>
              <button className={styles.logoutIconBtn} onClick={handleLogout}>
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
