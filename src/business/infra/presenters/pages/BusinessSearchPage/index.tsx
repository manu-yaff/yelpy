import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { SearchByTermAndLocationUseCase } from '../../../../application/search-term-and-location'
import { Business } from '../../../../domain/entities/Business'
import { YelpGraphqlRepository } from '../../../repositories/yelp-business'

const apiHost = import.meta.env.VITE_YELP_API_HOST

function SearchPage() {
  const [searchParams] = useSearchParams()

  const term = searchParams.get('term')
  const location = searchParams.get('location')

  const [data, setData] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | Error>(null)

  useEffect(() => {
    const fetchData = async () => {
      const yelpRepo = new YelpGraphqlRepository(fetch, { apiUrl: apiHost })
      const useCase = new SearchByTermAndLocationUseCase(yelpRepo)

      if (term && location) {
        try {
          const result = await useCase.execute(term, location)
          setData(result)
        } catch (error) {
          if (error instanceof Error) setError(error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [location, term])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <h3>Results from the search</h3>
      {data.map((b) => (
        <Link to={`/business/${b.id()}/detail`} key={b.id()}>
          <ul>
            <li>{b.name()}</li>
            <li>{b.phone()}</li>
            <li>{b.address()}</li>
            <li>{b.reviewCount()}</li>
            <li>{b.imageUrl()}</li>
          </ul>
        </Link>
      ))}
    </>
  )
}

export default SearchPage
