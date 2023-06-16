import DefaultLayout from '@/components/Layout/DefaultLayout';
import MainLayout from '@/components/Layout/MainLayout';
import MypageLayout from '@/components/Layout/MypageLayout';
import AdminPage from '@/pages/Admin/AdminPage';
import RestaurantRegistration from '@/pages/Admin/Register/RestaurantRegistration';
import AuthPage from '@/pages/Auth/AuthPage';
import BestPage from '@/pages/Best/BestPage';
import ErrorPage from '@/pages/Error/ErrorPage';
import NotFoundPage from '@/pages/Error/NotFoundPage';
import LoginPage from '@/pages/Login/LoginPage';
import MainPage from '@/pages/Main/MainPage';
import BookmarkPage from '@/pages/Personal/BookmarkPage';
import DropPage from '@/pages/Personal/DropPage';
import HistoryPage from '@/pages/Personal/HistoryPage';
import MyPageMain from '@/pages/Personal/MyPageMain';
import SubmitReviewPage from '@/pages/Personal/SubmitReviewPage';
import RestaurantDetailPage from '@/pages/Restaurant/RestaurantDetailPage';
import SearchResultPage from '@/pages/SearchResult/SearchResultPage';
import { isAuthenticatedAtom } from '@/utils/atoms/isAuthenticatedAtom';
import { useToast } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './ROUTES';
import ReservationRestaurant from '@/pages/Restaurant/ReservationRestaurant';
import AdminLayout from '@/components/Layout/AdminLayout';

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
          </Route>
          {/* DefaultLayout은 검색창 있는 헤더 만 있는 레이아웃*/}
          <Route element={<DefaultLayout />}>
            <Route path={ROUTES.SEARCH} element={<SearchResultPage />} />
            <Route path={ROUTES.BEST} element={<BestPage />} />
          </Route>
          {/* DefaultLayout 레이아웃에서 푸터가 있는 레이아웃*/}
          <Route element={<DefaultLayout hasFooter={true} />}>
            <Route path={ROUTES.RESTAURANT} element={<RestaurantDetailPage />} />
            <Route path={ROUTES.RESTAURANT_RESERVATION} element={<ReservationRestaurant />} />
          </Route>
          {/* MainLayout은 검색창 없는 헤더 만 있는 레이아웃*/}
          <Route element={<AdminLayout />}>
            <Route path={ROUTES.ADMIN_RAW} element={<Navigate to={`${ROUTES.ADMIN_RAW}/user`} />} />
            <Route path={ROUTES.ADMIN} element={<AdminPage />} />
            <Route path={ROUTES.RESTAURANT_REGISTRATION} element={<RestaurantRegistration />} />
          </Route>
          {/* Mypage는 검색창있는 헤더와 사이드바가 있는 레이아웃 */}
          <Route element={<MypageLayout />}>
            <Route path={ROUTES.MYPAGE_HOME} element={<Navigate to="/mypage/main" />} />
            <Route path={ROUTES.MYPAGE_MAIN} element={<MyPageMain />} />
            <Route path={ROUTES.MYPAGE_HISTORY} element={<HistoryPage />} />
            <Route path={ROUTES.MYPAGE_BOOKMARK} element={<BookmarkPage />} />
            <Route path={ROUTES.MYPAGE_DROP} element={<DropPage />} />
            <Route path={ROUTES.MYPAGE_REVIEW} element={<SubmitReviewPage />} />
          </Route>
          <Route path={ROUTES.AUTH} element={<AuthPage />} />
          <Route path={ROUTES.OTHERS} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default AppRoutes;
