import { useState, useEffect } from 'react';

function useFetch({ onSuccess, onError }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFetch = async (url, options = {}) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const jsonData = await response.json();
            setData(jsonData);
            if (onSuccess) {
                onSuccess(jsonData);
            }
        } catch (err) {
            setError(err);
            if (onError) {
                onError(err);
            }
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, handleFetch };
}



/*
const ExampleComponent = () => {
    const apiUrl = 'https://api.example.com/data';
    
    Destructure the values from the useFetch hook


    const { data, loading, error, handleFetch } = useFetch({
      onSuccess: (jsonData) => {
        console.log('Data fetched successfully:', jsonData);
      },
      onError: (err) => {
        console.error('Error fetching data:', err.message);
      },
    });
  
    useEffect(() => {
      Trigger the fetch when the component mounts
      handleFetch(apiUrl);
    }, [handleFetch, apiUrl]);
  
    return (
      <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {data && (
          <div>
            <h2>Data:</h2>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div>
    );
  };
*/