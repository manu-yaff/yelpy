import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter } from 'react-router-dom';
import './styles/_fonts.scss';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

const token = process.env.REACT_APP_YELP_KEY;
const url = process.env.REACT_APP_API_URL;

const httpLink = createHttpLink({
	uri: url,
});

const authLink = setContext((_, { headers }) => {
	return {
		headers: Object.assign(headers || {}, {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
			'Accept-Language': 'en-US',
		}),
	};
});

export const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

root.render(
	<ApolloProvider client={client}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
