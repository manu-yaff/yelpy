import { useQuery } from '@apollo/client';
import { SEARCH_QUERY } from '../src/graphql/queries';
import  './App.scss'
import HomeScreen from './pages/HomeScreen/HomeScreen';

function App() {
  return (
		<>
			<HomeScreen />
		</>
  );
}

export default App;
