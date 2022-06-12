import { fireEvent, RenderResult } from '@testing-library/react';
import { renderComponent } from './utils';
import { screen } from '@testing-library/react';
import Button from '../components/Button/Button';

let component: HTMLElement;

describe('Button component tests', () => {
	const buttonTitle = 'Search';
	const mockHandler = jest.fn();

	beforeEach(() => {
		component = renderComponent(
			<Button onClick={mockHandler}>{buttonTitle}</Button>
		).container;
	});

	test('Button renders', () => {
		expect(component).toHaveTextContent(buttonTitle);
	});

	test('Button handles click', () => {
		const button = screen.getByText(buttonTitle)
		fireEvent.click(button);
		expect(mockHandler).toHaveBeenCalledTimes(1);
	});
});
