import { Layout } from './index';

describe(Layout.name, () => {
  it('should have search form', () => {
    // Arrange

    // Act
    const layout = new Layout();

    // Assert
    expect(layout.container.firstElementChild).toBeInstanceOf(HTMLFormElement);
  });
});
