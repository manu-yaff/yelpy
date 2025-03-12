import { Review } from '../../../../domain/entities/Review'

interface BusinessReviewsProps {
  reviews: Array<Review>
}

function BusinessReviews({ reviews }: BusinessReviewsProps) {
  return (
    <div>
      <h3>Reviews</h3>

      {reviews.map((review) => (
        <ul key={review.id()}>
          <li>{review.timeCreated()}</li>
          <li>{review.rating()}</li>
          <li>{review.text()}</li>
          <li>{review.user().name()}</li>
          <li>{review.user().profileUrl()}</li>
        </ul>
      ))}
    </div>
  )
}

export default BusinessReviews
