import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/poppins'; // Defaults to 400 weight
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import UserContext from './context/userContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContext>
  </StrictMode>,
)
