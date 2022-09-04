import { render, screen } from '@testing-library/react';
import BusinessHours from '../components/BusinessHours/BusinessHours';
import { BusinessDetail } from '../types/Business';

const location = {
	address1: 'epigmenio gonzalez',
	state: 'Qro',
	city: 'Qro',
	country: 'Mx',
};

const testBusiness: BusinessDetail = {
	id: '1',
	photos: [
		'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png',
	],
	name: 'Tacos qro',
	location,
	review_count: 90,
	display_phone: '123456789',
	is_close: false,
	hours: [],
	reviews: [],
};

const businessWithHours = {
	...testBusiness,
	hours: [
		{
			is_open_now: true,
			open: [
				{
					day: 0,
					start: '1200',
					end: '2300',
				},
			],
		},
	],
};

describe('Open hours component tests', () => {
	test('Open hours when array is empty', () => {
		const component = render(
			<BusinessHours businesHours={testBusiness.hours[0]} />
		).container;
		expect(component).toHaveTextContent('Business hours not available');
	});
	test('Open hours renders', () => {
		const component = render(
			<BusinessHours businesHours={businessWithHours.hours[0]} />
		).container;
		expect(component).toHaveTextContent('Monday');
		expect(component).toHaveTextContent('12:00 pm');
		expect(component).toHaveTextContent('23:00 pm');
	});
});
