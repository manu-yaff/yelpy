import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router'

function SearchForm() {
  const [term, setTerm] = useState('')
  const [location, setLocation] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!term.trim()) return
    if (!location.trim()) return

    navigate(`/search?term=${encodeURIComponent(term)}&location=${encodeURIComponent(location)}`)
  }

  return (
    <>
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
      <Outlet />
    </>
  )
}

export default SearchForm
