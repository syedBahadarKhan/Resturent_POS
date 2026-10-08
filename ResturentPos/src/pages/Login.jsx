import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/useStore';
import styles from './Login.module.css';
import { Utensils } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useStore();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(email, password);
    if (result.success) {
      const route = result.user.role === 'receptionist' ? 'reception' : result.user.role;
      navigate(`/${route}`);
    } else {
      setError(result.message);
    }
  };

  const autofill = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password');
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        <div className={styles.logoContainer}>
          <div className={styles.logoIcon}>
            <Utensils size={32} color="#fff" />
          </div>
          <h1>Prime Restaurant</h1>
          <p>Sign in to your account</p>
        </div>

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Email Address / Username</label>
            <input 
              type="text" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="manager@restaurant.com"
            />
          </div>
          <div className={styles.formGroup}>
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="••••••••"
            />
          </div>
          <div className={styles.formOptions}>
            <label className={styles.checkbox}>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#" className={styles.forgot}>Forgot password?</a>
          </div>
          <button type="submit" className={styles.loginButton}>Sign In</button>
        </form>

        <div className={styles.demoAccounts}>
          <p>Demo Accounts (Password: password)</p>
          <div className={styles.demoButtons}>
            <button onClick={() => autofill('manager@restaurant.com')}>Manager</button>
            <button onClick={() => autofill('waiter@restaurant.com')}>Waiter</button>
            <button onClick={() => autofill('kitchen@restaurant.com')}>Kitchen</button>
            <button onClick={() => autofill('reception@restaurant.com')}>Reception</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
