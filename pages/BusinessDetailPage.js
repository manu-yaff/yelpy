import { BusinessCard } from '../components/BusinessCard.js';
import { BusinessHours } from '../components/BusinessHours.js';
import { ErrorComponent } from '../components/Error.js';
import { Loader } from '../components/Loader.js';
import { formatDayHours, groupHoursByDay } from '../components/OpeningDayHours.js';
import { ReviewList } from '../components/ReviewList.js';
import { getBusinessDetail } from '../external/api.js';
import { FetchData } from '../utils/fetcher.js';

export async function BusinessDetailPage() {
  const componentContainer = document.createElement('div');
  const { id } = window.router.getUrlParams();

  const loaderComponent = Loader();
  const errorComponent = ErrorComponent();

  function getContainer() {
    return componentContainer;
  }

  function initComponent() {
    FetchData({
      callback: () => getBusinessDetail(id),
      observer: function (_, property, value, __) {
        const isLoading = property == 'loading' && value;
        const isError = property == 'error' && value;
        const isData = property == 'data' && value;

        if (isLoading) {
          componentContainer.replaceChildren();
          componentContainer.appendChild(loaderComponent.getContainer());
        }

        if (isError) {
          componentContainer.replaceChildren();
          componentContainer.appendChild(errorComponent.getContainer());
        }

        if (isData) {
          const { photos, name, address, phone, reviewsCount, isOpen, hours, reviews } = value;

          const businessCard = BusinessCard({
            name,
            address,
            phone,
            reviewsCount,
            imageUrl: photos[0],
          });

          const businessHours = BusinessHours({
            isOpen,
            dayHours: hours.length > 0 ? formatDayHours(groupHoursByDay(hours)) : [],
          });

          const reviewsComponent = ReviewList({ items: reviews });

          componentContainer.replaceChildren();
          componentContainer.insertAdjacentHTML('beforeend', '<h3>Business details</h3>');
          componentContainer.append(businessCard.getContainer());
          componentContainer.append(businessHours.getContainer());
          componentContainer.append(reviewsComponent.getContainer());
        }

        return true;
      },
    });
  }

  initComponent();

  return {
    getContainer,
  };
}
