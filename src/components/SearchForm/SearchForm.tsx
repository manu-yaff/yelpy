import Input from '../Input/Input';
import Button from '../Button/Button';
import { MdOutlineSearch } from 'react-icons/md';
import { useState } from 'react';
import { MdOutlineLocationOn } from 'react-icons/md';
import UseFetch from '../../hooks/useFetch';
import { SEARCH_QUERY } from '../../graphql/queries';

const SearchForm = () => {
	const [search, setSearch] = useState('');
	const [location, setLocation] = useState('');

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value);
	};

	const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLocation(e.target.value);
	};

	const { data, loading, error, sendQuery } = UseFetch(SEARCH_QUERY, {
		term: 'tacos',
		location: 'qro',
		limit: 10,
	});

	const submitSearchForm = () => {
		sendQuery();
	};

	if (loading) return <h1>loading...</h1>;
	if (error) return <h1>Error...</h1>;

	return (
		<>
			<form>
				<Input
					placeholder="Search"
					icon={<MdOutlineSearch />}
					cornersStyle="input--left-rounded"
					onChange={handleSearchChange}
				/>
				<Input
					placeholder="Location"
					icon={<MdOutlineLocationOn />}
					cornersStyle="input--right-rounded"
					onChange={handleLocationChange}
				/>
				<Button onClick={submitSearchForm}>Search</Button>
			</form>
			{data && data.map((item) => <h1 key={item.id}>{item.name}</h1>)}
		</>
	);
};

export default SearchForm;
