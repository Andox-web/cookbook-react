import React from 'react';
import { FaHome, FaUtensils, FaHeart } from 'react-icons/fa';
import styles from './Sidebar.module.css';

const Sidebar: React.FC = () => (
  <aside className={styles.sidebar}>
    <nav className={styles.nav}>
      <a href="/" className={styles.navLink}>
        <FaHome className={styles.navIcon} />
        Accueil
      </a>
      <a href="/add" className={styles.navLink}>
        <FaUtensils className={styles.navIcon} />
        Ajouter recette
      </a>
      <a href="/favorites" className={styles.navLink}>
        <FaHeart className={styles.navIcon} />
        Favoris
      </a>
    </nav>
  </aside>
);

export default Sidebar;
