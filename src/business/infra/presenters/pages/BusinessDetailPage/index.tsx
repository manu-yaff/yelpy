import { ReactNode, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { GetBusinessDetailUseCase } from '../../../../application/get-business-detail'
import { BusinessDetail, OpeningStatus } from '../../../../domain/entities/BusinessDetail'
import { YelpGraphqlRepository } from '../../../repositories/yelp-business'
import BusinessCard from '../../components/BusinessCard'
import BusinessHours from '../../components/BusinessHours'
import BusinessReviews from '../../components/BusinessReviews'

const API_HOST = import.meta.env.VITE_YELP_API_HOST

function BusinessDetailPage(): ReactNode {
  const { id } = useParams()
  const [data, setData] = useState<BusinessDetail>()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | Error>(null)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      const yelpRepo = new YelpGraphqlRepository(fetch, { apiUrl: API_HOST })
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
      {data && (
        <h3 className={data.isOpen() === OpeningStatus.Open ? 'business-open' : 'business-closed'}>
          {data.isOpen()}
        </h3>
      )}

      {data && <BusinessCard business={data.business()} shouldRedirectToDetailPage={false} />}

      {data && <BusinessHours hours={data.hours()} />}

      {data && <BusinessReviews reviews={data.reviews()} />}
    </>
  )
}

export default BusinessDetailPage
