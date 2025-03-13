import { ReactNode, SyntheticEvent } from 'react'
import { Link } from 'react-router'
import { Business, DEFAULT_BUSINESS_IMAGE_URL } from '../../../../domain/entities/Business'

interface BusinessCardProps {
  business: Business
  shouldRedirectToDetailPage: boolean
}

function BusinessCard({ business, shouldRedirectToDetailPage }: BusinessCardProps): ReactNode {
  const businessInfo = (
    <ul>
      <li>
        <h3>{business.name()}</h3>
      </li>
      <li>{business.phone()}</li>
      <li>{business.address()}</li>
      <li>{business.reviewCount()} reviews</li>
      <img
        src={business.imageUrl()}
        alt={business.name()}
        onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.src = DEFAULT_BUSINESS_IMAGE_URL
        }}
      />
    </ul>
  )

  return (
    <div className={shouldRedirectToDetailPage ? 'business-card' : 'business-card'}>
      {shouldRedirectToDetailPage ? (
        <Link to={`/business/${business.id()}/detail`}>{businessInfo}</Link>
      ) : (
        businessInfo
      )}
    </div>
  )
}

export default BusinessCard
