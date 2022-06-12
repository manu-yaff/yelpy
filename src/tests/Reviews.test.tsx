import Reviews from '../components/Reviews/Reviews';
import { testReviews, testReviewsEmpty , renderComponent } from './utils';

describe('Reviews component tests', () => {
	test('Reviews renders', () => {
		renderComponent(<Reviews  reviews={testReviews} />).container;
		const elements = document.getElementsByClassName('review');
		expect(elements).toHaveLength(2);
		const displayImage = document.querySelector("img") as HTMLImageElement;
		expect(displayImage.src).toContain(testReviews[0].user.image_url);
	});

	test('Reviews array is empty', () => {
		const component = renderComponent(<Reviews reviews={testReviewsEmpty} />).container;
		expect(component).toHaveTextContent('Reviews not available');
	});
});
