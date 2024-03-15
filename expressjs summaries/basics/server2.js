/*
when you visit a website, the browser loads everything since they are from the same origin, but if there is a button that 
would fetch data from another website, it won't be allowed
! Same-Origin Policy (SOP):
is a security feature in web browsers that ensures web content from one origin, and prevent directly interacting with resources from
diff origin, and that's to ensure user security and prevent unauthorized access to data. (https://google.com:443/news )
- so cross origin requests (req from different origin) are mostly restricted but there is an exception
- when posting data from google to facebook, it doesn't risk your data (allowed)
eg: you are in google and you click on Wikipedia, you can retrieve the html, but if you try fetching the data, it's not allowed (blocked by cors policy
! CORS (Cross-Origin Resource Sharing)
security feature implemented in web browsers that allows web servers to specify which origins are permitted to 
access the resources on the server. CORS defines a set of HTTP headers to enable secure cross-origin requests in web browsers.
- so The Same-Origin Policy (SOP) restricts cross-origin interactions for security reasons. However, 
CORS provides a way for servers to relax these restrictions and allow controlled access to resources 
from different origins.
- so we use this to achieve things that isn't allowed and we are sure they are safe and that's by specifying
Access-control-Alow-origin: https://weekymedia.com or * (to allow everything) as we see in the network in dev tools
- whitelisting is the practice of allowing only approved entities or elements and denying access to all others (the opposite of blacklisting)

*/ 
/*
! post request (posting data)
- use the method method in request 
- when we fetch a friend using fetch or postman, it'd display the new friend
- it won't be saved, we are not using database 
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
    const item = request.url.split("/")
    // ! post
    if (request.method == "POST" && item[1] == "friends") {
        request.on("data", (data) => {
            const friend = data.toString() // to turn the received data into string
            console.log(friend) 
            friends.push(JSON.parse(friend)) // turn a json string into a js Obj and push it
        })
        // . piping
        // request.pipe(response) // pipe after the request in done
    } else if (request.method == "GET" && item[1] == "friends") {
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
*/
server.listen(3000, () => {
    console.log("server is running on port 3000")
})

/*
fetch("http://localhost:3000/friends", { 
    method: "POST", 
    body: JSON.stringify({id: 3, name: "ryan dahl"}) 
})
{id: 3, name: "ryan dahl"}
*/

/*
! requests and responses as a stream
as we know request is a readable stream and response is a writable stream
- we can pipe what's readable stream to the writable stream , and the data will flow straight from the req back to the response
fetch("http://localhost:3000/friends", { 
    method: "POST", 
    body: JSON.stringify({id: 3, name: "ryan dahl"}) 
})
.then((response) => response.json() )
.then((friend) => console.log(friend))
*/ 

