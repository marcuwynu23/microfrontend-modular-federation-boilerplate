import React from 'react';

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Card: React.FC<CardProps> = ({ title, subtitle, children, style }) => {
  return (
    <div
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '24px',
        backdropFilter: 'blur(16px)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
        fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
        color: '#f3f4f6',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.3)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(99, 102, 241, 0.15)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
        e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.2)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {title && (
        <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '600', color: '#ffffff', letterSpacing: '0.3px' }}>
          {title}
        </h3>
      )}
      {subtitle && (
        <p style={{ margin: '0 0 16px 0', fontSize: '12px', fontWeight: '400', color: '#9ca3af', letterSpacing: '0.2px' }}>
          {subtitle}
        </p>
      )}
      <div style={{ fontSize: '14px', lineHeight: '1.6', color: '#d1d5db' }}>{children}</div>
    </div>
  );
};
