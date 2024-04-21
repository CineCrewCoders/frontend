import { QueryClientProvider } from '@tanstack/react-query'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import { AuthContext } from './context/AuthContext.ts'
import './index.css'
import { queryClient } from './queryClient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthContext.Provider value={null}>
        <App />
      </AuthContext.Provider>
    </BrowserRouter>
  </QueryClientProvider>
)
