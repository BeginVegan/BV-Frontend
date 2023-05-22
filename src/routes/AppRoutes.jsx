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
import { ROUTES } from './ROUTES';

const AppRoutes = () => {
  const toast = useToast();
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

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
            <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.MAIN} />} />
            <Route path={ROUTES.MAIN} element={<MainPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.ADMIN} element={<AdminPage />} />
          </Route>
          {/* DefaultLayout은 검색창 있는 헤더 만 있는 레이아웃*/}
          <Route element={<DefaultLayout />}>
            <Route path={ROUTES.SEARCH} element={<SearchResultPage />} />
          </Route>
          {/* Mypage는 검색창있는 헤더와 사이드바가 있는 레이아웃 */}
          <Route element={<MypageLayout />}>
            <Route path={ROUTES.MYPAGE_HOME} element={<Navigate to="/mypage/main" />} />
            <Route path={ROUTES.MYPAGE_MAIN} element={<MyPageMain />} />
            <Route path={ROUTES.MYPAGE_HISTORY} element={<HistoryPage />} />
            <Route path={ROUTES.MYPAGE_BOOKMARK} element={<BookmarkPage />} />
            <Route path={ROUTES.MYPAGE_REVISE} element={<ReviseInfoPage />} />
          </Route>
          <Route path={ROUTES.AUTH} element={<AuthPage />} />
          <Route path={ROUTES.OTHERS} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
