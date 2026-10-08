import React from 'react';
import { Search, Edit2, X } from 'lucide-react';
import styles from './Products.module.css';

const Products = () => {
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1>Products & Catalog</h1>
          <p>
            3 products · Stock Value: 0.00 · <span className={styles.lowStockText}>3 low stock</span>
          </p>
        </div>
        <div className={styles.headerRight}>
          <button className={styles.secondaryBtn}>Export</button>
          <button className={styles.secondaryBtn}>Import</button>
          <button className={styles.primaryBtn}>+ Add Product</button>
        </div>
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.searchBox}>
          <Search size={16} className={styles.searchIcon} />
          <input type="text" placeholder="Name, code, SKU, barcode." className={styles.searchInput} />
        </div>
        <select className={styles.dropdown}>
          <option>Type: All</option>
        </select>
      </div>

      {/* Table Section */}
      <div className={styles.tableCard}>
        <div className={styles.tableResponsive}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>CODE</th>
                <th>PRODUCT</th>
                <th>TYPE</th>
                <th>SALE PRICE</th>
                <th>COST</th>
                <th>STOCK</th>
                <th>STOCK VALUE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: '(Sample) Chicken Karahi', price: '1,200.00' },
                { name: '(Sample) Soft Drink (Can)', price: '100.00' },
                { name: '(Sample) Zinger Burger', price: '450.00' }
              ].map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <div className={styles.codePlaceholder}></div>
                  </td>
                  <td className={styles.productName}>{item.name}</td>
                  <td className={styles.typeText}>PRODUCT</td>
                  <td>{item.price}</td>
                  <td>0.00</td>
                  <td>
                    <span className={styles.stockDanger}>
                      0 <span className={styles.warningIcon}>⚠️</span>
                    </span>
                  </td>
                  <td>0.00</td>
                  <td>
                    <div className={styles.actionRow}>
                      <button className={styles.actionBtn}><Edit2 size={14} /></button>
                      <button className={styles.actionBtn}><X size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.paginationLeft}>
            <span>Showing 1–3 of 3 records</span>
            <select className={styles.pageSelect}>
              <option>25 per page</option>
            </select>
          </div>
          <div className={styles.paginationRight}>
            <button className={styles.pageArrow}>&lt;</button>
            <button className={styles.pageActive}>1</button>
            <button className={styles.pageArrow}>&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
