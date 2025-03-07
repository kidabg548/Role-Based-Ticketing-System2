// main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AppContextProvider } from './contexts/AppContext';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <AppContextProvider>  
      <App />
    </AppContextProvider>
  </QueryClientProvider>
</React.StrictMode>
);