import './App.module.scss';
import BusinessDetail from './pages/BusinessDetail/BusinessDetail';
import Layout from './components/Layout/Layout';
import { Routes, Route } from 'react-router-dom';
import SearchForm from './components/SearchForm/SearchForm';
import BusinessListPage from './pages/BusinessListPage/BusinessListPage';

function App() {
	return (
		<>
			<Layout>
				<h1>Yelp Api App</h1>
				<br />
				<p>
					The Yelp Fusion API allows you to get the best local content and user
					reviews from millions of businesses across 32 countries. Try a seach,
					eg. tacos qro
				</p>
				<SearchForm />
				<Routes>
					<Route
						path="/"
						element={(function () {
							return null;
						})()}
					></Route>
					<Route path="search/:term/:location" element={<BusinessListPage />} />
					<Route path="/business/:businessId" element={<BusinessDetail />} />
				</Routes>
			</Layout>
		</>
	);
}

export default App;
