import Input from '../Input/Input';
import Toast from '../Toast/Toast';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';
import UseFetch from '../../hooks/useFetch';
import { MdOutlineSearch } from 'react-icons/md';
import { useState } from 'react';
import { MdOutlineLocationOn } from 'react-icons/md';
import { SEARCH_QUERY } from '../../graphql/queries';
import { SearchApiResponse } from '../../types/Buesiness';
import style from './SearchForm.module.scss';
import BusinessList from '../BusinessesList/BusinessList';

const SearchForm = () => {
	const [search, setSearch] = useState('');
	const [location, setLocation] = useState('');

	const {
		fetchedData: searchResult,
		loading,
		error,
		sendQuery,
	} = UseFetch<SearchApiResponse>(SEARCH_QUERY, {
		term: search,
		location: location,
		limit: 10,
	});

	if (searchResult) {
		// console.log(searchResult);
		// console.log(searchResult.search);
		// console.log(searchResult.search?.business);
		// console.log(searchResult.search.business);
	}

	return (
		<>
			<form className={style['search-form']}>
				<Input
					placeholder="Search"
					icon={<MdOutlineSearch />}
					cornersStyle="input--left-rounded"
					onChange={(event) => setSearch(event.target.value)}
				/>
				<Input
					placeholder="Location"
					icon={<MdOutlineLocationOn />}
					cornersStyle="input--right-rounded"
					onChange={(event) => setLocation(event.target.value)}
				/>
				<Button handleClick={sendQuery}>Search</Button>
			</form>
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

export default SearchForm;
