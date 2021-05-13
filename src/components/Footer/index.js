import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import BottomNavigation from '../BottomNavigation';

export default function Footer() {
  
  return (
    <div style={{
        width: '100%',
        position: 'fixed',
        background: '#333',
        color: '#fff',
        bottom: '0'
      }}>
        <div style={{ margin: "0 auto" }}>
          <Hidden lgUp>
            <BottomNavigation />
          </Hidden>
        </div>
      </div>
  );
}