import Button from '../components/Button/Button';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Button component tests', () => {
	test('Button renders correctly', () => {
		const mockHandler = jest.fn();
		render(
			<Button handleClick={mockHandler} type="button">
				Search
			</Button>
		);
		const button = screen.getByTestId('button');
		fireEvent.click(button);
		expect(mockHandler).toHaveBeenCalledTimes(1);
		expect(button).toHaveTextContent('Search');
	});
});
