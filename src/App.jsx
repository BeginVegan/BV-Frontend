import AppRoutes from '@/routes/AppRoutes';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={clientId}>
          <ChakraProvider>
            <AppRoutes />
          </ChakraProvider>
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
