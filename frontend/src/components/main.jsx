import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../assets/index.css'
// import App from '../components/App'

import Index from '../components/Index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Index/>
  </StrictMode>,
)
