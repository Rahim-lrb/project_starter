/*
! middleware
a func that runs between the incoming request and the outgoing response to add additional functionality, it has a callback that has
access to the req and th res to be able to use them, as well as a next param
- app.use( (req, res, next) => {} )
- there can be more than one middleware (chain), and we use the next() param method to pass from one to another 
- the router handler is considered a middleware (has access to req and res), and it comes at the end of the chain (terminal point)
, so not calling next in the middlewares func wouldn't pass the req, res and the response wouldn't be generated, and the middleware
below the route handler won't work 
* third party middlewares
middleware functions or modules that are not built into the core Express framework but are developed by external developers or organizations.
like: app.use(express.json()) => to parse the req body, cookie parser, body parser, helmet, cors, compression...etc
*/ 
/*
! routing advanced
- instead of defining route handlers the hard way app.get("movies/popular") /new - series/popular  - series/new
app.use("/movies", moviesRouter)
app.use("/series", seriesRouter) 
const router = express.Router()
router.route("/") => it means /movies
    .get((req, res) => {})
    .post(moviesController.postMovies)
router.route("/:id") => it means /movies/:id 
- we can even separate all the route handler function into a folder called controllers
* param middleware
is a special middleware, which only run for certain route parameters
- the middleware has an extra param value = stores the value that the user has passed through this path 
so if you search movie/5 then value=5
const router = express.Router()
router.param("id", (req, res, next, value) => { // it only works when there is an id
    console.log("movie id is" + value)
    next()
})
*/ 

const express = require("express")
const morgan = require("morgan")
const app = express();
const moviesRouter = require("./routes/movies")

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
        name: "einstein",
    }
]
// third party middleware to parse the req body
app.use(express.json());
// ordinary middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`)
    console.log("we passed by this middleware")
    next();
})
// accepts an argument, dev(returns data: method, url, status code, time, size of the response), tiny(same data but diff order).. we can save these in a file
app.use(morgan("combined"))

// . route handler
app.get("/friends", (req, res) =>{
    res.json(friends)
})
// another route handler
app.get("/friends/:friendId", (req, res) =>{
    res.json(friends)
    const friendId = Number(req.params.friendId)
    const friend = friends[friendId]
    if (friend) {
        res.status(200).json(friend)
    } else {
        res.status(404).json({
            error: "friend doesn't exist"
        })
    }
})


//  a middleware router from this or a diff file 
// app.use("/movies", moviesRouter)

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server is listening " + port)
})


/*
! must used middlewares on your app (entry point server.js)
- app.use(express.json())
- app.use(cors()); => to handle cross origin resource sharing and enable all
app.use(cors({
    origin: 'http://example.com',  // Specify the allowed origin like your frontend only
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
    credentials: true, // Enable credentials (cookies, HTTP authentication) for cross-origin requests
    optionsSuccessStatus: 204, // Set the status code for successful OPTIONS requests
}));
- Helmet for Security Headers:
The helmet middleware helps secure your Express app by setting various HTTP headers.
- Compression Middleware:
To compress responses, you can use the compression middleware. This can help reduce the size of responses and improve performance
- authentication middlewares like: cookies, session, jwt, passport...etc

*/ 