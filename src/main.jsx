import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ThemeState from './context/Theme/ThemeState.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeState>
      <App />
    </ThemeState>
  </BrowserRouter>,
)
