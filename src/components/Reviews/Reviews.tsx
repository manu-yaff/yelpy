import { Review, ReviewsProps } from "../../types/ReviewsProps";
import styles from './Reviews.module.scss';
import starIcon from '../../assets/star.png';
import userPlaceHolder from '../../assets/user-placeholder.png';

const Reviews = (props: ReviewsProps) => {

	const imageErrorHandler = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
		console.log('here');
		event.currentTarget.src = userPlaceHolder;
	};

	const ratingStars = (rating: number, reviewId: string) => {
		const result = [];
		for (let i = 0; i < rating; i++) {
			result.push(<img key={reviewId + i} className={styles['star-icon']} src={starIcon} alt="star icon" />);
		}
		return result;
	};

	const setImage = (hasImage: string): string => {
		console.log('here, ', hasImage);
		if (hasImage) {
			console.log('has image')
			return hasImage
		} else {
			return userPlaceHolder;
		}
	};

  if (props.reviews.length === 0) {
    return <p>Reviews not available</p>
  }

  return (
    <>
      <h1>Reviews</h1>
      {props.reviews.map((review: Review) => {
        return <div className={styles['review']} key={review.id}>
          <div className={styles['review-user-info']}>
            {<img src={setImage(review.user.image_url)} alt="user" onError={imageErrorHandler} />}
            <p>{review.user.name}</p>
          </div>
					{ratingStars(review.rating, review.id).map((star) => {
						return star
					})}
          <p className={styles['text-review']}>{review.text}</p>
        </div>
      })}
    </>
  )
}

export default Reviews;
