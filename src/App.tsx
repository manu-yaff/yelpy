import './App.module.scss';
import { Routes, Route } from 'react-router-dom';
import React, { Suspense } from 'react';
import Layout from './components/Layout/Layout';
import SearchForm from './components/SearchForm/SearchForm';

const BusinessListPage = React.lazy(
	() => import('./pages/BusinessListPage/BusinessListPage')
);

const BusinessDetail = React.lazy(
	() => import('./pages/BusinessDetail/BusinessDetail')
);

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
					<Route
						path="search/:term/:location"
						element={
							<Suspense fallback="loading...">
								<BusinessListPage />
							</Suspense>
						}
					/>
					<Route
						path="/business/:businessId"
						element={
							<Suspense fallback="loading...">
								<BusinessDetail />
							</Suspense>
						}
					/>
				</Routes>
			</Layout>
		</>
	);
}

export default App;
