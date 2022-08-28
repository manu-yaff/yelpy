import useFetch from '../../hooks/useFetch';
import BusinessCard from '../../components/BusinessCard/BusinessCard';
import { useParams } from 'react-router-dom';
import { GET_BUSINESS_DETAIL } from '../../graphql/queries';
import { useEffect } from 'react';
import { GetBusinessDetailResponse } from '../../types/ApiResponse';
import Spinner from '../../components/Spinner/Spinner';
import Toast from '../../components/Toast/Toast';
import BusinessHours from '../../components/BusinessHours/BusinessHours';
import ReviewsList from '../../components/ReviewsList/ReviewsList';

const BusinessDetail = () => {
	const { businessId } = useParams();
	const { fetchedData, error, loading, sendQuery } =
		useFetch<GetBusinessDetailResponse>(GET_BUSINESS_DETAIL, {
			id: businessId,
		});

	console.log(businessId);

	useEffect(() => {
		sendQuery();
		// eslint-disable-next-line
	}, []);

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <Toast toastType="error" />;
	}

	if (fetchedData?.errors) {
		return (
			<div>
				{fetchedData.errors.map((err) => (
					<h2 key={err.message}>{err.message}</h2>
				))}
			</div>
		);
	}

	const renderBusinessDetail = () => {
		if (fetchedData?.data.business) {
			const businessDetail = fetchedData.data.business;
			return (
				<>
					<BusinessCard business={businessDetail} />
					<BusinessHours businesHours={businessDetail.hours[0]} />
					<ReviewsList
						reviews={businessDetail.reviews ? businessDetail.reviews : []}
					/>
				</>
			);
		}
	};

	return <>{renderBusinessDetail()}</>;
};

export default BusinessDetail;
