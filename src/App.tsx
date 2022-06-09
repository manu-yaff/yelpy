import { useQuery } from '@apollo/client';
import { SEARCH_QUERY } from '../src/graphql/queries';

function App() {
	const { loading, error, data } = useQuery(SEARCH_QUERY, {
		variables: {
			term: "tacos",
			location: "san francisco",
			limit: 10
		}
	});

	if (data) {
		console.log(data.search)
	}

  return (
    <div>
			app
    </div>
  );
}

export default App;
