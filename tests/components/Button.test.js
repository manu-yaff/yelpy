import { Button } from '../../components/Button.js';
import { getByText, fireEvent } from '@testing-library/dom';

describe('Button', () => {
  describe('render', () => {
    it('should render button with type `button` by default', () => {
      const mockFunction = jest.fn();
      const buttonProps = { text: 'testing button', onClick: mockFunction };
      const button = new Button(buttonProps);

      const buttonElement = getByText(button.container, buttonProps.text);

      expect(button.container.type).toBe('button');

      fireEvent.click(buttonElement);

      expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
      expect(mockFunction).toBeCalled();
    });

    it('should render button with specified type', () => {
      const buttonProps = { text: 'testing button', onClick: function () {}, type: 'submit' };
      const button = new Button(buttonProps);

      const buttonElement = getByText(button.container, buttonProps.text);

      expect(buttonElement).toBeInstanceOf(HTMLButtonElement);
      expect(button.container.type).toBe(buttonProps.type);
    });
  });
});
