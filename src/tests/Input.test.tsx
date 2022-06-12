import Input	 from '../components/Input/Input';
import locationIcon from '../assets/location-icon.png';
import { renderComponent } from './utils';
import { fireEvent, screen } from '@testing-library/react';

describe('Input component tests', () => {
	test('Input renders', () => {
		const mockHandler = jest.fn();
		const component = renderComponent(
			<Input
				onChange={mockHandler}
				placeholder='Search'
				icon={locationIcon}
				roundedRight={false} />
		);

		const inputElement = screen.getByPlaceholderText('Search');
		expect(inputElement).toBeInTheDocument();
		expect(inputElement?.classList.contains('input--left-rounded')).toBe(true)
		fireEvent.change(inputElement, { target: { value: 'new value' } } );
		expect(mockHandler).toHaveBeenCalledTimes(1);
	});
});
