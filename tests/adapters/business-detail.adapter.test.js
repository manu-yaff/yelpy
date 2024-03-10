import { businessDetailAdapter } from '../../adapters/business-detail.adapter.js';
import { DEFAULT_USER_PROFILE_PIC_URL, IMAGE_NOT_FOUND_PATH } from '../../constants.js';
import { businessDetailResponse } from '../mocks/businessDetailResponse.js';

describe('businessDetailAdapter', () => {
  it('should adapt business detail response as expected', () => {
    const expectedResult = {
      name: 'Garaje',
      id: 'tnhfDv5Il8EaGSXZGiuQGg',
      displayPhone: '(415) 644-0838',
      reviewCount: 1758,
      rating: 4.3,
      isOpen: false,
      photos: ['https://s3-media2.fl.yelpcdn.com/bphoto/RNCNNS1PCzp6ket6rZX8Cw/o.jpg'],
    };

    const result = businessDetailAdapter(businessDetailResponse);

    expect(result).toEqual(
      expect.objectContaining({
        ...expectedResult,
        hours: expect.any(Array),
        reviews: expect.any(Array),
      })
    );
  });

  it('should set default photo url when no photos are available from response', () => {
    const result = businessDetailAdapter({ ...businessDetailResponse, photos: [] });

    expect(result).toEqual(expect.objectContaining({ photos: IMAGE_NOT_FOUND_PATH }));
  });

  it('should show default message when fields are not specified', () => {
    const result = businessDetailAdapter({
      ...businessDetailResponse,
      display_phone: undefined,
      review_count: undefined,
      rating: undefined,
      hours: [{ is_open: undefined, open: [] }],
    });

    expect(result).toEqual(
      expect.objectContaining({
        displayPhone: 'Phone not available',
        reviewCount: 'No reviews were found',
        rating: 'Rating not available',
        isOpen: 'Info not available',
      })
    );
  });

  it('should should default message when start or date is not defined for hour', () => {
    const result = businessDetailAdapter({
      ...businessDetailResponse,
      hours: [
        {
          open: [
            {
              day: 0,
              start: undefined,
              end: undefined,
            },
          ],
        },
      ],
    });

    expect(result).toEqual(
      expect.objectContaining({
        hours: [{ day: 0, start: 'Start hour not provided', end: 'End hour not provided' }],
      })
    );
  });

  it('should set default avatar image when user profile picture is not available', () => {
    const result = businessDetailAdapter({
      ...businessDetailResponse,
      reviews: [
        {
          rating: 5,
          text: 'some review text',
          time_created: '2024-02-16 23:18:05',
          user: {
            profile_url: undefined,
            name: undefined,
          },
        },
      ],
    });

    expect(result).toEqual(
      expect.objectContaining({
        reviews: [
          {
            rating: 5,
            text: 'some review text',
            timeCreated: '2024-02-16 23:18:05',
            user: {
              profileUrl: DEFAULT_USER_PROFILE_PIC_URL,
              name: 'Name not provided',
            },
          },
        ],
      })
    );
  });
});
