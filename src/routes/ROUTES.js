export const ROUTES = {
  HOME: '/',
  MAIN: '/main',
  LOGIN: '/login',
  AUTH: '/auth',
  ADMIN: '/admin/:category',
  ADMIN_RAW: '/admin',
  ADMIN_RESTAURANT_DETAIL: '/admin/restaurant/:restaurantNo',
  ADMIN_RESTAURANT_DETAIL_RAW: '/admin/restaurant',
  SEARCH_RAW: '/search/',
  SEARCH: '/search/:query',
  BEST_RAW: '/best/',
  BEST: '/best/:category',
  RESTAURANT_RAW: '/restaurant/',
  RESTAURANT: '/restaurant/:restaurantno',
  RESTAURANT_RESERVATION_RAW: '/reservation',
  RESTAURANT_RESERVATION: '/reservation/:restaurantno',
  RESTAURANT_REGISTRATION_RAW: '/restaurant/registration',
  RESTAURANT_REGISTRATION: '/restaurant/registration/:stepno',
  RESTAURANTMENU_REGISTRATION_RAW: '/restaurantMenu/registration',
  RESTAURANTMENU_REGISTRATION: '/restaurantMenu/registration/:restaurantno',
  MYPAGE_HOME: '/mypage',
  MYPAGE_MAIN: '/mypage/main',
  MYPAGE_HISTORY: '/mypage/history',
  MYPAGE_BOOKMARK: '/mypage/bookmark',
  MYPAGE_REVISE: '/mypage/revise',
  MYPAGE_DROP: '/mypage/drop',
  MYPAGE_REVIEW: '/mypage/review',
  OTHERS: '*',
};
