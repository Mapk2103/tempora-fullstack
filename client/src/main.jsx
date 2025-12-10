import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'
import './index.css'

// Configurar React Query con opciones optimizadas
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // Los datos se consideran frescos por 5 minutos
      cacheTime: 10 * 60 * 1000, // Los datos se mantienen en caché por 10 minutos
      refetchOnWindowFocus: false, // No refetch al volver a la ventana
      retry: 1, // Solo reintentar una vez en caso de error
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)



