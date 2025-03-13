import { ReactNode, SyntheticEvent } from 'react'
import { Review } from '../../../../domain/entities/Review'
import { DEFAULT_USER_PROFILE_URL } from '../../../../domain/entities/User'

interface BusinessReviewsProps {
  reviews: Array<Review>
}

function BusinessReviews({ reviews }: BusinessReviewsProps): ReactNode {
  return (
    <div>
      <p>Reviews</p>
      {reviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        reviews.map((review) => (
          <ul key={review.id()}>
            <li>{review.timeCreated()}</li>
            <li> {review.rating()}</li>
            <li>{review.text()}</li>
            <li>{review.user().name()}</li>
            <img
              src={review.user().profileUrl()}
              alt="profile user"
              onError={(e: SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.src = DEFAULT_USER_PROFILE_URL
              }}
            />
          </ul>
        ))
      )}
    </div>
  )
}

export default BusinessReviews
