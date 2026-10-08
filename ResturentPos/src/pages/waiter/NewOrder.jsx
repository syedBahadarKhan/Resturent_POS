import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import styles from './NewOrder.module.css';
import { Search, Minus, Plus, Trash2, Send, ShoppingCart, ArrowRight, Bell } from 'lucide-react';

const NewOrder = () => {
  const menu = useStore(state => state.menu);
  const tables = useStore(state => state.tables);
  const createOrder = useStore(state => state.createOrder);
  const currentUser = useStore(state => state.currentUser);
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [globalSearch, setGlobalSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');

  const categories = ['All', ...new Set(menu.map(item => item.category))];
  const availableTables = tables.filter(t => t.status === 'available');

  const filteredMenu = useMemo(() => {
    return menu.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory && item.available;
    });
  }, [menu, search, selectedCategory]);

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
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearOrder = () => {
    setCart([]);
    setSelectedTable('');
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.05;
  const total = subtotal + tax; 

  const handleSendOrder = () => {
    if (!selectedTable) {
      alert("Please select a table.");
      return;
    }
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }

    createOrder({
      table: selectedTable,
      waiterId: currentUser.id,
      waiterName: currentUser.name,
      items: cart,
      total: subtotal,
    });

    navigate('/waiter');
  };

  return (
    <div className={styles.pageWrapper}>
      {/* TOPBAR */}
      <div className={styles.topBar}>
        <div className={styles.topBarLeft}>
          <h1>New Order / POS</h1>
          <p>Build and send a table order</p>
        </div>
        <div className={styles.topBarRight}>
          <div className={styles.globalSearchBar}>
            <Search size={16} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search orders, tables..." 
              value={globalSearch}
              onChange={e => setGlobalSearch(e.target.value)}
            />
          </div>
          <div className={styles.notificationWrapper}>
            <Bell size={20} color="#64748b" />
            <span className={styles.badge}>3</span>
          </div>
          <div className={styles.profileSection}>
            <div className={styles.avatar}>AK</div>
            <div className={styles.profileDetails}>
              <span className={styles.profileName}>Ali Khan</span>
              <span className={styles.profileRole}>Waiter</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className={styles.container}>
        <div className={styles.leftPanel}>
          <div className={styles.header}>
            <div className={styles.headerTitles}>
              <h2>Choose items</h2>
              <p>Tap an item to customize and add</p>
            </div>
            <div className={styles.searchBar}>
              <Search size={16} className={styles.searchIcon} />
              <input 
                type="text" 
                placeholder="Search food or drinks..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className={styles.categories}>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`${styles.categoryBtn} ${selectedCategory === cat ? styles.categoryActive : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className={styles.menuGrid}>
            {filteredMenu.map(item => (
              <div key={item.id} className={styles.menuItem}>
                <div className={styles.itemImage} style={{backgroundImage: `url(${item.image || 'https://via.placeholder.com/300x150'})`}}>
                  <div className={styles.availableBadge}>
                    <span className={styles.dot}></span> Available
                  </div>
                </div>
                <div className={styles.itemInfo}>
                  <h4>{item.name}</h4>
                  <p>{item.description || item.category}</p>
                  <div className={styles.priceRow}>
                    <span className={styles.price}>Rs. {item.price.toLocaleString()}</span>
                    <button className={styles.addBtn} onClick={() => addToCart(item)}>
                      <Plus size={14} /> Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filteredMenu.length === 0 && (
              <div className={styles.noItems}>No items found.</div>
            )}
          </div>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.cartHeader}>
            <h2>Current Order</h2>
            <div className={styles.tableSelectorWrapper}>
              <select className={styles.tableSelector} value={selectedTable} onChange={e => setSelectedTable(e.target.value)}>
                <option value="">Select a Table</option>
                {availableTables.map(t => (
                  <option key={t.id} value={t.number}>Table {t.number}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.cartItems}>
            {cart.length === 0 ? (
              <div className={styles.emptyCart}>
                <div className={styles.emptyIcon}>
                  <ShoppingCart size={24} color="#94a3b8" />
                </div>
                <h3>Your order is empty</h3>
                <p>Add food or drinks from the menu to get started.</p>
                <button className={styles.browseBtn}>Browse menu</button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.cartItemInfo}>
                    <div className={styles.cartItemName}>{item.name}</div>
                    <div className={styles.cartItemPrice}>Rs. {item.price * item.quantity}</div>
                  </div>
                  <div className={styles.cartItemControls}>
                    <div className={styles.qtyControls}>
                      <button onClick={() => updateQuantity(item.id, -1)}><Minus size={14}/></button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}><Plus size={14}/></button>
                    </div>
                    <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className={styles.cartFooter}>
            <div className={styles.totals}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className={styles.totalRow}>
                <span>Tax (5%)</span>
                <span>Rs. {tax.toLocaleString()}</span>
              </div>
              <div className={styles.divider}></div>
              <div className={`${styles.totalRow} ${styles.grandTotal}`}>
                <span>Estimated total</span>
                <span>Rs. {total.toLocaleString()}</span>
              </div>
              <p className={styles.paymentNote}>Payment will be handled separately by the cashier.</p>
            </div>

            <button 
              className={styles.sendBtn} 
              disabled={cart.length === 0 || !selectedTable}
              onClick={handleSendOrder}
            >
              <ArrowRight size={16} /> SEND TO KITCHEN + CASHIER
            </button>
            
            <div className={styles.bottomButtons}>
              <button className={styles.saveDraftBtn}>Save draft</button>
              <button className={styles.clearBtn} onClick={clearOrder}>Clear order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
