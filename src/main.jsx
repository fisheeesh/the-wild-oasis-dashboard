import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/index.jsx'
import GlobalStyles from './styles/GlobalStyles.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

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
  </QueryClientProvider>
)
