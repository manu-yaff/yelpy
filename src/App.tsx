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
				<SearchForm />
				<Routes>
					<Route path="search/:term/:location" element={<BusinessListPage />} />
					<Route path="/business/:businessId" element={<BusinessDetail />} />
				</Routes>
			</Layout>
		</>
	);
}

export default App;
