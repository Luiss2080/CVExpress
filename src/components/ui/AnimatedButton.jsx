import { motion } from 'framer-motion';

export default function AnimatedButton({ children, onClick, variant = 'primary', icon: Icon, className = '', ...props }) {
  const getStyles = () => {
    const base = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '10px 20px',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '0.95rem',
      transition: 'box-shadow 0.2s ease',
    };

    if (variant === 'primary') {
      return { ...base, background: 'var(--primary)', color: 'white' };
    }
    if (variant === 'secondary') {
      return { ...base, background: 'var(--input-bg)', color: 'var(--text-color)', border: '1px solid var(--input-border)' };
    }
    if (variant === 'danger') {
      return { ...base, background: '#ef4444', color: 'white' };
    }
    return base;
  };

  return (
    <motion.button
      onClick={onClick}
      style={getStyles()}
      whileHover={{ scale: 1.02, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.98 }}
      className={className}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </motion.button>
  );
}
