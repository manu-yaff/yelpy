import { businessDetailAdapter } from '../adapters/business-detail.adapter.js';
import { BusinessCard } from '../components/BusinessCard.js';
import { BusinessHours } from '../components/BusinessHours.js';
import { formatDayHours, groupHoursByDay } from '../components/OpeningDayHours.js';
import { getBusinessDetail } from '../external/api.js';

export async function BusinessDetailPage() {
  const componentContainer = document.createElement('div');
  const { id } = window.router.getUrlParams();

  const response = await getBusinessDetail(id);
  const businessDetail = businessDetailAdapter(response);
  const { photos, name, address, displayPhone, reviewCount, isOpen, hours, reviews } =
    businessDetail;

  const businessCard = BusinessCard({
    name,
    address,
    reviews: reviewCount,
    phone: displayPhone,
    imageUrl: photos[0],
  });

  const businessHours = BusinessHours({
    isOpen,
    dayHours: hours.length > 0 ? formatDayHours(groupHoursByDay(hours)) : [],
  });

  initComponent();

  function initComponent() {
    componentContainer.insertAdjacentText('beforeend', 'detail');

    componentContainer.append(businessCard.getContainer());
    componentContainer.append(businessHours.getContainer());
  }

  function getContainer() {
    return componentContainer;
  }

  return {
    getContainer,
  };
}
