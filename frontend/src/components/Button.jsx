import React from 'react';
import './Button.css';

export const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'accent'
  isLoading = false,
  disabled = false,
  onClick,
  type = 'button',
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="btn-spinner" role="status" aria-hidden="true" />
          <span>Procesando...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};