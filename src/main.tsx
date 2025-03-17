
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Index from './pages/Index.tsx'
import Help from './pages/Help.tsx'
import NotFound from './pages/NotFound.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'
import './index.css'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Index />} />
            <Route path="help" element={<Help />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TooltipProvider>
    </BrowserRouter>
  </React.StrictMode>
)
