import { ReactNode, SyntheticEvent } from 'react'
import { Review } from '../../../../domain/entities/Review'
import { DEFAULT_USER_PROFILE_URL } from '../../../../domain/entities/User'

interface BusinessReviewsProps {
  reviews: Array<Review>
}

function BusinessReviews({ reviews }: BusinessReviewsProps): ReactNode {
  const formatReviewRating = (rating: number): Array<ReactNode> => {
    return Array.from({ length: rating }, () => <i className="ph-fill ph-star"></i>)
  }

  return (
    <div className="reviews-container">
      <p className="reviews-header">Reviews</p>
      {reviews.length === 0 ? (
        <p className="no-reviews">No reviews found</p>
      ) : (
        reviews.map((review) => (
          <ul key={review.id()} className="review-item">
            <li className="review-date">{review.timeCreated()}</li>
            <li className="review-rating">{formatReviewRating(review.rating())}</li>
            <li className="review-text">{review.text()}</li>
            <li className="review-user">{review.user().name()}</li>
            <img
              className="review-user-profile"
              src={review.user().profileUrl()}
              alt={review.user().name()}
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
