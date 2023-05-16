import { useToast } from '@chakra-ui/react';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth/AuthPage';
import ErrorPage from './pages/Error/ErrorPage';
import NotFoundPage from './pages/Error/NotFoundPage';
import LoginPage from './pages/Login/LoginPage';
import MainPage from './pages/Main/MainPage';

const AppRoutes = () => {
  const toast = useToast();

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
          {/* 
            인증 상태 확인후 리다이렉션
            <Route
            path="/"
            element={isAuthenticated ? <Navigate to="/total" /> : <LoginPage />}
          /> */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
