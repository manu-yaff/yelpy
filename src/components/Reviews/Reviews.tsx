import { Review, ReviewsProps } from "../../types/ReviewsProps";
import styles from './Reviews.module.scss';
import starIcon from '../../assets/star.png';

const Reviews = (props: ReviewsProps) => {
	const ratingStars = (rating: number) => {
		const result = [];
		for (let i = 0; i < rating; i++) {
			result.push(<img className={styles['star-icon']} src={starIcon} alt="star icon" />);
		}
		return result;
	};

  return (
    <>
      <h1>Reviews</h1>
      {props.reviews.map((review: Review) => {
        return <div>
          <div className={styles['flex-container']}>
            <img src={review.user.image_url} alt="" />
            <p>{review.user.name}</p>
          </div>
					{ratingStars(review.rating).map((star) => {
						return star
					})}
          <p className={styles['text-review']}>{review.text}</p>
        </div>
      })}
    </>
  )
}

export default Reviews;
