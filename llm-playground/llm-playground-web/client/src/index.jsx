import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SETTINGS } from '../settings.js'


// Set document language:
document.documentElement.setAttribute('lang', SETTINGS.LANG);
document.documentElement.setAttribute('dir', SETTINGS.LANG == 'he' ? 'rtl' : 'ltr');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
