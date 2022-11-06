import { useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';

const useFetch = () => {
  const { user } = useAuth();

  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async ({
    url,
    method,
    headers,
    body,
    photo,
    isAuthorized,
  }) => {
    setIsLoading(true);

    const options = {
      method: method ? method : 'GET',
      headers: headers ? headers : { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : null,
    };

    if (photo) {
      options.body = photo;
      options.headers = {};
    }

    if (isAuthorized) {
      options.headers = { ...options.headers, token: user.token };
    }

    const response = await fetch(url, options);
    const result = await response.json();

    if (result.status === 'error') {
      setIsLoading(false);
      throw new Error(result.message);
    }

    setIsLoading(false);
    return result.data;
  };
  return { sendRequest, isLoading, setIsLoading };
};

export default useFetch;
