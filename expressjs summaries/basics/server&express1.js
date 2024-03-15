/*
! express js (communication between the server and the client)
to ease creating web services & apis, we use express js (a node js framework) that provides a set of features
- npm i express, import it, create a server, make it listen to requests app.listen(port, callback)
* routing (endpoints)
is defining endpoints so the client can request various resources or tasks, so they act like a gateway for client to interact
- 1st way: app.get("/products", callback) (get, post, delete, patch...etc)
- 2nd way: creating a router file for specific thing
app.use("/products", productsRouter)
* callback 
the callback whe handling a route 
- the callback is a function that has two params REQ (to access the req that is sent), res (to send a response), each one of them has methods
-- req.method , req.url...etc
-- req.prams.(obj contains route params) - req.query.(obj contains query params) - req.body (contains the parsed req body obj)

* routing 
Routes define the endpoints at which requests can be made, and they specify the logic that should be executed when a request is made to a particular endpoint
app.get("/news", callback) => you can use any method: get, post, put, delete..
- the callback is a function that has two params REQ (to access the req that is sent), res (to send a response), each one of them has methods
-- req.method , req.url...etc
-- req.prams.(obj contains route params) - req.query.(obj contains query params) - req.body (contains the parsed req body obj)
* route parameters (:)
You can define routes with parameters, which allows you to capture values from the URL. 
- app.get('/users/:id', (req, res) => {
    console.log("req.params.id") => to access the captured value
})
* query params (?)
http://example.com/news?sex=men&category=clothes
- app.get('/search', (req, res) => {
    console.log(req.query)
});
{ sex: 'men', category: 'clothes' }

notes: 
- you should parse the obj in req to use it => Json.parse or use express.json() middleware (better) or body-parse third party middleware
- use node --watch app.js / nodemon app.js => to reload the server when there are changes
- use an environment variable to detect the PORT => process.env.port
set PORT=8080 => to change it
*/
const express = require("express")
const app = express(); // create the server

// . create route and handle the request / => link only
app.get("/", (req, res) => {
    res.send("hello to this route")
})

app.get("/api/courses", (req, res) => {
    res.send(courses)
})

// . dynamic route
app.get("/api/courses/:id", (req, res) => {
    // res.send("dynamic route with the id" + req.params.id);
    // res.send(req.query); 
    const course = courses.find(c => c.id === req.params.id); // true if it finds the course and false if not
    if (!course) {
        res.status(404).send(`The course with the ID ${req.params.id} is not found`);
    } else {
        res.send(course);
    }
})

// * handling http responses (how to respond to an http post request)
app.use(express.json()) // a middleware used to parse incoming json payload into the body
// handling http requests , post request
app.post("/api/course/:id", (req, res) => {
    const course = {
        id: courses.length + 1,
        name: req.body.name,
    }
    courses.push(course);
    res.send(course)
})

app.listen(process.env.PORT || 3000, () => { // start the server and make it listen to requests
    console.log("server is listening " + port)
})

/*
! middlewares and advanced routing

*/ 


















