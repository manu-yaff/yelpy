import BusinessCard from '../components/BusinessCard/BusinessCard';
import { testBusinessList, renderComponent, testImage } from './utils';

let component: HTMLElement;

describe('BusinessCard component tests', () => {
	beforeEach(() => {
		component = renderComponent(<BusinessCard {...testBusinessList[0]} />).container;
	});
	test('BusinessCard renders', () => {
		const displayImage = document.querySelector("img") as HTMLImageElement;
		const { name, location, review_count, display_phone } = testBusinessList[0];
		const { address1, city, country } = location;
		const completeAddress = `${address1}, ${city}, ${country}`;
		expect(displayImage.src).toContain(testImage);
		expect(component).toHaveTextContent(name);
		expect(component).toHaveTextContent(completeAddress);
		expect(component).toHaveTextContent(review_count.toString());
		expect(component).toHaveTextContent(display_phone);
	});
});
