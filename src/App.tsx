import './App.module.scss';
import HomeScreen from './pages/HomeScreen/HomeScreen';
import Layout from './components/Layout/Layout';

function App() {
	return (
		<>
      <Layout>
        <HomeScreen />
      </Layout>
		</>
	);
}

export default App;
