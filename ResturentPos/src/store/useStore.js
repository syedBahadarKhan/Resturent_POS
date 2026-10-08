import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialUsers, initialMenu, initialTables, initialInventory } from '../data/mockData';

const useStore = create(
  persist(
    (set, get) => ({
  currentUser: null,
  viewingAsUserId: null,
  users: initialUsers,
  menu: initialMenu,
  tables: initialTables,
  inventory: initialInventory,
  orders: [],
  bills: [],
  notifications: [],

  // Auth
  login: (email, password) => {
    const normalizedEmail = (email || '').toLowerCase().trim();
    
    // Defensive check to avoid crashes if localStorage has corrupted users
    const user = get().users.find(u => {
      if (!u || !u.email || typeof u.email !== 'string') return false;
      return u.email.toLowerCase().trim() === normalizedEmail && u.password === password;
    });

    if (user) {
      if (user.status === 'inactive') {
        return { success: false, message: 'Your account is currently inactive. Please contact the Manager.' };
      }
      set({ currentUser: user });
      return { success: true, user };
    }
    return { success: false, message: 'Invalid credentials' };
  },
  logout: () => set({ currentUser: null, viewingAsUserId: null }),

  setViewingAsUser: (id) => set({ viewingAsUserId: id }),
  clearViewingAsUser: () => set({ viewingAsUserId: null }),

  // Users
  addUser: (user) => set((state) => ({ users: [...state.users, { ...user, id: `u${Date.now()}` }] })),
  updateUser: (id, data) => set((state) => ({ users: state.users.map(u => u.id === id ? { ...u, ...data } : u) })),
  deleteUser: (id) => set((state) => ({ users: state.users.filter(u => u.id !== id) })),

  // Menu
  addMenuItem: (item) => set((state) => ({ menu: [...state.menu, { ...item, id: `m${Date.now()}` }] })),
  updateMenuItem: (id, data) => set((state) => ({ menu: state.menu.map(m => m.id === id ? { ...m, ...data } : m) })),
  deleteMenuItem: (id) => set((state) => ({ menu: state.menu.filter(m => m.id !== id) })),

  // Orders
  createOrder: (orderData) => {
    const newOrder = {
      ...orderData,
      id: `ORD-${Date.now().toString().slice(-4)}`,
      status: 'NEW',
      time: new Date().toISOString(),
      paymentStatus: 'PENDING'
    };
    set((state) => {
      // Update table status
      const updatedTables = state.tables.map(t => 
        t.number === orderData.table ? { ...t, status: 'occupied', currentOrder: newOrder.id } : t
      );
      
      // Add Notification
      const notification = { id: Date.now(), message: `New order ${newOrder.id} received for ${orderData.table}`, time: new Date().toISOString() };
      
      return { 
        orders: [newOrder, ...state.orders], 
        tables: updatedTables,
        notifications: [notification, ...state.notifications]
      };
    });
    return newOrder;
  },
  updateOrderStatus: (id, status) => {
    set((state) => {
      const order = state.orders.find(o => o.id === id);
      let updatedInventory = state.inventory;
      let notifications = [...state.notifications];

      // Simulate inventory reduction if order is completed/billed
      if (status === 'COMPLETED' || status === 'BILLED') {
        // Very simplified inventory deduction
        // A real app would have a recipe mapping
        updatedInventory = state.inventory.map(item => {
          if (item.category === 'Drinks') {
            const consumed = order.items.filter(i => i.category === 'Drinks').reduce((sum, i) => sum + i.quantity, 0);
            if (consumed > 0 && item.quantity > 0) {
              const newQty = Math.max(0, item.quantity - consumed);
              let itemStatus = 'In Stock';
              if (newQty === 0) itemStatus = 'Out of Stock';
              else if (newQty <= item.minLevel) itemStatus = 'Low Stock';
              
              if (itemStatus !== 'In Stock') {
                notifications.push({ id: Date.now()+Math.random(), message: `${item.name} is ${itemStatus}`, time: new Date().toISOString() });
              }
              return { ...item, quantity: newQty, status: itemStatus };
            }
          }
          return item;
        });
      }

      const statusMsg = `Order ${id} is now ${status}`;
      notifications.push({ id: Date.now(), message: statusMsg, time: new Date().toISOString() });

      return {
        orders: state.orders.map(o => {
          if (o.id === id) {
            const updatedOrder = { ...o, status };
            if (status === 'PREPARING') updatedOrder.kitchenId = state.currentUser?.id;
            return updatedOrder;
          }
          return o;
        }),
        inventory: updatedInventory,
        notifications
      };
    });
  },

  // Bills & Payments
  createBill: (orderId) => {
    const existingBill = get().bills.find((bill) => bill.orderId === orderId);
    if (existingBill) return existingBill;
    const order = get().orders.find((item) => item.id === orderId);
    if (!order) return null;
    const subtotal = order.subtotal ?? order.total ?? 0;
    const discount = order.discount || 0;
    const taxableAmount = subtotal - discount;
    const tax = Math.round(taxableAmount * 0.15);
    const serviceCharge = Math.round(taxableAmount * 0.05);
    const bill = {
      id: `INV-${Date.now().toString().slice(-4)}`,
      orderId,
      table: order.table,
      waiter: order.waiterName,
      customer: order.customerName || order.customer || 'Walk-in',
      items: order.items,
      subtotal,
      tax,
      serviceCharge,
      discount,
      grandTotal: taxableAmount + tax + serviceCharge,
      billStatus: 'GENERATED',
      paymentStatus: 'PENDING',
      createdAt: new Date().toISOString(),
      time: new Date().toISOString(),
    };
    set((state) => ({ bills: [bill, ...state.bills] }));
    return bill;
  },
  payBill: (billId, paymentMethod) => {
    set((state) => {
      const bill = state.bills.find((item) => item.id === billId);
      if (!bill) return state;
      const paidAt = new Date().toISOString();
      const order = state.orders.find((item) => item.id === bill.orderId);
      const notification = { id: Date.now(), message: `Bill ${bill.id} paid via ${paymentMethod}`, time: paidAt };
      return {
        bills: state.bills.map((item) => item.id === billId ? { ...item, paymentMethod, paymentStatus: 'PAID', paidAt, time: paidAt } : item),
        orders: state.orders.map((item) => item.id === bill.orderId ? { ...item, status: 'COMPLETED', paymentStatus: 'PAID' } : item),
        tables: state.tables.map((table) => table.number === order?.table ? { ...table, status: 'available', currentOrder: null } : table),
        notifications: [notification, ...state.notifications],
      };
    });
  },
  generateBill: (orderId, paymentMethod) => {
    set((state) => {
      const order = state.orders.find(o => o.id === orderId);
      const newBill = {
        id: `INV-${Date.now().toString().slice(-4)}`,
        orderId,
        table: order.table,
        waiter: order.waiterName,
        items: order.items,
        subtotal: order.subtotal ?? order.total,
        tax: Math.round(((order.subtotal ?? order.total) - (order.discount || 0)) * 0.15), // 15% tax
        serviceCharge: Math.round(((order.subtotal ?? order.total) - (order.discount || 0)) * 0.05), // 5% service charge
        discount: order.discount || 0,
        grandTotal: ((order.subtotal ?? order.total) - (order.discount || 0)) + Math.round(((order.subtotal ?? order.total) - (order.discount || 0)) * 0.15) + Math.round(((order.subtotal ?? order.total) - (order.discount || 0)) * 0.05),
        paymentMethod,
        paymentStatus: 'PAID',
        receptionistId: state.currentUser?.id,
        time: new Date().toISOString(),
      };

      // Free up the table
      const updatedTables = state.tables.map(t => 
        t.number === order.table ? { ...t, status: 'available', currentOrder: null } : t
      );

      const notification = { id: Date.now(), message: `Bill ${newBill.id} paid via ${paymentMethod}`, time: new Date().toISOString() };

      return {
        bills: [newBill, ...state.bills],
        orders: state.orders.map(o => o.id === orderId ? { ...o, status: 'COMPLETED', paymentStatus: 'PAID' } : o),
        tables: updatedTables,
        notifications: [notification, ...state.notifications]
      };
    });
  },

  // Inventory
  addInventoryItem: (item) => set((state) => ({ inventory: [...state.inventory, { ...item, id: `i${Date.now()}` }] })),
  updateInventoryItem: (id, data) => set((state) => {
    return {
      inventory: state.inventory.map(i => {
        if (i.id === id) {
          const updated = { ...i, ...data, lastUpdated: new Date().toISOString() };
          if (updated.quantity === 0) updated.status = 'Out of Stock';
          else if (updated.quantity <= updated.minLevel) updated.status = 'Low Stock';
          else updated.status = 'In Stock';
          return updated;
        }
        return i;
      })
    };
  }),

  // Notifications
  clearNotifications: () => set({ notifications: [] }),
    }),
    {
      name: 'restaurant-pos-storage',
      // We do NOT want to persist viewingAsUserId as it should reset on fresh load
      partialize: (state) => {
        const { viewingAsUserId, ...rest } = state;
        return rest;
      },
    }
  )
);

export default useStore;
