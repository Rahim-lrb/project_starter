/*
! communicating the server with the client
- a server and a client communicate by exchanging http requests and responses and that by specifying the action it wants the server 
to perform, and it's done through a bunch of methods (http verbs): get, post, put(update), delete...
! make the server
1- import the built in http module
2- create it: server.createServer((res, resp) => {}) (assign it to a const so wont be overwritten)
-- the callback is fired every time the server receives a req.
-- the callback handles the req by the two params (request,response)
-- req: contains information about the request
req.url, req.method...etc
-- res: used to construct and send the appropriate response back to the client
res.writeHead(200, headers): to send an http status code (200, 404...) with the response, (headers is additional data such as content type, caching directives, cookies..))
'Content-Type': 'text/plain' and "text/html", "application/json"...etc
res.write('Hello, this is the homepage.');
res.end() => always use it to end the response even empty
3- start it and make it listen to requests: server.listen(port, callback) 
-- the callback is fired when the server is started.
* additional
- 3000 port is only for now
*/

const http = require("http")
/*
const server = http.createServer((request, response) => {
    console.log("a new request is recieved")

    response.writeHead(200, {
        "Content-Type": "application/json",// " Content-type": "text/plain",
    })
    response.end(JSON.stringify({ // response.end("nono") to end the response
        id: "1", name: "moh", job: "actor",
    }))
})

server.listen(3000, () => {
    console.log("server is running on port 3000")
})
*/

/*
! events
we have another way to handle the request and that by using an event (separate the creation and the handling)
- on event 
! routing in a server
the process of determining how an application responds to a client request to a particular endpoint
- we do that by using if statement and req methods such as url ("/friends"), and method(get,post..etc) (this would be easier using express.js)
- when a client requests a resource like 'friends' from a server, the server must be set up to handle that specific request.
- we can return an html, we can separate the status code and the headers
*/ 

const server2 = http.createServer();
server2.on("request", (request, response) => {
    if (request.url == "/") {
        request.statusCode = 200;
        response.setHeader("Content-Type", "application/json")
        response.end(JSON.stringify({id: "1", name: "moh",job: "actor",}) )
    } else if (request.url == "/friends") { // we can return an html , 200 statis code is default so we can not write it
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html")

        response.write("<html>")
        response.write("<body>")
        response.write("<ul>")
        response.write("<li> thoughts 1<li/>")
        response.write("<li> thoughts 2<li/>")
        response.write("<li> thoughts 3<li/>")
        response.write("<li> thoughts 4<li/>")
        response.write("<ul>")
        response.write("<html>")
        response.write("<body>")
    } else { 
        response.statusCode = 404;
        response.end(); // end the response empty with status 404

    }
})

// after port you can add hostname (optional) local by default
server2.listen(3000, () => {
    console.log("server is running on port 3000")
})


/*
! parameterized URLs (endpoints or routes) (:)
a way to create dynamic route that captures specific values or parameters from the URL. eg: /friends/1 
to defining routes with placeholders or parameters within the URL path. like friend/1 2 3 4
- we usually retrieve data from the database. (we'll use an obj instead)
- in nodejs, we need to parse the route to get the parameterized url => request.url.split("/") ["", "friends", "2"] (express js is easier)
note: 
- not a good way since when choosing a friend we don't have, not gonna tell us not_found (express js solves that)
*/ 
const http = require("http")
const server = http.createServer()

const friends = [
    {
        id: 0,
        name: "tesla",
    },
    {
        id: 1,
        name: "newton",
    },
    {
        id: 2,
        name: "enstein",
    }
]
/*
server.on("request", (request, response) => {
    const item = request.url.split("/") // ["", "friends", "2"] to parse it

    if (item[1] == "friends") {
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json")

        if (item.length === 3) {
            const friendIndex = +item[2]
            response.end(JSON.stringify(friends[friendIndex]))
        } else {
            response.end(JSON.stringify(friends))
        }

    } else { 
        response.statusCode = 404;
        response.end();
    }
})
server.listen(3000, () => {
    console.log("server is running on port 3000")
})
*/