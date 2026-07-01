import React from 'react';
import './Layout.css'; 

export const Layout = ({ children }) => {
  return (
    <div className="layout-backdrop">
      <main className="layout-container">
        {children}
      </main>
    </div>
  );
};