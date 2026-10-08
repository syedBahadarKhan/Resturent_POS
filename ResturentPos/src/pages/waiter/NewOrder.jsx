import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../../store/useStore';
import styles from './NewOrder.module.css';
import { Search, Minus, Plus, Trash2, Send } from 'lucide-react';

const NewOrder = () => {
  const menu = useStore(state => state.menu);
  const tables = useStore(state => state.tables);
  const createOrder = useStore(state => state.createOrder);
  const currentUser = useStore(state => state.currentUser);
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cart, setCart] = useState([]);
  const [selectedTable, setSelectedTable] = useState('');
  const [notes, setNotes] = useState('');

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

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.15;
  const total = subtotal; // Waiter sees base total, tax is shown in breakdown but total sent to kitchen is base

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
      notes: notes
    });

    navigate('/waiter');
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        <div className={styles.header}>
          <h1>Menu Selection</h1>
          <div className={styles.searchBar}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search menu items..." 
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
            <div key={item.id} className={styles.menuItem} onClick={() => addToCart(item)}>
              <div className={styles.itemImage} style={{backgroundImage: `url(${item.image})`}}>
                <div className={styles.itemPrice}>Rs. {item.price}</div>
              </div>
              <div className={styles.itemInfo}>
                <h4>{item.name}</h4>
                <p>{item.category}</p>
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
        </div>

        <div className={styles.cartConfig}>
          <div className={styles.formGroup}>
            <label>Select Table <span className={styles.required}>*</span></label>
            <select value={selectedTable} onChange={e => setSelectedTable(e.target.value)}>
              <option value="">-- Choose a table --</option>
              {availableTables.map(t => (
                <option key={t.id} value={t.number}>{t.number}</option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.cartItems}>
          {cart.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Cart is empty</p>
              <p className="text-muted text-sm">Select items from the menu to add them to the order.</p>
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
          <div className={styles.formGroup}>
            <label>Kitchen Notes (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g. Less spicy, no onions..." 
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

          <div className={styles.totals}>
            <div className={styles.totalRow}>
              <span>Subtotal</span>
              <span>Rs. {subtotal}</span>
            </div>
            <div className={`${styles.totalRow} ${styles.grandTotal}`}>
              <span>Total</span>
              <span>Rs. {subtotal}</span>
            </div>
          </div>

          <button 
            className={styles.sendBtn} 
            disabled={cart.length === 0 || !selectedTable}
            onClick={handleSendOrder}
          >
            <Send size={18} /> Send to Kitchen
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewOrder;
