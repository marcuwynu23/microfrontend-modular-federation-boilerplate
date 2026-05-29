import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', children, style, ...props }) => {
  const getStyles = (): React.CSSProperties => {
    const baseStyle: React.CSSProperties = {
      padding: '12px 24px',
      borderRadius: '8px',
      fontWeight: '600',
      fontSize: '14px',
      fontFamily: "'Outfit', 'Inter', system-ui, sans-serif",
      cursor: 'pointer',
      border: 'none',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      letterSpacing: '0.5px',
      userSelect: 'none',
    };

    const variantStyles: Record<string, React.CSSProperties> = {
      primary: {
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        color: '#ffffff',
      },
      secondary: {
        background: 'rgba(255, 255, 255, 0.08)',
        color: '#f3f4f6',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(8px)',
      },
      accent: {
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: '#ffffff',
      },
      danger: {
        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        color: '#ffffff',
      },
    };

    return { ...baseStyle, ...variantStyles[variant], ...style };
  };

  return (
    <button
      style={getStyles()}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)';
        if (variant === 'secondary') {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
        } else if (variant === 'primary') {
          e.currentTarget.style.filter = 'brightness(1.1)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        if (variant === 'secondary') {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
        } else {
          e.currentTarget.style.filter = 'none';
        }
      }}
      {...props}
    >
      {children}
    </button>
  );
};
