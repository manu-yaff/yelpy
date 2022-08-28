import SearchForm from '../../components/SearchForm/SearchForm';
import BusinessList from '../../components/BusinessList/BusinessList';
import Toast from '../../components/Toast/Toast';
import Spinner from '../../components/Spinner/Spinner';
import useFetch from '../../hooks/useFetch';
import { useState } from 'react';
import { SEARCH_QUERY } from '../../graphql/queries';
import { SearchApiResponse } from '../../types/Buesiness';

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
			{error && <Toast toastType="error">{error.message}</Toast>}
			{searchResult && (
				<BusinessList
					list={searchResult.search ? searchResult.search.business : []}
				/>
			)}
		</>
	);
};

export default HomeScreen;
