import { useState } from 'react';
import { useNotification } from '../Contexts/NotificationContext';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { openNotification } = useNotification();

  const sendRequest = async (config, consumeData, message) => {
    setIsLoading(true);
    try {
      const response = await fetch(config.url, {
        method: config.method ? config.method : 'GET',
        headers: config.headers ? config.headers : {},
        body: config.body ? JSON.stringify(config.body) : null,
      });
      const result = await response.json();

      if (result.status === 'error') {
        setIsLoading(false);
        openNotification('fail', result.message);
        return;
      }
      consumeData(result.data);
      setIsLoading(false);
      openNotification('success', message);
    } catch (error) {
      setIsLoading(false);
      openNotification('fail', 'General error!');
    }
  };
  return { sendRequest, isLoading };
};

export default useFetch;
