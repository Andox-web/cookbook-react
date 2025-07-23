import React from 'react';
import { FaBookOpen } from 'react-icons/fa';
import styles from './header.module.css';

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <FaBookOpen className={styles.logoIcon} />
      <span>Cookbook</span>
    </div>
  </header>
);

export default Header;
