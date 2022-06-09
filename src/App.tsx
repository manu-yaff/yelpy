import { Route, Routes } from 'react-router-dom';
import  './App.scss'
import HomeScreen from './pages/HomeScreen/HomeScreen';
import BusinessDetail from './pages/BusinessDetail/BusinessDetail';

function App() {
  return (
		<>
		 <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/negocio/:businessId" element={<BusinessDetail />} />
      </Routes>
		</>
  );
}

export default App;
