import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/index.jsx'
import GlobalStyles from './styles/GlobalStyles.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * ? The amount of the time data will still fresh in the cache.
       * ? It will stay valid until refetch again. 
       * $ When it was in stale state, it will trigger re-fetch.
       */
      // staleTime: 60 * 1000
      staleTime: 0
    }
  }
})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} />
    <GlobalStyles />
    <Router />
    <Toaster position='top-center' gutter={12} containerStyle={{ margin: '8px', }} toastOptions={{
      success: {
        duration: 3000
      },
      error: {
        duration: 5000
      },
      style: {
        textAlign: 'center',
        fontSize: '16px',
        maxWidth: '500px',
        padding: '16px 24px',
        backgroundColor: 'var(--color-grey-0)',
        color: 'var(--color-grey-700)'
      }
    }} />
  </QueryClientProvider>
)
