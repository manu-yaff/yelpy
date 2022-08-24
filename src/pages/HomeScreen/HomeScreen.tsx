import SearchForm from '../../components/SearchForm/SearchForm';
import BusinessesList from '../../components/BusinessesList/BusinessList';

const HomeScreen = () => {
	return (
		<>
			<h1>Yelp api</h1>
			<SearchForm />
			<BusinessesList />
		</>
	);
};

export default HomeScreen;
