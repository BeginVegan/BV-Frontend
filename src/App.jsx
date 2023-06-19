import AppRoutes from '@/routes/AppRoutes';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';
import { font } from './Fonts';
import { Global } from '@emotion/react';

const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const theme = extendTheme({
  fonts: {
    heading: 'NanumSquareNeo-Variable',
    body: 'NanumSquareNeo-Variable',
  },
});

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={clientId}>
          <ChakraProvider theme={theme}>
            <Global styles={font} />
            <AppRoutes />
          </ChakraProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
