import React, { useState } from 'react';
import { Search, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import styles from './POS.module.css';

const DUMMY_CATEGORIES = ['All', 'Burgers', 'Pizza', 'Beverages'];

const DUMMY_ITEMS = [
  { id: 1, name: 'Classic Burger', category: 'Burgers', price: 500, image: '🍔' },
  { id: 2, name: 'Cheese Burger', category: 'Burgers', price: 600, image: '🍔' },
  { id: 3, name: 'Margherita Pizza', category: 'Pizza', price: 1200, image: '🍕' },
  { id: 4, name: 'Pepperoni Pizza', category: 'Pizza', price: 1500, image: '🍕' },
  { id: 5, name: 'Cola', category: 'Beverages', price: 150, image: '🥤' },
  { id: 6, name: 'Lemonade', category: 'Beverages', price: 200, image: '🍹' },
];

const POS = () => {
  const [activeMainTab, setActiveMainTab] = useState('new'); // 'new' | 'active'
  const [orderType, setOrderType] = useState('Dine In'); // 'Dine In' | 'Takeaway' | 'Delivery'
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  
  const [cart, setCart] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');

  // Filter Items
  const filteredItems = DUMMY_ITEMS.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cart Functions
  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQ = item.quantity + delta;
        return newQ > 0 ? { ...item, quantity: newQ } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className={styles.container}>
      {/* Top Navigation Tabs */}
      <div className={styles.topTabs}>
        <button 
          className={`${styles.tabBtn} ${activeMainTab === 'new' ? styles.activeTab : ''}`}
          onClick={() => setActiveMainTab('new')}
        >
          <Plus size={16} /> New Order
        </button>
        <button 
          className={`${styles.tabBtn} ${activeMainTab === 'active' ? styles.activeTab : ''}`}
          onClick={() => setActiveMainTab('active')}
        >
          🧾 Active Orders & Billing
        </button>
      </div>

      <div className={styles.mainContent}>
        {/* Left Column: Menu */}
        <div className={styles.menuSection}>
          {/* Search Bar */}
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search menu..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Categories */}
          <div className={styles.categories}>
            {DUMMY_CATEGORIES.map(cat => (
              <button 
                key={cat}
                className={`${styles.categoryBtn} ${activeCategory === cat ? styles.activeCategory : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className={styles.itemsGrid}>
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <div key={item.id} className={styles.itemCard} onClick={() => addToCart(item)}>
                  <div className={styles.itemImage}>{item.image}</div>
                  <div className={styles.itemInfo}>
                    <h4 className={styles.itemName}>{item.name}</h4>
                    <p className={styles.itemPrice}>PKR {item.price}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noItems}>
                <p>No items found</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Cart */}
        <div className={styles.cartSection}>
          {/* Order Type Tabs */}
          <div className={styles.orderTypeTabs}>
            {['Dine In', 'Takeaway', 'Delivery'].map(type => (
              <button 
                key={type}
                className={`${styles.orderTypeBtn} ${orderType === type ? styles.activeOrderType : ''}`}
                onClick={() => setOrderType(type)}
              >
                {type === 'Dine In' ? '🪑' : type === 'Takeaway' ? '🥡' : '🛵'} {type}
              </button>
            ))}
          </div>

          {/* Table Selector (If Dine In) */}
          {orderType === 'Dine In' && (
            <div className={styles.tableSelector}>
              <select 
                value={selectedTable} 
                onChange={(e) => setSelectedTable(e.target.value)}
                className={styles.selectInput}
              >
                <option value="" disabled>Select Table *</option>
                <option value="t1">Table 1</option>
                <option value="t2">Table 2</option>
                <option value="t3">Table 3</option>
              </select>
            </div>
          )}

          {/* Cart Items Area */}
          <div className={styles.cartItemsArea}>
            {cart.length > 0 ? (
              <div className={styles.cartList}>
                {cart.map(item => (
                  <div key={item.id} className={styles.cartItem}>
                    <div className={styles.cartItemInfo}>
                      <span className={styles.cartItemName}>{item.name}</span>
                      <span className={styles.cartItemPrice}>PKR {item.price * item.quantity}</span>
                    </div>
                    <div className={styles.cartItemActions}>
                      <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, -1)}><Minus size={12}/></button>
                      <span className={styles.qtyVal}>{item.quantity}</span>
                      <button className={styles.qtyBtn} onClick={() => updateQuantity(item.id, 1)}><Plus size={12}/></button>
                      <button className={styles.deleteBtn} onClick={() => removeFromCart(item.id)}><Trash2 size={14}/></button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyCart}>
                <ShoppingCart size={24} className={styles.emptyCartIcon} />
                <p>Tap items to add</p>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cart.length > 0 && (
            <div className={styles.cartFooter}>
              <div className={styles.cartTotalRow}>
                <span>Total</span>
                <span>PKR {cartTotal}</span>
              </div>
              <button className={styles.placeOrderBtn}>Place Order</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default POS;
