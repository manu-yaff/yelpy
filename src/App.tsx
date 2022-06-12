import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import  './App.module.scss'
import HomeScreen from './pages/HomeScreen/HomeScreen';
const BusinessDetail = React.lazy(() => import('./pages/BusinessDetail/BusinessDetail'))

function App() {
  return (
		<>
		 <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/negocio/:businessId"
          element={<Suspense><BusinessDetail /></Suspense>}
        />
      </Routes>
		</>
  );
}

export default App;
