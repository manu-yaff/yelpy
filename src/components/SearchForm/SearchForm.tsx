import Input from '../Input/Input';
import Button from '../Button/Button';
import style from './SearchForm.module.scss';
import { MdOutlineSearch } from 'react-icons/md';
import { MdOutlineLocationOn } from 'react-icons/md';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SearchForm = () => {
	const [search, setSearch] = useState('');
	const [location, setLocation] = useState('');

	return (
		<>
			<form className={style['search-form']}>
				<Input
					placeholder="Search"
					icon={<MdOutlineSearch />}
					cornersStyle="left-rounded"
					onChange={(event) => setSearch(event.target.value)}
				/>
				<Input
					placeholder="Location"
					icon={<MdOutlineLocationOn />}
					cornersStyle="right-rounded"
					onChange={(event) => setLocation(event.target.value)}
				/>
				<Link to={`/search/${search}/${location}`}>
					<Button type="submit">Search</Button>
				</Link>
			</form>
		</>
	);
};

export default SearchForm;
