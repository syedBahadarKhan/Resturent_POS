export const initialUsers = [
  { id: 'u1', name: 'Admin Manager', email: 'manager@restaurant.com', phone: '1234567890', password: 'password', role: 'manager', status: 'active', shift: 'morning' },
  { id: 'u2', name: 'Ahmed (Waiter)', email: 'waiter@restaurant.com', phone: '1234567891', password: 'password', role: 'waiter', status: 'active', shift: 'morning' },
  { id: 'u3', name: 'Chef Gordon', email: 'kitchen@restaurant.com', phone: '1234567892', password: 'password', role: 'kitchen', status: 'active', shift: 'morning' },
  { id: 'u4', name: 'Sarah (Reception)', email: 'reception@restaurant.com', phone: '1234567893', password: 'password', role: 'receptionist', status: 'active', shift: 'morning' },
];

export const initialMenu = [
  { id: 'm1', name: 'Chicken Biryani', category: 'Food', price: 450, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&q=80', prepTime: 20, available: true },
  { id: 'm2', name: 'Chicken Karahi', category: 'Food', price: 1200, image: 'https://images.unsplash.com/photo-1603496987351-f84a3ba5ec85?w=300&q=80', prepTime: 30, available: true },
  { id: 'm3', name: 'BBQ Platter', category: 'BBQ', price: 1500, image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&q=80', prepTime: 25, available: true },
  { id: 'm4', name: 'Chicken Tikka', category: 'BBQ', price: 450, image: 'https://images.unsplash.com/photo-1599487405270-8178d8a7c296?w=300&q=80', prepTime: 20, available: true },
  { id: 'm5', name: 'Zinger Burger', category: 'Fast Food', price: 550, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&q=80', prepTime: 15, available: true },
  { id: 'm6', name: 'Pizza (Large)', category: 'Fast Food', price: 1200, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300&q=80', prepTime: 25, available: true },
  { id: 'm7', name: 'Fresh Juice', category: 'Drinks', price: 250, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451b02?w=300&q=80', prepTime: 5, available: true },
  { id: 'm8', name: 'Coke', category: 'Drinks', price: 120, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=300&q=80', prepTime: 2, available: true },
  { id: 'm9', name: 'Tea', category: 'Drinks', price: 150, image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?w=300&q=80', prepTime: 10, available: true },
  { id: 'm10', name: 'Gulab Jamun', category: 'Desserts', price: 200, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&q=80', prepTime: 5, available: true },
];

export const initialTables = [
  { id: 't1', number: 'T01', status: 'available', currentOrder: null },
  { id: 't2', number: 'T02', status: 'available', currentOrder: null },
  { id: 't3', number: 'T03', status: 'available', currentOrder: null },
  { id: 't4', number: 'T04', status: 'available', currentOrder: null },
  { id: 't5', number: 'T05', status: 'available', currentOrder: null },
  { id: 't6', number: 'T06', status: 'available', currentOrder: null },
  { id: 't7', number: 'T07', status: 'available', currentOrder: null },
  { id: 't8', number: 'T08', status: 'available', currentOrder: null },
  { id: 't9', number: 'T09', status: 'available', currentOrder: null },
  { id: 't10', number: 'T10', status: 'available', currentOrder: null },
];

export const initialInventory = [
  { id: 'i1', name: 'Chicken Breast', category: 'Meat', quantity: 25, unit: 'kg', minLevel: 10, costPrice: 600, supplier: 'Local Farms', status: 'In Stock', lastUpdated: new Date().toISOString() },
  { id: 'i2', name: 'Cooking Oil', category: 'Grocery', quantity: 4, unit: 'L', minLevel: 10, costPrice: 450, supplier: 'Metro', status: 'Low Stock', lastUpdated: new Date().toISOString() },
  { id: 'i3', name: 'Coca Cola', category: 'Drinks', quantity: 0, unit: 'Bottles', minLevel: 20, costPrice: 80, supplier: 'Coke Dist.', status: 'Out of Stock', lastUpdated: new Date().toISOString() },
  { id: 'i4', name: 'Basmati Rice', category: 'Grocery', quantity: 40, unit: 'kg', minLevel: 15, costPrice: 300, supplier: 'Metro', status: 'In Stock', lastUpdated: new Date().toISOString() },
  { id: 'i5', name: 'Onions', category: 'Vegetables', quantity: 15, unit: 'kg', minLevel: 5, costPrice: 120, supplier: 'Local Market', status: 'In Stock', lastUpdated: new Date().toISOString() },
  { id: 'i6', name: 'Tomatoes', category: 'Vegetables', quantity: 8, unit: 'kg', minLevel: 10, costPrice: 150, supplier: 'Local Market', status: 'Low Stock', lastUpdated: new Date().toISOString() },
];
