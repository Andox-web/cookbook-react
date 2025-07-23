// layouts/AppLayout/AppLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Sidebar from '../components/SideBar/SideBar';
import Footer from '../components/Footer/Footer';
import styles from './AppLayout.module.css';

const AppLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.mainArea}>
        <Sidebar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;