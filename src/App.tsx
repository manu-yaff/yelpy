import './App.module.scss';
import HomeScreen from './pages/HomeScreen/HomeScreen';
import BusinessDetail from './pages/BusinessDetail/BusinessDetail';
import Layout from './components/Layout/Layout';
import { Routes, Route } from 'react-router-dom';

function App() {
	return (
		<>
			<Routes>
				<Route
					path="/"
					element={
						<Layout>
							<HomeScreen />
						</Layout>
					}
				/>
				<Route
					path="/business/:businessId"
					element={
						<Layout>
							<BusinessDetail />
						</Layout>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
