import React, { useEffect, useState, type ReactNode } from 'react';
import { ToastContext, type ToastProps, type ToastType } from './Toast.context';

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [toast, setToast] = useState<ToastProps | null>(null);

  const showToast = (props: ToastProps) => {
    setToast({
      message: props.message,
      type: props.type || 'info',
      duration: props.duration || 3000,
    });
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, toast.duration);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  const getColorByType = (type: ToastType) => {
    const colors = {
      success: '#52c41a',
      error: '#ff4d4f',
      info: '#1890ff',
      warning: '#faad14',
    };
    return colors[type];
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: getColorByType(toast.type),
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 9999, // Highest z-index to ensure it's on top of everything
            animation: 'slideInUp 0.3s ease-out',
          }}
        >
          {toast.message}
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(20px);
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
};
