import { Router } from './index';

describe(Router.name, () => {
  describe(Router.prototype.isValidRoute.name, () => {
    describe.each([
      '/',
      '/search?search_term=tacos&location=manchester',
      '/business/__EvomQ2tE1NtkWn32WEXg',
    ])('valid routes', (route) => {
      it(`should return true for valid route ${route}`, () => {
        // Arrange
        const router = new Router();

        // Act
        const isValid = router.isValidRoute(route);

        // Assert
        expect(isValid).toBe(true);
      });
    });

    describe.each([
      '/home',
      '/business',
      '/search/1',
      '/search?search_term=&location=',
    ])('invalid routes', (route) => {
      it(`should return false for invalid route ${route}`, () => {
        // Arrange
        const router = new Router();

        // Act
        const isValid = router.isValidRoute(route);

        // Assert
        expect(isValid).toBe(false);
      });
    });
  });
});
