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
      <li>
        <i className="ph ph-phone"></i>
        <span>{business.phone()}</span>
      </li>
      <li>
        <i className="ph ph-map-pin"></i>
        <span>{business.address()}</span>
      </li>
      <li>
        <i className="ph ph-sparkle"></i>
        <span>{business.reviewCount()} reviews</span>
      </li>
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
    <div className="business-card">
      {shouldRedirectToDetailPage ? (
        <Link to={`/business/${business.id()}/detail`}>{businessInfo}</Link>
      ) : (
        businessInfo
      )}
    </div>
  )
}

export default BusinessCard
