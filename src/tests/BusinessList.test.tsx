import { render } from '@testing-library/react';
import { Business } from '../types/Business';
import BusinessList from '../components/BusinessList/BusinessList';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/';

const location = {
	address1: 'epigmenio gonzalez',
	state: 'Qro',
	city: 'Qro',
	country: 'Mx',
};

const testBusiness: Business[] = [
	{
		id: '1',
		photos: [
			'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/800px-Unofficial_JavaScript_logo_2.svg.png',
		],
		name: 'Tacos qro',
		location,
		review_count: 90,
		display_phone: '123456789',
	},
];

describe('BusinessList component tests', () => {
	test('BusinessList component renders empty list', () => {
		const component = render(
			<Provider store={store}>
				<BrowserRouter>
					<BusinessList list={[]} />
				</BrowserRouter>
			</Provider>
		).container;
		expect(component).toHaveTextContent(/^No results found$/);
	});
	test('BusinessList component renders list correctly', () => {
		render(
			<Provider store={store}>
				<BrowserRouter>
					<BusinessList list={testBusiness} />
				</BrowserRouter>
			</Provider>
		).container;
		const elements = document.getElementsByClassName('business-card');
		expect(elements).toHaveLength(1);
	});
});
