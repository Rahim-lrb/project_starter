/*
! basics
- functional and class components and styling 
- props 
- conditional rendering
{isLoggedIn ? <LoggedInComponent /> : <LoggedOutComponent />}
- list rendering
<ul>
    {items.map((item, index) => (
        <li key={index}>{item}</li>
    ))}
</ul>
- prop drilling issue
! basics 2

*/ 


/*
! forms
! managing inputs in react (two-way binding)
to make inputs functional, we should do two-way data binding , 
- the changes on the state are reflected on the UI  => to make the state displays on the input:
create a state and put its value on the input value.
- the changes in the UI are reflected on the state(data model) => to make writing something change the state: 
we use onChange event handler and call a function , in it we use the hook func to set the current value of the input in the state

! inputs in react (forms)
we can create a state for each input, but we'd rather put the related ones in {name: "", address: ""...}
mistake 1: 
setFormInputs({ name: event.target.value }); it'd update the wanted one but delete the others from the obj
mistake 2:
setFormInputs({ name: event.target.value, email: formInputs.email, password: formInputs.password })
would update the others too but not efficient (if we add a new input we should change in the code)

best solution:
update the whole inputs by setting a new {} , a copy of the obj in the state, and a new value from the input field
=>  setFormInputs( {...formInputs, password: event.target.value} ) 

const originalObject = { key1: '1', key2: '2' };
const copiedObject = { ...originalObject }; <== to copy
const copiedObject = { ...originalObject , key2: '3'}; <== to copy and update 

note: 
(event) => prevent.default() => to stop from reloading

! other forms
- check input: event.target.checked instead of value
- textArea
- select input
- radio
value="student" checked={formInputs.status === "student"} if checked it puts event.target.value to the value written
*/ 



/*
! hooks
are functions that enable you to use state and other React features in functional components. 
* useState 
- import React, { useState } from 'react';
- const [count, setCount] = useState(); 
count is the value of the state, setCount is the function we use to change the state, useState("") you can set the initial value here 

* useContext
when passing the data from a top-level component to a deeply nested one, prop drilling issue might happen which would make it harder to understand the code
so it helps in passing stuff to children easily.
1- creating the context
- create the context
- wrap the code with the context with using Provider
- pass anything you want into that value obj, array, value....etc
import { createContext } from 'react';
const UserContext = createContext();

<UserContext.Provider value={ {name: "ahmed", age: 30} }>
    <App>
</UserContext.Provider>

2- access the context
- useContext() hook
const { name, age } = useContext(UserContext);
<div>{name}</div>

note: 
- you can use an initial value inside createContext({...})
- you can pass a state to update the value [value, setValue]


* useEffect( () => {}, [] )
- used to control side effects like fetching, if we don't use it there will be unnecessary rendering every time the page is rendered.
- you can control when it renders using the dependency array []. if empty it'd only render in the initial render, we add a value a state or prop which means it'd only render when that changes
import React, { useState, useEffect } from 'react';
const [data, setData] = useState(null);
useEffect(() => {
    Perform side effect (e.g., data fetching)
    fetchData().then((result) => {
    setData(result);
    });
}, []); 

* useParam (to catch the dynamic route in the url like id)

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

! custom hooks 
are hooks or function you'd use mora than once.
like loading, fetchApi func in a different file...
*/ 




/*
! react routing
create multi-page applications with different views or pages. and navigate from one to another
npm install react-router-dom
1- create routes
=> index.js
import { BrowserRouter } from 'react-router-dom' ---     and wrap the code with it

=> app.js here we create the routes
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Posts from './components/Posts';
<Routes>
    <Route path="/" element={<h1>this is home page</h1>}/>
    <Route path="/home" element={<Home/>}/>
    <Route path="/posts" element={<Posts/>}/>
    <Route path="*" element={<Error/>}/>    => when you search for /anything that doesn't have routes you'd be sent
</Routes>


2- navigate between them using Link component
import { Link } from 'react-router-dom';
<li><Link to="/">Home</Link></li>

! nested route component
we can organize the routes and write the related ones together
</Routes>

    <Route path='/posts' element={<PostLayout></PostLayout>}>
        <Route index element={<Posts />} />   <== exactly when you search /posts
        <Route path=":postId" element={<PostDetail />} />   <== /posts/id
        <Route path="new" element={<PostDetail/>}/>
        <Route path="delete" element={<PostDetail/>}/> 
    </Route>

</Routes>
- postLayout is a component that is used as a layout or structure for its child routes. 
import { Outlet } from 'react-router-dom'
<Outlet></Outlet>

! dynamic routes
routes in a web application where part of the URL is variable or dynamic,
- <Route path="/users/:userId" element={<UserDetail />} />
- <Link to="/users/1">Go to User 1</Link>

import { useParams } from 'react-router-dom'
import { useContext } from 'react';

export default function PostDetail() {
    const posts = useContext(postContext); => we bring the posts
    const {postId} = useParams(); => we catch the param in the url

    const post = posts.find((p) => { 
        return p.id == postId;
    })
    return (...)

*/ 


/*
! api 
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
