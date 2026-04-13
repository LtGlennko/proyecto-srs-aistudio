import React from 'react';

interface FABButtonProps {
  onClick: () => void;
}

export const FABButton: React.FC<FABButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      background: '#1A73E8',
      color: 'white',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 90,
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
    }}>
    <span className="material-symbols-outlined" 
      style={{ fontSize: '24px' }}>
      add
    </span>
  </button>
);
