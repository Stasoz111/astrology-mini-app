import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const tg = window.Telegram.WebApp;
tg.ready();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App tg={tg} />
  </StrictMode>
)
