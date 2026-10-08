import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Search, Edit2, Trash2, KeyRound, UserX, UserCheck, LayoutDashboard } from 'lucide-react';
import useStore from '../../store/useStore';
import styles from './StaffManagement.module.css';

const StaffManagement = () => {
  const navigate = useNavigate();
  const users = useStore(state => state.users);
  const addUser = useStore(state => state.addUser);
  const updateUser = useStore(state => state.updateUser);
  const deleteUser = useStore(state => state.deleteUser);
  const currentUser = useStore(state => state.currentUser);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'waiter',
    shift: 'morning',
    status: 'active'
  });

  const staffRoles = ['manager', 'waiter', 'kitchen', 'receptionist'];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                          user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const openModal = (user = null) => {
    // Ensure we are getting a valid user object, not an event
    if (user && user.id) {
      setEditingId(user.id);
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone || '',
        password: user.password,
        role: user.role,
        shift: user.shift || 'morning',
        status: user.status || 'active'
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        role: 'waiter',
        shift: 'morning',
        status: 'active'
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateUser(editingId, formData);
    } else {
      addUser(formData);
    }
    closeModal();
  };

  const toggleStatus = (id, currentStatus) => {
    // Prevent deactivating oneself
    if (id === currentUser.id) {
      alert("You cannot deactivate your own account.");
      return;
    }
    updateUser(id, { status: currentStatus === 'active' ? 'inactive' : 'active' });
  };

  const handleDelete = (id) => {
    if (id === currentUser.id) {
      alert("You cannot delete your own account.");
      return;
    }
    if (window.confirm("Are you sure you want to delete this staff member?")) {
      deleteUser(id);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Staff Management</h1>
          <p className="text-muted">Manage roles, shifts, and access for all restaurant staff.</p>
        </div>
        <button className={styles.addBtn} onClick={() => openModal()}>
          <PlusCircle size={20} /> Add Staff Member
        </button>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.roleFilter}>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            <option value="All">All Roles</option>
            <option value="manager">Manager</option>
            <option value="waiter">Waiter</option>
            <option value="kitchen">Kitchen Staff</option>
            <option value="receptionist">Receptionist</option>
          </select>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Contact</th>
              <th>Shift</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className={user.status === 'inactive' ? styles.inactiveRow : ''}>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>{user.name.charAt(0)}</div>
                    <div>
                      <div className={styles.userName}>{user.name}</div>
                      <div className={styles.userEmail}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`${styles.roleBadge} ${styles[user.role]}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.phone || '-'}</td>
                <td style={{textTransform: 'capitalize'}}>{user.shift || '-'}</td>
                <td>
                  <span className={`${styles.statusBadge} ${styles[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td>
                  <div className={styles.actionBtns}>
                    <button className={styles.iconBtn} title="View Dashboard" onClick={() => navigate(`/manager/staff/${user.id}/dashboard`)}>
                      <LayoutDashboard size={16} />
                    </button>
                    <button className={styles.iconBtn} title="Edit" onClick={() => openModal(user)}>
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className={`${styles.iconBtn} ${user.status === 'active' ? styles.dangerBtn : styles.successBtn}`} 
                      title={user.status === 'active' ? "Deactivate" : "Activate"}
                      onClick={() => toggleStatus(user.id, user.status)}
                    >
                      {user.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                    </button>
                    <button className={`${styles.iconBtn} ${styles.dangerBtn}`} title="Delete" onClick={() => handleDelete(user.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan="6" className={styles.emptyState}>No staff members found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>{editingId ? 'Edit Staff Member' : 'Add New Staff'}</h2>
              <button className={styles.closeModal} onClick={closeModal}>&times;</button>
            </div>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Email / Username *</label>
                  <input type="text" name="email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Phone Number</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
                <div className={styles.formGroup}>
                  <label>Password *</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Role *</label>
                  <select name="role" value={formData.role} onChange={handleChange} required>
                    {staffRoles.map(r => (
                      <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label>Shift</label>
                  <select name="shift" value={formData.shift} onChange={handleChange}>
                    <option value="morning">Morning</option>
                    <option value="evening">Evening</option>
                    <option value="night">Night</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Status</label>
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className={styles.modalFooter}>
                <button type="button" className={styles.cancelBtn} onClick={closeModal}>Cancel</button>
                <button type="submit" className={styles.saveBtn}>{editingId ? 'Save Changes' : 'Create Account'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
