import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BusinessList from '../../components/BusinessList/BusinessList';
import Spinner from '../../components/Spinner/Spinner';
import Toast from '../../components/Toast/Toast';
import { SEARCH_QUERY } from '../../graphql/queries';
import useFetch from '../../hooks/useFetch';
import { SearchApiResponse } from '../../types/ApiResponse';

const BusinessListPage = () => {
	const { term, location } = useParams();
	const {
		fetchedData: searchResult,
		loading,
		error,
		sendQuery,
	} = useFetch<SearchApiResponse>(SEARCH_QUERY, {
		term: term,
		location: location,
		limit: 10,
	});

	useEffect(() => {
		sendQuery();
		// eslint-disable-next-line
	}, [term, location]);

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <Toast toastType="error" />;
	}

	if (searchResult?.errors) {
		return (
			<div>
				{searchResult.errors.map((err) => (
					<h2 key={err.message}>{err.message}</h2>
				))}
			</div>
		);
	}

	return (
		<>
			{searchResult?.data.search && (
				<BusinessList
					list={
						searchResult.data.search.business
							? searchResult.data.search.business
							: []
					}
				/>
			)}
		</>
	);
};

export default BusinessListPage;
