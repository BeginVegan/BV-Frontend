import DefaultLayout from '@/components/Layout/DefaultLayout';
import MainLayout from '@/components/Layout/MainLayout';
import MypageLayout from '@/components/Layout/MypageLayout';
import AdminPage from '@/pages/Admin/AdminPage';
import AuthPage from '@/pages/Auth/AuthPage';
import ErrorPage from '@/pages/Error/ErrorPage';
import NotFoundPage from '@/pages/Error/NotFoundPage';
import LoginPage from '@/pages/Login/LoginPage';
import MainPage from '@/pages/Main/MainPage';
import BookmarkPage from '@/pages/Personal/BookmarkPage';
import HistoryPage from '@/pages/Personal/HistoryPage';
import MyPageMain from '@/pages/Personal/MyPageMain';
import ReviseInfoPage from '@/pages/Personal/ReviseInfoPage';
import SearchResultPage from '@/pages/SearchResult/SearchResultPage';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { useToast } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { Navigate, Route, Routes } from 'react-router-dom';

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
      <Routes onError={handleRouteError}>
        <Route errorElement={<ErrorPage />}>
          {/* MainLayout은 검색창 없는 헤더 만 있는 레이아웃*/}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Navigate to="/main" />} />
            <Route path="/main" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Route>
          {/* DefaultLayout은 검색창 있는 헤더 만 있는 레이아웃*/}
          <Route element={<DefaultLayout />}>
            <Route path="/search/:query" element={<SearchResultPage />} />
          </Route>
          {/* Mypage는 검색창있는 헤더와 사이드바가 있는 레이아웃 */}
          <Route element={<MypageLayout />}>
            <Route path="/mypage/" element={<Navigate to="/mypage/main" />} />
            <Route path="/mypage/main" element={<MyPageMain />} />
            <Route path="/mypage/history" element={<HistoryPage />} />
            <Route path="/mypage/bookmark" element={<BookmarkPage />} />
            <Route path="/mypage/revise" element={<ReviseInfoPage />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
