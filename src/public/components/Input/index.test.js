import { Input } from './index';

describe(Input.name, () => {
  it('should set input type', () => {
    // Arrange
    const properties = {
      labelText: 'Search term',
      type: 'password',
      placeholder: 'eg. Tacos',
      name: 'search-term',
      required: true,
      value: 'Tacos',
    };

    // Act
    const inputComponent = new Input(properties);
    const inputTag = inputComponent.container.querySelector('input');

    // Assert
    expect(inputTag.type).toBe(properties.type);
  });

  it('should set input label text', () => {
    // Arrange
    const properties = {
      labelText: 'Search term',
      type: 'text',
      placeholder: 'eg. Tacos',
      name: 'search-term',
      required: true,
      value: 'Tacos',
    };

    // Act
    const inputComponent = new Input(properties);
    const labelTag = inputComponent.container.querySelector('label');

    // Assert
    expect(labelTag.textContent).toBe(properties.labelText);
  });

  it('should set input placeholder', () => {
    // Arrange
    const properties = {
      labelText: 'Search term',
      type: 'text',
      placeholder: 'eg. Tacos',
      name: 'search-term',
      required: true,
      value: 'Tacos',
    };

    // Act
    const inputComponent = new Input(properties);
    const inputTag = inputComponent.container.querySelector('input');

    // Assert
    expect(inputTag.placeholder).toBe(properties.placeholder);
  });

  it('should set input name', () => {
    // Arrange
    const properties = {
      labelText: 'Search term',
      type: 'text',
      placeholder: 'eg. Tacos',
      name: 'search-term',
      required: true,
      value: 'Tacos',
    };

    // Act
    const inputComponent = new Input(properties);
    const inputTag = inputComponent.container.querySelector('input');

    // Assert
    expect(inputTag.name).toBe(properties.name);
  });

  it('should set input required', () => {
    // Arrange
    const properties = {
      labelText: 'Search term',
      type: 'text',
      placeholder: 'eg. Tacos',
      name: 'search-term',
      required: true,
      value: 'Tacos',
    };

    // Act
    const inputComponent = new Input(properties);
    const inputTag = inputComponent.container.querySelector('input');

    // Assert
    expect(inputTag.required).toBe(properties.required);
  });

  it('should set input value', () => {
    // Arrange
    const properties = {
      labelText: 'Search term',
      type: 'text',
      placeholder: 'eg. Tacos',
      name: 'search-term',
      required: true,
      value: 'Tacos',
    };

    // Act
    const inputComponent = new Input(properties);
    const inputTag = inputComponent.container.querySelector('input');

    // Assert
    expect(inputTag.value).toBe(properties.value);
  });
});
