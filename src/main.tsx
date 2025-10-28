import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './DetailedAnalysis.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App formData={undefined} calculatedData={undefined} onUpdateFormData={function (field: string, value: number): void {
      throw new Error('Function not implemented.')
    } } />
  </StrictMode>,
)
