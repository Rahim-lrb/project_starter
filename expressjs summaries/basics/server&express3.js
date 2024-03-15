/*
.env file
is a configuration file used to store environment variables and important data like database string...etc so it can't be accessed

*/ 


// todo env
/*
! environments variables
are dynamic values that can affect the behavior of a running process, which means they are used to configure aspects of the application
such as API keys, database URLs..., and these should'nt be included in the code (sensitive information).
process.env => process obj has an environment variable that holds the standard env variables and the one we create.
process.env.NODE_ENV => to return the current env var (dev, prod...)
- you can use them to enable or disable a certain feature based on a current variable like the hostname
const environment = process.env.NODE_ENV || 'development';
if (environment === 'production') {
you set it using the command line PORT=3000 NODE_ENV=development node app.js 
- eg: port, environment, database url and password, api keys, jwt secret (Secret key used for JSON Web Tokens (JWT) when implementing authentication and authorization.)
- there are a lot of ways to make environment variable files or configuration files, the best are: 
.env and config folder 

note:
in express js instead of process.env we can use app.get("env")
*/ 

/*
! dotenv package
- install dotenv and create a file .env and define the environment variables in it.
DB_NAME=students
DB_USERNAME=123456
DB_PASSWORD=6452154
- load it in the project to be able to access the vars
const require(".env").config
console.log(`Database name is ${process.env.DB_NAME}`);
! Configuration Folder
- npm i config, create a config folder 
- we can create many files to set configuration such as: default.js, development.js, production.js, 
- there are any formats beside .js, the latter one except a json format
{ default
    "name": "my express app",
}
{ development.json file
    "name": "my express ap development"
    "mail": {
        "host": "development-mail-server"
    }
}
{ production.json file: 
    "name": "my express ap production"
    "mail": {
        "host": "prod-mail-server"
    }
}
? how to access them
- const config = require("config"), console.log("app name in diff env" + config.get("name"))
*/ 

/*
! types environments in coding
- Development Environment: used by developers for coding and testing. It's where developers write, modify, and test the code before deploying it to other environments.
It might have more relaxed security settings, debugging tools, and verbose logging to aid developers in identifying and fixing issues. Mock or test data may be used.
- Testing (or Staging) Environment: used to perform testing, including unit testing, integration testing, and system testing. It mimics the production environment as closely as possible.
The configuration and infrastructure are similar to production, but it may use separate databases to avoid affecting real data. Testing environments help catch issues that might arise in production.
- Production Environment: The live environment where the application is accessible to end-users. It hosts the released version of the software that has passed all tests and is considered stable.
Characteristics: High security, optimized performance, and reliability are critical. Real user data is used, and the system is expected to handle a potentially large user load.
! what should you do in each
* Development Environment:
- Database Setup:
Use a local or development database for testing.
Configure database connection strings and credentials as environment variables.
- Logging and Debugging:
Enable verbose logging and debugging tools to aid development.
Use tools like debuggers and log analysis tools.
- API Key and Credential Management:
Use development or test API keys and credentials.
Store API keys and credentials as environment variables.
- Feature Toggles:
Enable all features and debugging tools for development.
Use feature toggle flags as environment variables to selectively enable/disable features.
- Service Endpoints:
Point to local or development versions of external services.
Configure URLs and endpoints as environment variables.
- Security Configuration:
Configure security settings for development, balancing security and ease of debugging.
Use environment variables for security-related configurations.
- Error Handling and Reporting:
Allow more detailed error messages for immediate issue identification.
Use appropriate error handling mechanisms.

* Testing Environment:
- Database Setup:
Use a separate testing database with a larger dataset for comprehensive testing.
Ensure database configurations are suited for testing scenarios.
- Logging and Debugging:
Tune logging for catching issues specific to the testing environment.
Utilize logging for comprehensive test coverage.
- API Key and Credential Management:
Use separate testing or staging API keys and credentials.
Verify that testing credentials are correctly configured.
- Feature Toggles:
Toggle specific features on for testing.
Ensure feature toggles align with testing scenarios.
- Service Endpoints:
Point to testing or staging versions of external services.
Verify that testing endpoints are correctly configured.
- Security Configuration:
Tune configurations for comprehensive security testing.
Ensure security settings are suitable for the testing environment.
- Error Handling and Reporting:
Adjust error handling for specific testing scenarios.
Utilize testing tools for error reporting and analysis.

* Production Environment:
- Database Setup:
Use the actual production database with real user data.
Ensure production database configurations are optimized for performance.
- Logging and Debugging:
Minimize logging for performance reasons in the production environment.
Disable debugging tools in production.
- API Key and Credential Management:
Use actual production API keys and credentials.
Ensure secure management of sensitive information.
- Feature Toggles:
Only enable stable and tested features for production.
Verify that all feature toggles are appropriately configured.
- Service Endpoints:
Use the actual production endpoints.
Confirm that production service endpoints are correctly configured.
- Security Configuration:
Utilize strict security settings to protect sensitive data.
Regularly update security configurations based on best practices.
- Error Handling and Reporting:
Use generic error messages to avoid exposing sensitive information.
Implement robust error handling mechanisms for production.
*/ 


/*
! debugging in nodejs
is identifying and fixing errors, unexpected behaviors, and issues in your code.
While console.log can be a helpful tool for debugging by printing values to the console, but you end up on commenting the
line or deleting it and reusing again which is tedious
- npm install debug
const startUpDebugger = require("debug")("app:startup")
const dbDebugger = require("debug")("app:db") => debugging databases
console.log("sever is listening")
startUpDebugger("server is listening")
- set DEBUG=app:startup => save the debuggers in env var and switch between them (, if we cant to use both or app:* for all)
set DEBUG=nothing => so we don't use either
*/ 

/*
! template engines 
are libraries that enable you to embed dynamic data into HTML or other markup languages. which means generating a dynamic
HTML content on the server side before sending it to the client
- best packages: EJS (Embedded JavaScript), Pug (formerly Jade), Mustache, 
*/ 

/*
! structure
- routes folder: contain courses.js all the logic related to it, delete add ...etc
- config folder: 
- middleware folder:
- models:
- controllers 
- utils:
- services: 
- tests: 
.env file: 
server.js (or index.js entry point)

! 3 layer approach 
The "3 layers" approach in Node.js typically refers to a design pattern that separates concerns in a web application into three main layers: the presentation layer (or controller layer), the business logic layer, and the data access layer. This pattern is often associated with the Model-View-Controller (MVC)
client makes req to routes...etc this control gonna contact the database
! best 
the client makes a req to the server, the route needs to re_forward the req to this controller, because this controller
is taking care of creating orders (so the controller receives the req and sends the response), then the service will acces the model
layer then that has the query attache to it then it s gonna communicate the datatbase
3 layers approach: controllers, service, models
https://www.youtube.com/watch?v=fc6o1gwqZuA
! another way
.env file, .gitignore...
src folder:
- index.js entry point
- routes folder: for endpoints users, products, authentication...etc
- config folder: like database password...etc
- helpers
- models 
https://www.youtube.com/watch?v=oNlMrpnUSFE
*/ 






/*
! advanced
! sending files
sometimes it requires us to send files instead of data
- create a public/img1 => response.sendFile("./public/img1.png")
const path = require("path") => to be able to work with paths
path.join(__dirname, "..", "public", "img1") => to specify the parts of the path
__dirname is a node var to know the folder we are in to know if we do . or ..
- so res.sendFile(path.join(...))
! serving websites in node (express static file middleware)
using node to serve a frontend web application in addition to api => express.static("path or folder")
app.use("/site", express.static("public")) => /site/index.html , index is inside public
- we can use path.join to pr able to access the css... in the url
- instead of the server, we rely on content delivery services such as: Aws, akamai..
- ypu use them to host all your static files 
! templates engines
hbs (handlebars) are based on the old mustache template engine, EJS, pug...etc
*/

/*
! serving static files
files that don't change frequently and are served directly to clients without any processing by the server, 
- These files can include things like stylesheets, images, JavaScript files, and other assets that are required by a web application
1- dynamic files
files that are generated or processed by the server on each request. Examples include HTML templates, data fetched from a database
2- static files
These files remain constant and do not change between requests. Examples include CSS files, client-side JavaScript files, images, and other assets.
It reduces the load on the server and speeds up the overall performance of the application.

------------------
- you create an html file inside templates folder inside public folder
- you can't access a static file .../public/templates/demo.html
- to access it use the middleware express.static("./public")
app.use(express.static('public')) => server the static files from the 'public' directory
- now don't write public in the url => ...../templates/demo.html
- you can create a css folder and css file too and use it in that html, even access it after serving it
*/ 


/*
! EJS template
! template engines 
software designed to combine templates with a data model to produce, in our case, real HTML code.
Template engines handle the task of interpolating data into HTML code while providing some features (like partials in EJS) that would have been difficult to replicate by concatenating strings.
Introducing EJS
As mentioned earlier, EJS is one of the most popular template engines for JavaScript. One of the reasons to choose it is that EJS code looks like pure HTML.
It retains the syntax of HTML while allowing data interpolation, unlike Pug (another template engine) which uses a different syntax with indentation and spaces.
EJS files are saved with the .ejs file extension.
! Why do we use front end frameworks? When are template engines better?
*/




/*
! Sending Files in Node.js:
- response.sendFile() => to send files as a response.
- const path = require("path") => to work with file paths.
path.join(__dirname, "..", "public", "img1") helps specify parts of the path.
__dirname is a Node variable to determine the current folder.
const path = require("path");
Sending an image file
response.sendFile(path.join(__dirname, "..", "public", "img1.png"));
! Serving Websites in Node (Express Static File Middleware):
- express.static() middleware to serve static files (e.g., CSS, images, JavaScript).
Example: app.use("/site", express.static("public")) serves files under the "/site" URL.
const express = require("express");
const app = express();
! Serving static files from the 'public' directory
- app.use(express.static("public"));
Content Delivery Services:
Consider using services like AWS, Akamai, etc., to host static files.

! Template Engines (EJS):
Template engines like Handlebars (hbs), EJS, and Pug help combine templates with data to produce HTML code.
EJS is based on the Mustache template engine and uses HTML-like syntax.
Files are saved with the .ejs extension.
Serving Static Files with Express:

Organize static files (CSS, JS, images) in a directory (e.g., 'public').
Use express.static("public") middleware to serve these static files.
Access files without explicitly mentioning 'public' in the URL.

Serving static files from the 'public' directory
app.use(express.static("public"));

!EJS Templates:
EJS provides a way to interpolate data into HTML code while retaining the syntax of HTML.
It's beneficial when you want HTML-like syntax with dynamic data.
Example:

<!-- EJS template example -->
<h1><%= title %></h1>
<p><%= content %></p>
Frontend Frameworks vs. Template Engines:

Frontend frameworks (e.g., React, Angular) are used for building complex, dynamic web applications.
Template engines are useful when you want to combine templates with a data model to produce HTML code.

*/ 