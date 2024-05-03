import { ErrorComponent } from '../components/Error.js';
import { Loader } from '../components/Loader.js';
import { $ } from '../common/dom.js';
import { Fetch } from '../common/fetch.js';
import { BusinessCard } from '../components/BusinessCard.js';
import { getBusinessDetail } from '../api/api.js';
import { formatDayHours, groupHoursByDay } from '../services/hour.service.js';
import { BusinessHours } from '../components/BusinessHours.js';
import { ReviewList } from '../components/ReviewList.js';
import { getRouter } from '../router.js';
export function BusinessDetailPage() {
    const componentContainer = $.createElement('div');
    const router = getRouter();
    const { id } = router.getUrlParams();
    const loaderComponent = Loader();
    const errorComponent = ErrorComponent();
    function getContainer() {
        return componentContainer;
    }
    function handleStateChanges(_, property, value, __) {
        const isLoading = property == 'loading' && value;
        const isError = property == 'error' && value;
        const isData = property == 'data' && value;
        if (isLoading) {
            componentContainer.replaceChildren();
            componentContainer.appendChild(loaderComponent.getContainer());
        }
        if (isError) {
            console.error(value);
            componentContainer.replaceChildren();
            componentContainer.appendChild(errorComponent.getContainer());
        }
        if (isData) {
            const { imageUrl, name, address, phone, reviewsCount, isOpen, hours, reviews } = value;
            const businessCard = BusinessCard({
                name,
                address,
                phone,
                reviewsCount,
                imageUrl,
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
    }
    function initComponent() {
        Fetch({
            callback: () => getBusinessDetail(id),
            observer: handleStateChanges,
        });
    }
    initComponent();
    return {
        getContainer,
    };
}
