import { useEffect, useState } from 'react';

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

type UseFetchState = {
  loading: boolean;
  data: null | Business[];
  error: null | Error;
  sendQuery: () => void;
}

interface Response {
  func: () => void;
  state: UseFetchState;
}

interface Business {
  id: string;
  name: string;
}

const UseFetch = (query: string, variables: Object): UseFetchState => {
  const [data, setData] = useState<Business[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  async function sendQuery () {
    setLoading(true);
    try {
      const response = await fetch(URL, initFetch(query, variables));
      const { data } = await response.json();
      setData(data.search.business);
      console.log(data.search.business);
    } catch (err) {
      setError(err as Error);
    }
    setLoading(false);
  };

  return { data, loading, error, sendQuery };
};

export default UseFetch;