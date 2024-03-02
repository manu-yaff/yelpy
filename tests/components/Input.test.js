import { Input } from '../../components/Input.js';
import { getByText, getByPlaceholderText, fireEvent } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

describe('Input', () => {
  describe('render', () => {
    it('should render component correctly', () => {
      const inputProps = {
        parentNode: document.createElement('div'),
        type: 'text',
        labelText: 'Input for test',
        placeholder: 'Introduce something',
        name: 'testing-input',
        validator: function (value) {
          return value.length != 0;
        },
      };

      const input = new Input(inputProps);

      getByText(input.container, inputProps.labelText);
      getByPlaceholderText(input.container, inputProps.placeholder);
    });
  });

  describe('interactions', () => {
    it('should return true for input validation when input value is valid', async () => {
      const inputProps = {
        parentNode: document.createElement('div'),
        type: 'text',
        labelText: 'Input for test',
        placeholder: 'Introduce something',
        name: 'testing-input',
        validator: function (value) {
          return value.length != 0;
        },
      };

      const user = userEvent.setup();

      const input = new Input(inputProps);

      const inputElement = getByPlaceholderText(input.container, inputProps.placeholder);

      fireEvent.input(inputElement, { target: { value: 'tacos' } });

      const isValid = input.validate();

      // TODO: check userEvent.type does not fire listener on input
      // await user.type(inputElement, 'tacos');
      expect(isValid).toBe(true);
    });

    it('should return false for input validation when input value is invalid', async () => {
      const inputProps = {
        parentNode: document.createElement('div'),
        type: 'text',
        labelText: 'Input for test',
        placeholder: 'Introduce something',
        name: 'testing-input',
        validator: function (value) {
          return value.trim().length != 0;
        },
      };

      const user = userEvent.setup();

      const input = new Input(inputProps);

      const inputElement = getByPlaceholderText(input.container, inputProps.placeholder);

      fireEvent.input(inputElement, { target: { value: '  ' } });

      const isValid = input.validate();

      expect(isValid).toBe(false);
    });
  });
});
