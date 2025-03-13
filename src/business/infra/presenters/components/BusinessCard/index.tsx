import { ReactNode } from 'react'
import { Link } from 'react-router'
import { Business } from '../../../../domain/entities/Business'

interface BusinessCardProps {
  business: Business
  shouldRedirectToDetailPage: boolean
}

function BusinessCard({ business, shouldRedirectToDetailPage }: BusinessCardProps): ReactNode {
  const businessInfo = (
    <ul className="business-details">
      <li>{business.name()}</li>
      <li>{business.phone()}</li>
      <li>{business.address()}</li>
      <li>{business.reviewCount()}</li>
      <li>{business.imageUrl()}</li>
    </ul>
  )

  return (
    <>
      <h2>Business information</h2>

      {shouldRedirectToDetailPage ? (
        <Link to={`/business/${business.id()}/detail`} className="business-link">
          {businessInfo}
        </Link>
      ) : (
        businessInfo
      )}
    </>
  )
}

export default BusinessCard
