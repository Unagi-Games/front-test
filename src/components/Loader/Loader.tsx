import React from 'react';
import './Loader.css';

interface LoaderProps {
  loading: boolean;
  size?: string;
  children?: React.ReactNode;
}

export const Loader: React.FC<LoaderProps> = (props) => {
  const { children, loading, size = 'default' } = props;

  if (loading) {
    return <div className={`loading ${size}`} />;
  }
  return <>{children}</>;
};
