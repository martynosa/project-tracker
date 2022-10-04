import { useState } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (config) => {
    setIsLoading(true);

    const options = {
      method: config.method ? config.method : 'GET',
      headers: config.headers ? config.headers : {},
      body: config.body ? JSON.stringify(config.body) : null,
    };

    if (config.photo) options.body = config.photo;

    const response = await fetch(config.url, options);
    const result = await response.json();

    if (result.status === 'error') {
      setIsLoading(false);
      throw new Error(result.message);
    }

    setIsLoading(false);
    return result.data;
  };
  return { sendRequest, isLoading };
};

export default useFetch;
