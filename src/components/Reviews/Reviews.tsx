import { Review, ReviewsProps } from "../../types/ReviewsProps";
import styles from './Reviews.module.scss';

const Reviews = (props: ReviewsProps) => {
  return (
    <>
      <p>Reviews</p>
      <br />
      {props.reviews.map((review: Review) => {
        return <div>
          <div className={styles['flex-container']}>
            <img src={review.user.image_url} alt="" />
            <p>{review.user.name}</p>
          </div>
          <p>{review.rating}</p>
          <p>{review.text}</p>
        </div>
      })}
    </>
  )
}

export default Reviews;
