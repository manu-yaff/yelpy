import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import BusinessDetailPage from './business/infra/presenters/BusinessDetailPage'
import HomePage from './business/infra/presenters/HomePage'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/business/detail" element={<BusinessDetailPage />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
