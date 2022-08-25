import { useState } from 'react';

const URL = process.env.REACT_APP_API_URL as string;
const TOKEN = process.env.REACT_APP_YELP_KEY;

const initFetch = (query: string, variables: Object) => {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'en-US',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }
};

type UseFetchState<T> = {
  loading: boolean;
  fetchedData: null | T;
  error: null | Error;
  sendQuery: () => void;
}


const UseFetch = <T> (query: string, variables: Object): UseFetchState<T> => {
  const [fetchedData, setFetchedData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function sendQuery () {
    setLoading(true);
    try {
      const response = await fetch(URL, initFetch(query, variables));
      const { data } = await response.json();
      setFetchedData(data);
      console.log(data);
    } catch (err) {
      setError(err as Error);
    }
    setLoading(false);
  };

  return { fetchedData, loading, error, sendQuery };
};

export default UseFetch;