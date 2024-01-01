import { FunctionComponent } from 'react';
import { Review } from '../../types/Review';
import ReviewItem from '../ReviewItem/ReviewItem';

interface IProps {
	reviews: Review[];
}

const ReviewsList: FunctionComponent<IProps> = ({ reviews }) => {
	return (
		<>
			<br />
			<h3>Reviews</h3>
			{!reviews.length && <p>There are no reviews for this business</p>}
			<br />
			{reviews.map((review) => (
				<ReviewItem key={review.id} {...review} />
			))}
		</>
	);
};

export default ReviewsList;
