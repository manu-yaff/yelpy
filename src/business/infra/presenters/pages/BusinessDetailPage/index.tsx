import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { GetBusinessDetailUseCase } from '../../../../application/get-business-detail'
import { BusinessDetail } from '../../../../domain/entities/BusinessDetail'
import { YelpGraphqlRepository } from '../../../repositories/yelp-business'
import BusinessCard from '../../components/BusinessCard'
import BusinessHours from '../../components/BusinessHours'
import BusinessReviews from '../../components/BusinessReviews'

const apiHost = import.meta.env.VITE_YELP_API_HOST

function BusinessDetailPage() {
  const { id } = useParams()
  const [data, setData] = useState<BusinessDetail>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | Error>(null)

  useEffect(() => {
    const fetchData = async () => {
      const yelpRepo = new YelpGraphqlRepository(fetch, { apiUrl: apiHost })
      const useCase = new GetBusinessDetailUseCase(yelpRepo)

      if (id) {
        try {
          const result = await useCase.execute(id)
          setData(result)
        } catch (error) {
          if (error instanceof Error) setError(error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchData()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <h3>Business info</h3>
      {data && <BusinessCard business={data.business()} shouldRedirectToDetailPage={false} />}

      <h3>Hours</h3>
      {data && <BusinessHours hours={data.hours()} />}

      <h3>Reviews</h3>
      {data && <BusinessReviews reviews={data.reviews()} />}
    </>
  )
}

export default BusinessDetailPage
