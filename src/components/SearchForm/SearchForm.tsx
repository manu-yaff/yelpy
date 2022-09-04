import Input from '../Input/Input';
import Button from '../Button/Button';
import style from './SearchForm.module.scss';
import { MdOutlineSearch } from 'react-icons/md';
import { MdOutlineLocationOn } from 'react-icons/md';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
	const [search, setSearch] = useState('');
	const [location, setLocation] = useState('');
	const navigate = useNavigate();

	return (
		<>
			<form
				className={style['search-form']}
				onSubmit={(event) => {
					event.preventDefault();
					navigate(`/search/${search}/${location}`);
				}}
			>
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
				<Button type="submit">Search</Button>
			</form>
		</>
	);
};

export default SearchForm;
