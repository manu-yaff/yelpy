import { businessDetailResponse } from '../tests/mocks/businessDetailResponse.js';
import { businessDetailAdapter } from '../adapters/business-detail.adapter.js';
import { BusinessCard } from '../components/BusinessCard.js';
import { BusinessHours } from '../components/BusinessHours.js';
import { ReviewList } from '../components/ReviewList.js';
import { formatDayHours, groupHoursByDay } from '../components/DayHour.js';

export function BusinessDetailPage() {
  const { photos, name, address, displayPhone, reviewCount, isOpen, hours, reviews } =
    businessDetailAdapter(businessDetailResponse);

  const businessCardComponent = BusinessCard({
    imageUrl: photos[0],
    name,
    address,
    reviews: reviewCount,
    phone: displayPhone,
  });

  const businessHoursComponent = BusinessHours({
    isOpen,
    dayHours: formatDayHours(groupHoursByDay(hours)),
  });

  const reviewsComponent = ReviewList(reviews);

  function render(container) {
    container.insertAdjacentHTML('beforeend', businessCardComponent.getMarkup());
    container.insertAdjacentHTML('beforeend', businessHoursComponent.getMarkup());
    container.insertAdjacentHTML('beforeend', reviewsComponent.getMarkup());
  }

  return {
    render,
  };
}
