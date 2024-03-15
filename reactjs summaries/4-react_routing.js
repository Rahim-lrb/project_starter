/*
! routing (react router package)
create multi-page applications with different views or pages. and navigate from one to another
npm install react-router-dom
1- create routes
=> index.js
import { BrowserRouter } from 'react-router-dom'
and wrap the code with it

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


