import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/index';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const token = 'DwLRUnzGCPeUFiI3rbpnrO0vIzCI96m5Y19omaxIvTBU0d0RoDcVMRZEmR4yOviNPxkmfcirRwrbSVz9SmwUh8x3MtfjmumkvRl6KA72VjySH2skGRY31y5XZTOcYnYx';
const url = 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/graphql';

const httpLink = createHttpLink({
  uri: url,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: Object.assign(headers || {}, {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${token}`,
      'Accept-Language': 'en-US',
    }),
  }
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

root.render(
	<ApolloProvider client={client}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
	</ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
