import Input from '../components/Input/Input';
import { render, screen, fireEvent } from '@testing-library/react';
import { MdOutlineSearch } from 'react-icons/md';

describe('Input component tests', () => {
	test('Input renders correctly', () => {
		const mockHandler = jest.fn();
		render(
			<Input
				placeholder="Search"
				icon={<MdOutlineSearch />}
				cornersStyle="left-rounded"
				onChange={mockHandler}
			/>
		);
		const inputContainer = screen.getByTestId('input-container');
		expect(inputContainer).toBeInTheDocument;
		expect(inputContainer.classList.contains('input--left-rounded')).toBe(true);

		const input = screen.getByTestId('input');
		fireEvent.change(input, {
			target: { value: 'new value' },
		});
		expect(mockHandler).toHaveBeenCalledTimes(1);
	});
});
