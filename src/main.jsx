import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './router/index.jsx'
import GlobalStyles from './styles/GlobalStyles.js'

createRoot(document.getElementById('root')).render(
  <>
    <GlobalStyles />
    <Router />
  </>
)
