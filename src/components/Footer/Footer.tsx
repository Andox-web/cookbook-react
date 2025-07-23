import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => (
  <footer className={styles.footer}>
    <span>© {new Date().getFullYear()} Cookbook. Tous droits réservés.</span>
  </footer>
);

export default Footer;
