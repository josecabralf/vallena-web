import React, { useEffect, useState } from 'react';
import { AuthService, UserService } from '../services';
import { AuthContext } from './Auth.context';
import { Spin } from 'antd';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [logged, setLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await AuthService.check();
        const userName = await UserService.getUserName();
        setLogged(true);
        setUserName(userName);
      } catch {
        setLogged(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ logged, setLogged, loading, setUserName, userName }}
    >
      {children}
    </AuthContext.Provider>
  );
};
