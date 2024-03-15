/*
! api in react 
we interact with the server using the API endpoints and there is 2 ways: 
* 1- fetch (URL, options)
a js feature to make http requests to the server 
- the url is the api endpoint
- options is an obj that includes additional DATA 

const options = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
    },
    body: JSON.stringify({ key: 'value' }), => body data
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'include',
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
};

2- axios.method(url, options)
is the most used library to make http requests easily 
another syntax:
axios({
  method,        // HTTP method (e.g., 'get', 'post', 'put', 'delete')
  url,           // URL of the resource
  headers,       // Headers to include in the request
  data,          // Request payload for methods like 'post' or 'put'
  params,        // URL parameters
})

note:
- axios is well supported and fetch may require polyfills or additional handling for compatibility with older browsers
- useEffect hook is a must to avoid triggering the execution of fetching again when the compo mounts (updates)
*/ 
fetch('https://api.example.com/data')
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error('Error fetching data:', error);
});


import axios from 'axios';
axios.get('https://api.example.com/data')
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error('Error fetching data:', error);
});


/*
! react query 
is a popular library in the React ecosystem that provides a set of tools and utilities for managing and caching data in React applications. 
It is designed to simplify the state management of asynchronous data-fetching, caching, and updating in your React components.
*/ 