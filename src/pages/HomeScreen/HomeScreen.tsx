import SearchForm from '../../components/SearchForm/SearchForm';
import BusinessList from '../../components/BusinessList/BusinessList';
import Toast from '../../components/Toast/Toast';
import Spinner from '../../components/Spinner/Spinner';
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';
import { SEARCH_QUERY } from '../../graphql/queries';
import { SearchApiResponse } from '../../types/ApiResponse';

const HomeScreen = () => {
	const [search, setSearch] = useState('');
	const [location, setLocation] = useState('');

	const {
		fetchedData: searchResult,
		loading,
		error,
		sendQuery,
	} = useFetch<SearchApiResponse>(SEARCH_QUERY, {
		term: search,
		location: location,
		limit: 10,
	});

	return (
		<>
			<h1>Yelp api</h1>
			<SearchForm formFunctions={{ setLocation, setSearch, sendQuery }} />
			{loading && <Spinner />}
			{error && !searchResult?.data.search && (
				<Toast toastType="error">{error.message}</Toast>
			)}
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

export default HomeScreen;
