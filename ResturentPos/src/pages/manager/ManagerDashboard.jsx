import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  Plus,
  Settings,
  Grid,
  Utensils,
  Users,
  Clock,
  MoreHorizontal,
  ClipboardList,
  FileCheck,
  ShoppingCart,
  Timer,
  Banknote,
  UserCheck,
  Store,
  Package,
  CalendarDays,
  FileClock
} from 'lucide-react';
import useStore from '../../store/useStore';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';
import styles from './ManagerDashboard.module.css';

const ManagerDashboard = () => {
  const navigate = useNavigate();
  const orders = useStore(state => state.orders);
  const tables = useStore(state => state.tables);

  const todaysOrders = 248;
  const activeOrders = 12;
  const pendingOrders = 2;
  const todaysRevenue = 185400;
  const avgOrderValue = 748;
  const occupiedTables = 6;

  const revenueData = [
    { name: 'Jan', value: 12000 },
    { name: 'Feb', value: 28000 },
    { name: 'Mar', value: 23000 },
    { name: 'Apr', value: 35000 },
    { name: 'May', value: 40000 },
    { name: 'Jun', value: 32000 },
    { name: 'Jul', value: 25000 },
    { name: 'Aug', value: 22000 },
    { name: 'Sep', value: 34000 },
    { name: 'Oct', value: 23000 },
    { name: 'Nov', value: 29000 },
    { name: 'Dec', value: 26000 },
  ];

  const staffActivity = [
    { name: 'Ahmed Khan', action: 'Serving Table T01', status: 'Completed', color: 'success' },
    { name: 'Chef Gordon', action: 'Preparing ORD-02', status: 'In Progress', color: 'warning' },
    { name: 'Sarah Ali', action: 'Generating Bill T04', status: 'Pending', color: 'danger' },
    { name: 'Ali Raza', action: 'Cleaning Table T03', status: 'In Progress', color: 'warning' },
  ];

  const recentOrdersData = [
    { id: 'ORD-0248', customer: 'Ali Raza', table: 'T01', items: '3 items', amount: 'Rs. 2,450', status: 'Preparing', time: '12 min' },
    { id: 'ORD-0247', customer: 'Fatima Khan', table: 'T03', items: '2 items', amount: 'Rs. 1,320', status: 'In Progress', time: '18 min' },
    { id: 'ORD-0246', customer: 'Usman Ali', table: 'Take Away', items: '4 items', amount: 'Rs. 2,980', status: 'Ready', time: '25 min' },
    { id: 'ORD-0245', customer: 'Sara Ahmed', table: 'T07', items: '1 item', amount: 'Rs. 650', status: 'Delivered', time: '32 min' },
    { id: 'ORD-0244', customer: 'Bilal Khan', table: 'T05', items: '5 items', amount: 'Rs. 4,120', status: 'Completed', time: '41 min' },
  ];

  const liveOrders = [
    { id: '#ORD-0248', table: 'Table T01', status: 'Preparing', time: '12 min' },
    { id: '#ORD-0247', table: 'Table T03', status: 'In Progress', time: '18 min' },
    { id: '#ORD-0246', table: 'Take Away', status: 'Ready', time: '25 min' },
    { id: '#ORD-0245', table: 'Table T07', status: 'Delivered', time: '32 min' },
  ];

  const topSelling = [
    { name: 'Chicken Biryani', orders: '48 orders', percent: 18, color: '#1B7F43', img: 'https://images.unsplash.com/photo-1589302168068-964664d93cb0?w=100' },
    { name: 'Grilled Chicken', orders: '36 orders', percent: 14, color: '#1B7F43', img: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?w=100' },
    { name: 'Beef Burger', orders: '28 orders', percent: 11, color: '#1B7F43', img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=100' },
    { name: 'Fresh Lime Juice', orders: '24 orders', percent: 9, color: '#E5E7EB', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=100' },
    { name: 'Chocolate Cake', orders: '20 orders', percent: 8, color: '#E5E7EB', img: 'https://images.unsplash.com/photo-1578985545062-69928b1ea9aa?w=100' },
  ];

  const recentActivity = [
    { text: 'New order received #ORD-0248', sub: 'Table T01 • 3 items • Rs. 2,450', time: '12:12 PM', color: 'green', Icon: ShoppingCart },
    { text: 'Order status changed to Preparing', sub: '#ORD-0248 • Chicken Biryani', time: '12:10 PM', color: 'yellow', Icon: ClipboardList },
    { text: 'Staff Ahmed Khan clocked in', sub: 'Working on T01', time: '11:45 AM', color: 'blue', Icon: UserCheck },
    { text: 'Payment received', sub: 'Rs. 1,320 • #ORD-0247', time: '11:32 AM', color: 'green', Icon: Banknote },
    { text: 'New table reservation', sub: 'Table T06 • 6:00 PM', time: '10:15 AM', color: 'purple', Icon: CalendarDays },
  ];

  return (
    <div className={styles.dashboardGrid}>

      {/* LEFT CONTENT */}
      <div className={styles.leftContent}>

        {/* Header Row */}
        <div className={styles.headerRow}>
          <div className={styles.restaurantHeader}>
            <div className={styles.restLogo}>YQ</div>
            <div className={styles.restInfo}>
              <h3>Prime Restaurant <span className={styles.verifiedBadge}>✔ Verified</span></h3>
              <p>Main Branch • Islamabad</p>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.statusDisplay}>
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150" alt="Restaurant" className={styles.restImg} />
              <div className={styles.statusInfo}>
                <span className={styles.openBadge}>● Open</span>
                <p>9:00 AM - 12:00 AM</p>
              </div>
            </div>
            <button className={styles.settingsBtn}><Settings size={16} /></button>
          </div>
        </div>

        {/* KPIs Row */}
        <div className={styles.kpiRow}>
          <div className={`${styles.kpiCard} ${styles.kpiCardGreen}`}>
            <div className={styles.kpiTop}>
              <div className={styles.kpiTitleGroup}>
                <div className={styles.kpiIconWrap}>
                  <ClipboardList size={14} />
                </div>
                <span className={styles.kpiTitle}>Total Revenue</span>
              </div>
              <div className={styles.arrowCircle}><ArrowUpRight size={14} color="#059669" /></div>
            </div>
            <div className={styles.kpiValue}>Rs. {todaysRevenue.toLocaleString()}</div>
            <div className={styles.kpiTrend}><span className={styles.trendBadge}>+8.2%</span> Increased from last month</div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiTop}>
              <div className={styles.kpiTitleGroup}>
                <div className={styles.kpiIconWrap}>
                  <FileCheck size={14} color="#64748B" />
                </div>
                <span className={styles.kpiTitle}>Total Orders</span>
              </div>
              <ArrowUpRight size={14} color="#94a3b8" />
            </div>
            <div className={styles.kpiValueDark}>{todaysOrders}</div>
            <div className={styles.kpiTrendDark}><span className={styles.trendBadgeOutline}>+6%</span> Increased from last month</div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiTop}>
              <div className={styles.kpiTitleGroup}>
                <div className={styles.kpiIconWrap}>
                  <ShoppingCart size={14} color="#64748B" />
                </div>
                <span className={styles.kpiTitle}>Active Orders</span>
              </div>
              <ArrowUpRight size={14} color="#94a3b8" />
            </div>
            <div className={styles.kpiValueDark}>{activeOrders}</div>
            <div className={styles.kpiTrendDark}><span className={styles.trendBadgeOutline}>+2%</span> Increased from last month</div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiTop}>
              <div className={styles.kpiTitleGroup}>
                <div className={styles.kpiIconWrap}>
                  <Timer size={14} color="#64748B" />
                </div>
                <span className={styles.kpiTitle}>Pending Orders</span>
              </div>
            </div>
            <div className={styles.kpiValueDark}>{pendingOrders}</div>
            <div className={styles.kpiTrendDark}>On Discuss</div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiTop}>
              <div className={styles.kpiTitleGroup}>
                <div className={styles.kpiIconWrap}>
                  <Banknote size={14} color="#64748B" />
                </div>
                <span className={styles.kpiTitle}>Avg Value</span>
              </div>
            </div>
            <div className={styles.kpiValueDark}>Rs. {avgOrderValue}</div>
            <div className={styles.kpiTrendDark}><span className={styles.trendBadgeOutline}>+4%</span> Increased</div>
          </div>
          <div className={styles.kpiCard}>
            <div className={styles.kpiTop}>
              <div className={styles.kpiTitleGroup}>
                <div className={styles.kpiIconWrap}>
                  <UserCheck size={14} color="#64748B" />
                </div>
                <span className={styles.kpiTitle}>Active Tables</span>
              </div>
            </div>
            <div className={styles.kpiValueDark}>{occupiedTables}</div>
            <div className={styles.kpiTrendDark}>Live Now</div>
          </div>
        </div>

        {/* Row 2: Charts and Staff */}
        <div className={styles.twoColRow}>
          <div className={`${styles.baseCard} ${styles.fixedHeightCard}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Revenue Insights</h3>
              <div className={styles.analyticsActions}>
                <div className={styles.legendWrapper}><span className={styles.legendDot}></span> Revenue</div>
                <select className={styles.chartDropdown}><option>This Year</option></select>
              </div>
            </div>
            <div className={styles.analyticsMainValue}>
              <span className={styles.currencyValue}>$5,567.00</span>
              <span className={styles.percentageBadge}>+8.2%</span>
            </div>
            <div className={styles.chartContainer}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1B7F43" stopOpacity={1} />
                      <stop offset="100%" stopColor="#1B7F43" stopOpacity={0.6} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#f1f5f9" strokeDasharray="3 3" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} tickFormatter={(val) => val === 0 ? '0k' : `${val / 1000}k`} />
                  <Tooltip cursor={{ fill: 'transparent' }} />
                  <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={24} fill="url(#colorRevenue)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`${styles.baseCard} ${styles.fixedHeightCard}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>Staff Collaboration</h3>
              <a href="#" className={styles.viewAllLink}>See All</a>
            </div>
            <div className={styles.teamList}>
              {staffActivity.map((staff, i) => (
                <div key={i} className={styles.teamItem}>
                  <div className={styles.teamAvatar} style={{ backgroundColor: `hsl(${i * 60 + 180}, 70%, 85%)` }}>
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${staff.name}`} alt={staff.name} />
                  </div>
                  <div className={styles.teamInfo}>
                    <h4>{staff.name}</h4>
                    <p>{staff.action}</p>
                  </div>
                  <div className={`${styles.statusPill} ${styles[staff.status.toLowerCase().replace(' ', '')]}`}>{staff.status}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Row 3: Recent Orders and Top Selling */}
        <div className={styles.twoColRow}>
          <div className={`${styles.baseCard} ${styles.fixedHeightCardLarge}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <div className={styles.recentOrdersIconWrap}><ClipboardList size={14} color="white" /></div>
                Recent Orders
              </h3>
              <a href="#" className={styles.viewAllLink}>View All</a>
            </div>
            <div className={styles.tableResponsive}>
              <table className={styles.simpleTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Customer</th>
                    <th>Table</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrdersData.map((order, i) => (
                    <tr key={i}>
                      <td>{order.id}</td>
                      <td className={styles.darkText}>{order.customer}</td>
                      <td>{order.table}</td>
                      <td className={styles.greyText}>{order.items}</td>
                      <td className={styles.darkText}>{order.amount}</td>
                      <td><span className={`${styles.statusPill} ${styles[order.status.toLowerCase().replace(' ', '')]}`}>{order.status}</span></td>
                      <td>
                        <span className={styles.timeText}><Clock size={12} /> {order.time}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.viewAllOrdersWrap}><a href="#" className={styles.viewAllLink}>View All Orders →</a></div>
          </div>

          <div className={`${styles.baseCard} ${styles.fixedHeightCardLarge}`}>
            <div className={styles.cardHeader}>
              <h3 className={styles.cardTitle}>
                <div className={styles.recentOrdersIconWrap}><Package size={14} color="white" /></div>
                Top Selling Items
              </h3>
              <a href="#" className={styles.viewAllLink}>See All</a>
            </div>
            <div className={styles.topSellingList}>
              {topSelling.slice(0, 4).map((item, i) => (
                <div key={i} className={styles.topItemRow}>
                  <img src={item.img} alt={item.name} className={styles.topItemImg} />
                  <div className={styles.topItemContent}>
                    <h4 className={styles.darkText}>{item.name}</h4>
                    <div className={styles.topItemSubRow}>
                      <span className={styles.greyText}>{item.orders}</span>
                      <span className={styles.greyText}>{item.percent}%</span>
                    </div>
                    <div className={styles.topItemProgressBg}>
                      <div className={styles.topItemProgressFill} style={{ width: `${item.percent}%` }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      
      </div>

      {/* RIGHT CONTENT */}
      <div className={styles.rightContent}>
        <div className={`${styles.baseCard} ${styles.quickActionsCard}`}>
          <h3 className={styles.cardTitle}>Quick Actions</h3>
          <div className={styles.quickActionsGrid}>
            <button className={`${styles.actionBtn} ${styles.newOrder}`}>
              <div className={styles.actionIconWrap}><Plus size={16} /></div>
              <span>New Order</span>
            </button>
            <button className={`${styles.actionBtn} ${styles.addTable}`}>
              <Grid size={16} />
              <span>Add Table</span>
            </button>
            <button className={`${styles.actionBtn} ${styles.addMenu}`}>
              <Utensils size={16} />
              <span>Add Menu Item</span>
            </button>
            <button className={`${styles.actionBtn} ${styles.manageStaff}`}>
              <Users size={16} />
              <span>Manage Staff</span>
            </button>
          </div>
        </div>

        <div className={`${styles.baseCard} ${styles.liveOrdersCard} ${styles.fixedHeightCard}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}><Store size={18} color="#0f172a" /> Live Orders</h3>
            <a href="#" className={styles.viewAllLink}>View All</a>
          </div>
          <div className={styles.liveOrdersList}>
            {liveOrders.map((order, i) => (
              <div key={i} className={styles.liveOrderItem}>
                <div className={styles.liveOrderIcon}>
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${order.id}`} alt="avatar" />
                </div>
                <div className={styles.liveOrderInfo}>
                  <h4>{order.id}</h4>
                  <p>{order.table}</p>
                </div>
                <div className={styles.liveOrderRight}>
                  <span className={`${styles.statusPill} ${styles[order.status.toLowerCase().replace(' ', '')]}`}>{order.status}</span>
                  <p className={styles.timeText}><Clock size={10} /> {order.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={`${styles.baseCard} ${styles.recentActivityCard} ${styles.fixedHeightCardLarge}`}>
          <div className={styles.cardHeader}>
            <h3 className={styles.cardTitle}>
              <div className={styles.recentOrdersIconWrap} style={{ background: '#f1f5f9' }}><FileClock size={14} color="#64748B" /></div>
              Recent Activity
            </h3>
            <a href="#" className={styles.viewAllLink}>View All</a>
          </div>
          <div className={styles.activityList}>
            <div className={styles.timelineLine}></div>
            {recentActivity.map((act, i) => {
              const IconComp = act.Icon;
              return (
                <div key={i} className={styles.activityItem}>
                  <div className={`${styles.actIcon} ${styles['act_' + act.color]}`}>
                    <IconComp size={14} color="white" />
                  </div>
                  <div className={styles.actInfo}>
                    <h4 className={styles.darkText}>{act.text}</h4>
                    <p className={styles.greyText}>{act.sub}</p>
                  </div>
                  <div className={styles.actTime}>{act.time}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
