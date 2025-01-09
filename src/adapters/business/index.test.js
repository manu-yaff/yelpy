import { SHARED } from '../../shared/constants';
import { adaptBusinessObject } from './index';

describe(adaptBusinessObject.name, () => {
  describe('business id', () => {
    it('should return business id', () => {
      // Arrange
      const businessId = '__EvomQ2tE1NtkWn32WEXg';

      // Act
      const business = adaptBusinessObject({ id: businessId });

      // Assert
      expect(business).toHaveProperty('id');
      expect(business.id).toBe(businessId);
    });
  });

  describe('business name', () => {
    it('should return business name', () => {
      // Arrange
      const businessName = 'Sin City Burger';

      // Act
      const business = adaptBusinessObject({ name: businessName });

      // Assert
      expect(business).toHaveProperty('name');
      expect(business.name).toBe(businessName);
    });

    it('should set business name to null when name is not available', () => {
      // Arrange
      const businessName = '';

      // Act
      const business = adaptBusinessObject({ name: businessName });

      // Assert
      expect(business).toHaveProperty('name');
      expect(business.name).toBe(null);
    });
  });

  describe('business phone', () => {
    it('should return business phone', () => {
      // Arrange
      const businessPhone = '(646) 350-2429';

      // Act
      const business = adaptBusinessObject({ display_phone: businessPhone });

      // Assert
      expect(business).toHaveProperty('phone');
      expect(business.phone).toBe(businessPhone);
    });

    it('should return null when business phone is not available', () => {
      // Arrange
      const businessPhone = '';

      // Act
      const business = adaptBusinessObject({ display_phone: businessPhone });

      // Assert
      expect(business).toHaveProperty('phone');
      expect(business.phone).toBe(null);
    });
  });

  describe('business image url', () => {
    it('should return business image url', () => {
      // Arrange
      const businessPhotos = [
        'https://s3-media3.fl.yelpcdn.com/bphoto/i3kwsfrNgtxP4L6nJE9lxQ/o.jpg',
      ];

      // Act
      const business = adaptBusinessObject({ photos: businessPhotos });

      // Assert
      expect(business).toHaveProperty('imageUrl');
      expect(business.imageUrl).toBe(businessPhotos[0]);
    });

    it('should return placeholder image when photos array is empty', () => {
      // Arrange
      const businessPhotos = [];
      const defaultBusinessUrl = SHARED.assets.imageNotFoundPath;

      // Act
      const business = adaptBusinessObject({ photos: businessPhotos });
      // Assert
      expect(business).toHaveProperty('imageUrl');
      expect(business.imageUrl).toBe(defaultBusinessUrl);
    });

    it('should return placeholder image when photos property is missing', () => {
      // Arrange
      const defaultBusinessUrl = SHARED.assets.imageNotFoundPath;

      // Act
      const business = adaptBusinessObject({});
      // Assert
      expect(business).toHaveProperty('imageUrl');
      expect(business.imageUrl).toBe(defaultBusinessUrl);
    });
  });

  describe('business address', () => {
    it('should return business address', () => {
      // Arrange
      const location = {
        formatted_address: '1 Eldridge St\nSte 3\nNew York, NY 10002',
      };

      // Act
      const business = adaptBusinessObject({ location });

      // Assert
      expect(business).toHaveProperty('address');
      expect(business.address).toBe(location.formatted_address);
    });

    it('should return null when business address is not available', () => {
      // Arrange
      const location = {
        formatted_address: '',
      };

      // Act
      const business = adaptBusinessObject({ location });

      // Assert
      expect(business).toHaveProperty('address');
      expect(business.address).toBe(null);
    });

    it('should return null when business location property is missing', () => {
      // Arrange

      // Act
      const business = adaptBusinessObject({});

      // Assert
      expect(business).toHaveProperty('address');
      expect(business.address).toBe(null);
    });
  });

  describe('business review count', () => {
    it('should return bussiness review count', () => {
      // Arrange
      const reviewCount = 10;

      // Act
      const business = adaptBusinessObject({ review_count: reviewCount });

      // Assert
      expect(business).toHaveProperty('reviewsCount');
      expect(business.reviewsCount).toBe(reviewCount);
    });
  });
});
