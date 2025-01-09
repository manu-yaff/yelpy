import { Button } from './index';

describe(Button.name, () => {
  it('should set type of button as "button" by default when not specified', () => {
    // Arrange

    // Act
    const button = new Button({ text: 'Search', onClick: () => {} });

    // Assert
    expect(button.container.type).toBe('button');
  });

  it('should set type of button', () => {
    // Arrange

    // Act
    const button = new Button({
      text: 'Search',
      type: 'submit',
      onClick: () => {},
    });

    // Assert
    expect(button.container.type).toBe('submit');
  });

  it('should set the text button', () => {
    // Arrange

    // Act
    const button = new Button({
      text: 'Search',
      type: 'submit',
      onClick: () => {},
    });

    // Assert
    expect(button.container.textContent).toBe('Search');
  });

  it('should throw error when giving an invalid button type', () => {
    // Arrange

    // Act

    // Assert
    expect(() => {
      new Button({
        text: 'Search',
        type: 'week',
        onClick: () => {},
      });
    }).toThrow();
  });

  it('should call callback on click', () => {
    // Arrange
    const onClick = jest.fn();

    const button = new Button({
      text: 'Search',
      type: 'button',
      onClick: onClick,
    });

    // Act
    button.container.click();

    // Assert
    expect(onClick).toHaveBeenCalled();
  });
});
