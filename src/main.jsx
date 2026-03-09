import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Registered from './Registered/Registered.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Registered />
  </StrictMode>,
)
