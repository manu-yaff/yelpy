import { ReactNode, useState } from 'react'
import { Outlet, useNavigate, useSearchParams } from 'react-router'

function SearchForm(): ReactNode {
  const [searchParams] = useSearchParams()

  const [term, setTerm] = useState(searchParams.get('term') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault()

    if (!term.trim()) return
    if (!location.trim()) return

    navigate(`/search?term=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}`)
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="tacos"
            value={term}
            required
            onChange={(e) => setTerm(e.target.value)}
          />
          <input
            placeholder="san francisco"
            value={location}
            required
            onChange={(e) => setLocation(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <Outlet />
    </>
  )
}

export default SearchForm
