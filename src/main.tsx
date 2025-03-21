import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import SearchForm from './business/infra/presenters/components/SearchForm'
import BusinessDetailPage from './business/infra/presenters/pages/BusinessDetailPage'
import SearchPage from './business/infra/presenters/pages/BusinessSearchPage'
import HomePage from './business/infra/presenters/pages/HomePage'
import NotFound from './business/infra/presenters/pages/NotFound'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchForm />}>
          <Route index element={<HomePage />}></Route>
          <Route path="/search" element={<SearchPage />}></Route>
          <Route path="/business/:id/detail" element={<BusinessDetailPage />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
)
