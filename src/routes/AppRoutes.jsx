import AuthPage from '@/pages/Auth/AuthPage';
import ErrorPage from '@/pages/Error/ErrorPage';
import NotFoundPage from '@/pages/Error/NotFoundPage';
import LoginPage from '@/pages/Login/LoginPage';
import MainPage from '@/pages/Main/MainPage';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { useToast } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  console.log('11', isAuthenticated);
  const handleRouteError = error => {
    toast({
      title: 'Error',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <BrowserRouter>
      <Routes onError={handleRouteError}>
        <Route errorElement={<ErrorPage />}>
          <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/main" /> : <Navigate to="/login" />}
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
