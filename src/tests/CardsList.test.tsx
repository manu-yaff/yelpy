import CardsList from '../components/CardsList/CardsList';
import { screen } from '@testing-library/react';
import { testBusinessList, testBusinessListEmpty, renderComponent } from './utils';

describe('BusinessCard component tests', () => {
	test('CardList renders', () => {
		renderComponent(<CardsList businesses={testBusinessList}  />).container;
		const elements = document.getElementsByClassName('card');
		expect(elements).toHaveLength(3);
	});

	test('CardList with no elements renders message', () => {
		const component = renderComponent(<CardsList businesses={testBusinessListEmpty}  />).container;
		const message = 'No businesses found'
		expect(component).toHaveTextContent(message);
	});
});
