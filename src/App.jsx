import AppRoutes from '@/routes/AppRoutes';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId={clientId}>
        <ChakraProvider>
          <AppRoutes />
        </ChakraProvider>
      </GoogleOAuthProvider>
    </QueryClientProvider>
  );
}

export default App;
