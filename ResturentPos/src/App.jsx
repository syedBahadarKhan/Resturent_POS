import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import useStore from './store/useStore';

// Layouts
import DashboardLayout from './components/layout/DashboardLayout';

// Pages (Placeholders)
import Login from './pages/Login';
import ManagerDashboard from './pages/manager/ManagerDashboard';
import StaffManagement from './pages/manager/StaffManagement';
import KitchenDashboard from './pages/kitchen/KitchenDashboard';
import ReceptionDashboard from './pages/reception/ReceptionDashboard';
import ReceptionOrders from './pages/reception/ReceptionOrders';
import ReceptionBilling from './pages/reception/ReceptionBilling';
import ReceptionReceipts from './pages/reception/ReceptionReceipts';
import FinanceDashboard from './pages/manager/FinanceDashboard';
import SalesInvoices from './pages/manager/SalesInvoices';
import ViewAsDashboard from './pages/manager/ViewAsDashboard';
import WaiterDashboard from './pages/waiter/WaiterDashboard';
import NewOrder from './pages/waiter/NewOrder';
import MyOrders from './pages/waiter/MyOrders';
import WaiterProfile from './pages/waiter/WaiterProfile';

import Expenses from './pages/manager/Expenses';
import FinancialReports from './pages/manager/FinancialReports';
import Receipts from './pages/manager/Receipts';
import HRDashboard from './pages/manager/HRDashboard';
import Departments from './pages/manager/Departments';
import Designations from './pages/manager/Designations';
import Attendance from './pages/manager/Attendance';
import Leave from './pages/manager/Leave';
import Payroll from './pages/manager/Payroll';
import Loans from './pages/manager/Loans';
import InventoryDashboard from './pages/manager/InventoryDashboard';
import Products from './pages/manager/Products';
import LowStock from './pages/manager/LowStock';
import RestaurantDashboard from './pages/manager/RestaurantDashboard';
import Tables from './pages/manager/Tables';
import POS from './pages/manager/POS';

// Dummy component for unbuilt routes
const Placeholder = ({ title }) => <div style={{ padding: '24px' }}><h2>{title}</h2><p>Coming soon...</p></div>;

const ProtectedRoute = ({ children, allowedRoles }) => {
  const currentUser = useStore((state) => state.currentUser);
  
  if (!currentUser) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    const roleRoute = currentUser.role === 'receptionist' ? 'reception' : currentUser.role;
    return <Navigate to={`/${roleRoute}`} replace />;
  }
  
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        
        {/* Manager Routes */}
        <Route path="/manager" element={
          <ProtectedRoute allowedRoles={['manager']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ManagerDashboard />} />
          <Route path="restaurant/dashboard" element={<RestaurantDashboard />} />
          <Route path="orders" element={<POS />} />
          <Route path="tables" element={<Tables />} />
          <Route path="kitchen-display" element={<Placeholder title="Kitchen Display" />} />
          <Route path="menu" element={<Placeholder title="Menu Builder" />} />
          <Route path="reservations" element={<Placeholder title="Reservations" />} />
          <Route path="restaurant/reports" element={<Placeholder title="Restaurant Reports" />} />
          <Route path="restaurant/settings" element={<Placeholder title="Settings" />} />
          <Route path="ai-assistant" element={<Placeholder title="AI Assistant" />} />
          <Route path="staff" element={<StaffManagement />} />
          <Route path="staff/:userId/dashboard" element={<ViewAsDashboard />} />
          <Route path="inventory" element={<InventoryDashboard />} />
          <Route path="inventory/products" element={<Products />} />
          <Route path="inventory/categories" element={<Placeholder title="Categories" />} />
          <Route path="inventory/warehouses" element={<Placeholder title="Warehouses" />} />
          <Route path="inventory/units" element={<Placeholder title="Units of Measure" />} />
          <Route path="inventory/pricelists" element={<Placeholder title="Price Lists" />} />
          <Route path="inventory/movements" element={<Placeholder title="Stock Movements" />} />
          <Route path="inventory/adjustments" element={<Placeholder title="Stock Adjustments" />} />
          <Route path="inventory/transfers" element={<Placeholder title="Stock Transfers" />} />
          <Route path="inventory/lot-batch" element={<Placeholder title="Lot & Batch" />} />
          <Route path="inventory/serial-numbers" element={<Placeholder title="Serial Numbers" />} />
          <Route path="inventory/low-stock" element={<LowStock />} />
          <Route path="inventory/valuation" element={<Placeholder title="Valuation Report" />} />
          
          {/* Billing */}
          <Route path="billing" element={<FinanceDashboard />} />
          <Route path="billing/sales" element={<SalesInvoices />} />
          <Route path="billing/receipts" element={<Receipts />} />
          <Route path="billing/expenses" element={<Expenses />} />
          <Route path="billing/reports" element={<FinancialReports />} />
          
          {/* HR */}
          <Route path="hr/dashboard" element={<HRDashboard />} />
          <Route path="hr/departments" element={<Departments />} />
          <Route path="hr/designations" element={<Designations />} />
          <Route path="hr/attendance" element={<Attendance />} />
          <Route path="hr/leave" element={<Leave />} />
          <Route path="hr/payroll" element={<Payroll />} />
          <Route path="hr/loans" element={<Loans />} />
          
          {/* Other */}
          <Route path="reports" element={<Placeholder title="Reports" />} />
          <Route path="settings" element={<Placeholder title="Settings" />} />
        </Route>

        {/* Waiter Routes */}
        <Route path="/waiter" element={
          <ProtectedRoute allowedRoles={['waiter', 'manager']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<WaiterDashboard />} />
          <Route path="new-order" element={<NewOrder />} />
          <Route path="my-orders" element={<MyOrders />} />
          <Route path="profile" element={<WaiterProfile />} />
        </Route>

        {/* Kitchen Routes */}
        <Route path="/kitchen" element={
          <ProtectedRoute allowedRoles={['kitchen', 'manager']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<KitchenDashboard />} />
          <Route path="inventory" element={<Placeholder title="Kitchen Inventory" />} />
        </Route>

        {/* Reception Routes */}
        <Route path="/reception" element={
          <ProtectedRoute allowedRoles={['receptionist', 'manager']}>
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<ReceptionDashboard />} />
          <Route path="menu-order" element={<ReceptionDashboard />} />
          <Route path="dashboard" element={<ReceptionDashboard />} />
          <Route path="orders" element={<ReceptionOrders />} />
          <Route path="analytics" element={<Placeholder title="Reception Analytics" />} />
          <Route path="withdrawal" element={<Placeholder title="Cash Withdrawal" />} />
          <Route path="tables" element={<Placeholder title="Manage Tables" />} />
          <Route path="dishes" element={<Placeholder title="Manage Dishes" />} />
          <Route path="billing" element={<ReceptionBilling />} />
          <Route path="receipts" element={<ReceptionReceipts />} />
          <Route path="settings" element={<Placeholder title="Reception Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
