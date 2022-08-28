import { FunctionComponent } from 'react';
import { Review } from '../../types/Review';
import imgPlaceholder from '../../assets/img-placeholder.png';
import style from './ReviewItem.module.scss';
import starIcon from '../../assets/star_icon.png';

const ReviewItem: FunctionComponent<Review> = (review) => {
	const ratingStars = (rating: number) => {
		const result = [];
		for (let i = 0; i < rating; i++) {
			result.push(
				<img
					key={i}
					className={style['star-icon']}
					src={starIcon}
					alt="star icon"
				/>
			);
		}
		return result;
	};

	return (
		<div className={style['review-container']}>
			<div className={style['user']}>
				<img
					className={style['user-picture']}
					src={review.user.image_url ? review.user.image_url : imgPlaceholder}
					alt="business"
					onError={(event: React.SyntheticEvent<HTMLImageElement, Event>) =>
						(event.currentTarget.src = imgPlaceholder)
					}
				/>
				<p>{review.user.name}</p>
			</div>
			<p>{ratingStars(review.rating)}</p>
			<p>{review.text}</p>
		</div>
	);
};

export default ReviewItem;
