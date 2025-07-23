import React from 'react';
import Header from '../components/Header/Header';
import Sidebar from '../components/SideBar/SideBar';
import Footer from '../components/Footer/Footer';
import styles from './AppLayout.module.css';

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <div className={styles.mainArea}>
        <Sidebar />
        <main className={styles.content}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
