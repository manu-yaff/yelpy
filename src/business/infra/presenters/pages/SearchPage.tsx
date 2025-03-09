import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router'
import { SearchByTermAndLocationUseCase } from '../../../application/search-by-term-and-location'
import { Business } from '../../../domain/entities/business'
import { YelpGraphqlRepository } from '../../repositories/yelp-business-repository'

function SearchPage() {
  const [searchParams] = useSearchParams()
  const term = searchParams.get('term')
  const location = searchParams.get('location')

  const [data, setData] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | Error>(null)

  useEffect(() => {
    const fetchData = async () => {
      const yelpRepo = new YelpGraphqlRepository(fetch)
      const useCase = new SearchByTermAndLocationUseCase(yelpRepo)

      if (term && location) {
        try {
          const result = await useCase.execute(term, location)
          setData(result)
        } catch (error) {
          console.log(error)
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
        <Link to={`/business/${b.id}/detail`} key={b.id}>
          <ul>
            <li>{b.id}</li>
            <li>{b.name}</li>
            <li>{b.phone}</li>
            <li>{b.address}</li>
            <li>{b.reviewCount}</li>
            <li>{b.imageUrl}</li>
          </ul>
        </Link>
      ))}
    </>
  )
}

export default SearchPage
