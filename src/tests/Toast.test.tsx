import Toast from '../components/Toast/Toast';
import { renderComponent } from './utils';
import { screen } from '@testing-library/react';

let component: HTMLElement;

describe('Toast component tests', () => {
	test('Toast renders', () => {
		const component = renderComponent(
			<Toast content='Error' backgroundColor="black" textColor="white"  />
		).container;
		const toast = screen.getByText('Error');
		expect(component).toHaveTextContent('Error');
		expect(toast.style.backgroundColor).toBe("black");
		expect(toast.style.color).toBe("white");
	});
});
