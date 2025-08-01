import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouter } from './routes/AppRouter.tsx';

import './main.css';
import { ThemeProvider } from 'flowbite-react';
import { customTheme } from './customTheme.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={customTheme}>
                <AppRouter />
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>
);
