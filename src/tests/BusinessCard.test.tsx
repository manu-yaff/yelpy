import BusinessCard from '../components/BusinessCard/BusinessCard';
import { Business } from '../types/Buesiness';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

const location = {
	address1: 'epigmenio gonzalez',
	state: 'Qro',
	city: 'Qro',
	country: 'Mx',
};

const testBusiness: Business = {
	id: '1',
	photos: [
		'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png',
	],
	name: 'Tacos qro',
	location,
	review_count: 90,
	display_phone: '123456789',
};

describe('BusinessCard components tests', () => {
	test('BusinessCard renders correctly', () => {
		const component = render(
			<BrowserRouter>
				<BusinessCard business={testBusiness} />
			</BrowserRouter>
		).container;

		const displayImage = document.querySelector('img') as HTMLImageElement;
		const { name, location, review_count, display_phone } = testBusiness;
		const { address1, city, state, country } = location;
		const completeAddress = `${address1}, ${city}, ${state}, ${country}`;

		expect(displayImage.src).toContain(testBusiness.photos[0]);
		expect(component).toHaveTextContent(name);
		expect(component).toHaveTextContent(completeAddress);
		expect(component).toHaveTextContent(review_count.toString());
		expect(component).toHaveTextContent(display_phone);
	});
});
