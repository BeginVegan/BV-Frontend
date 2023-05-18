import Footer from '@/components/Layout/Footer';
import Header from '@/components/Layout/Header';
import AdminPage from '@/pages/Admin/AdminPage';
import AuthPage from '@/pages/Auth/AuthPage';
import ErrorPage from '@/pages/Error/ErrorPage';
import NotFoundPage from '@/pages/Error/NotFoundPage';
import LoginPage from '@/pages/Login/LoginPage';
import MainPage from '@/pages/Main/MainPage';
import MyPage from '@/pages/Personal/MyPage';
import SearchResultPage from '@/pages/SearchResult/SearchResultPage';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { useToast } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

const AppRoutes = () => {
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  // console.log('AppRoutes', isAuthenticated);
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
    <>
      <BrowserRouter>
        <Header />
        <Routes onError={handleRouteError}>
          <Route errorElement={<ErrorPage />}>
            <Route path="/" element={<Navigate to="/main" />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/search/:query" element={<SearchResultPage />} />
            <Route path="/mypage/*" element={<MyPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
