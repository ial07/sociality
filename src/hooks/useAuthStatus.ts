// src/hooks/useAuthStatus.ts
'use client'; 

import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { RootState } from '@/redux/store';

export function useAuthStatus() {
  const token = useSelector((state: RootState) => state.auth.token);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false); 
  }, []);

  const isLoggedIn = !!token;

  return { 
    isLoggedIn, 
    isLoading,
    user: useSelector((state: RootState) => state.auth.user)
  };
}