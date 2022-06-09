import { useQuery } from '@apollo/client';
import { SEARCH_QUERY } from '../src/graphql/queries';
import  './App.scss'
import HomeScreen from './pages/HomeScreen/HomeScreen';

function App() {
	// const { loading, error, data } = useQuery(SEARCH_QUERY, {
	// 	variables: {
	// 		term: "tacos",
	// 		location: "san francisco",
	// 		limit: 10
	// 	}
	// });

	// if (data) {
	// 	console.log(data.search)
	// }

  return (
		<>
			<HomeScreen />
		</>
  );
}

export default App;
