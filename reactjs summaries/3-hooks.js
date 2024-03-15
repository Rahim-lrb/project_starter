/*
! hooks
are functions that enable you to use state and other React features in functional components. 
* useState 
- import React, { useState } from 'react';
- const [count, setCount] = useState(); 
count is the value of the state, setCount is the function we use to change the state, useState("") you can set the initial value here 

* useContext
used to pass the data from top-level component to a nested one, and avoid prop drilling issue when using props
1- create the context 
import { createContext } from 'react';
const UserContext = createContext();
2- wrap the code with the provider to provide the context in index.js, and pass the data in the value
<UserContext.Provider value={ {name: "ahmed", age: 30} }>
    <App>
</UserContext.Provider>
3- access the data in any component
import { useContext } from 'react';
const { name, age } = useContext(UserContext);
<div>{name}</div>

note: 
- you can create a provider inside the context file, and do the logic and passed it into the provider and then wrap it around the app code
const contextProvider = 
- you can use an initial value inside createContext({...})
- you can pass a state to update the value [value, setValue]
- you can pass any type of data obj, array...etc


* useEffect( () => {}, [] )
- using side effects like: fetching, localStorage... will cause unnecessary rendering when the comp mounts or rendered, so we use it to control when it needs to be re-rendered
import React, { useState, useEffect } from 'react';
const [data, setData] = useState(null);
useEffect(() => {
    Perform side effect (e.g., data fetching)
    fetchData().then((result) => {
        setData(result);
    });
}, []); 
- the dependency array controls when it needs to be re-rendered, empty means only when the page reloads (initial render), we add values like the fetching won't be rerendered only when the input state changes

* useParam (to catch the dynamic route in the url like id)
* useFetch ()
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

. how to use
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







/*
! additional hooks: 
- useReducer (alternative to useContext to separate the logic from the component)
- useNavigate (alternative of LINK in react router)
- useMemo ()
- useCallback
- useRef 
* useNavigate 
instead of using Link to route to specific route you can use this hook 
function SomeComponent() {
    const navigate = useNavigate();
    const handleButtonClick = () => {
        navigate('/users/123'); 
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Go to User 123</button>
        </div>
    );
}
*/ 


/*
! custom hooks 
are hooks or function you'd use mora than once.
like loading...etc
*/ 