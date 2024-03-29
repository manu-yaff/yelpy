import { businessDetailResponse } from '../tests/mocks/businessDetailResponse.js';
import { businessDetailAdapter } from '../adapters/business-detail.adapter.js';
import { BusinessCard } from '../components/BusinessCard.js';
import { BusinessHours } from '../components/BusinessHours.js';
import { ReviewList } from '../components/ReviewList.js';
import { formatDayHours, groupHoursByDay } from '../components/DayHour.js';
import { getBusinessDetail } from '../external/api.js';

export async function BusinessDetailPage() {
  const businessId = window.location.pathname.split('/business-')[1];

  const businessDetail = await getBusinessDetail(businessId);
  const adaptedResponse = businessDetailAdapter(businessDetail);

  const { photos, name, address, displayPhone, reviewCount, isOpen, hours, reviews } =
    adaptedResponse;

  const businessCardComponent = BusinessCard({
    imageUrl: photos[0],
    name,
    address,
    reviews: reviewCount,
    phone: displayPhone,
  });

  const businessHoursComponent = BusinessHours({
    isOpen,
    dayHours: hours.length > 0 ? formatDayHours(groupHoursByDay(hours)) : [],
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
