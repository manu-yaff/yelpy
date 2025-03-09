import { useEffect, useState } from 'react'
import { SearchByTermAndLocationUseCase } from '../../application/search-by-term-and-location'
import { Business } from '../../domain/entities/business'
import { YelpGraphqlRepository } from '../repositories/yelp-business-repository'

function HomePage() {
  const [data, setData] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | Error>(null)

  useEffect(() => {
    const fetchData = async () => {
      const yelpRepo = new YelpGraphqlRepository(fetch)
      const useCase = new SearchByTermAndLocationUseCase(yelpRepo)

      try {
        const result = await useCase.execute('tacos', 'san francisco')
        setData(result)
      } catch (error) {
        console.log(error)
        if (error instanceof Error) setError(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      {data.map((b) => (
        <ul key={b.id}>
          <li>{b.id}</li>
          <li>{b.name}</li>
          <li>{b.phone}</li>
          <li>{b.address}</li>
          <li>{b.reviewCount}</li>
          <li>{b.imageUrl}</li>
        </ul>
      ))}
    </>
  )
}

export default HomePage
