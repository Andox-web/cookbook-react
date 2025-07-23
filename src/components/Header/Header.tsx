import React from "react";
import { FaBookOpen, FaHome, FaUtensils } from "react-icons/fa";
import styles from "./header.module.css";

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <FaBookOpen className={styles.logoIcon} />
      <span>Cookbook</span>
    </div>
    {/* <nav className={styles.nav}>
      <a href="#" className={styles.navLink}>
        <FaHome className={styles.navIcon} />
        Accueil
      </a>
      <a href="#" className={styles.navLink}>
        <FaUtensils className={styles.navIcon} />
        Recettes
      </a>
    </nav> */}
  </header>
);

export default Header;