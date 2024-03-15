/*
! backend development
next helps u create API endpoints within your applications, these api routes are server-side endpoints
- you can define them /profile/route.tsx => /profile 
- to avoid conflicts with the pages /profile/page.tsx and route.tsx  we create /app/api/profile/route => /api/profile
or create api folder inside any folder /profile/api/route.tsx => /profile/api
* route handlers 
- we define it inside the route.Tsx as a function with the method name: GET, POST, PATCH, DELETE
/app/hello/route.ts  => /hello would return a hello world text 
export async function Get() {
    return new Response("hello world") => returns a text
    return Response.json("hello world"); => returns a json
    return Response.json({message: "hello world"}, {status: 200}); => you can set status code altho you don't have to
}
- we can use a NextResponse instead of Response , which is extends the api response with additional features
* Post request
export async function Post(request: Request) {
    const comment = await request.json();
    const newComment = {
        id: comments.length + 1, // Incrementing the length of existing comments for new comment ID
        comment: comment.text
    };
    comments.push(newComment); // Add the new comment to the comments array
    return new Response(JSON.stringify(newComment), {
        headers: { "Content-Type": "application/json" },
        status: 201
    });
}
* dynamic routing
- to create a route that has a param /comments/1 , inside comments folder we create a folder comments/[commentId]/route.ts
export async function GET(request, response, { params } ) {
    console.log(params) => { commentId: 1 }
*/ 



/*
! routing
! route handlers
unlike page routes which responds with an html content, they allow you to create restful endpoints , giving you full control of the response
there is no overhead of having to create or configure separate server, they are also great for making external api requests
route handlers run server side , ensuring that sensitive information like private keys remain secure and never gets shipped to a browser
they are equivalent to api routes in page routes
/app/hello/route.ts
export async function Get() {
    return new Response("hello world")
}
/hello
- they can be organized in folders and sub-folders
- be careful in conflicts 
/profile/page.tsx and route.tsx => the route would appear
to avoid that do all of them in a folder called api /profile/api/route.tsx so you search profile/api

. handler get request
/comments/route.js
import { comments } from "./data"
export async function GET(){
    return Response.json(comments)
}
. post request
export async function Post(request: Request) {
    const comment = await request.json();
    const newComment = {
        id: comments.length + 1, // Incrementing the length of existing comments for new comment ID
        comment: comment.text
    };
    comments.push(newComment); // Add the new comment to the comments array
    return new Response(JSON.stringify(newComment), {
        headers: { "Content-Type": "application/json" },
        status: 201
    });
}
. dynamic route handlers
/comments/[commentId]/route.ts
export async function GET(request: Request, { params }: { params: {id:string } } ) {
    const comment = comments.find((comment) => comment.id == parseInt(params.id))
    return Response.json(comment);
}

. patch request (update)
export async function Patch(request: Request, { params }: { params: {id:string } } ) {
    const body = await request.json()
    const { text } = body
    const index = comments.findIndex(comment => comment.id === parseInt(params.id))
    // comments[index].text = text;
    return Response.json(comments[index]);
}

. delete request
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const index = comments.findIndex(comment => comment.id === parseInt(params.id));
    const deletedComment = comments[index]
    comments.splice(index, 1);
    return Response.json(deletedComment)
}

! url query parameters ?
/comments?query=first
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query")
    const filteredComments = query ? comments.filter((comment) => comment.text.includes(query) ): comments
    return Response.json(filteredComments)
}
used when adding pagination and sorting

! redirects in route handlers
when entering an id that doesn't exist it should direct you somewhere
import { redirect } from "next/navigation";
export async function GET(request: NextRequest) {
    if (parseInt(params.id) > comments.length) {
        redirect("/comments")
    }
    ...
}

! headers in route handlers
http headers represent the metadata associated with an api request and response 
- request headers: sent by the client like the web browser to the server, they contain information about the req which helps the server
understand and process it quickly
-- User-Agent: Information about the client making the request. like the browser and the operating system
-- Accept: indicates the content type like text, video, image formats that the client can process
-- Authorization: Credentials for authentication of the client with the server.
- response headers: sent from the server to the client, they provide info about the server and the data
-- Content-Type: indicates the media type of the response such as text/html , html documents, application/json
-- 
/profile/api
by default accept header and user-agent, lets add authorization Bearer token to thunder client
import { type nextRequest } from "next/server"
import { headers } from "next/headers"
export async function GET(request: NextRequest) {
    . 1
    const requestHeaders = new Headers(request.headers)
    const token = requestHeaders.get("authorization")
    . 2 use th headers function
    const headersList = headers()
    const token = headersList.get("authorization")
    . send headers by default plain text
    return new Response("api data", { headers: "Content-Type": "text/html" }) 
}
! cookies in route handlers
1- return a new Response using setCookie method
import { cookies } from "next/headers"
export async function GET(request: NextRequest) {
    . 1
    const requestHeaders = new Headers(request.headers)
    const token = requestHeaders.get("authorization")
    . 2 use th headers function
    const headersList = headers()
    const token = headersList.get("authorization")
    . send headers by default plain text
    return new Response("api data", { headers: "Content-Type": "text/html", "Set-Cookie": "theme-dark" }) 
    . don't forget to set its anme
    const theme = request.cookies.get("theme")

    . cookies function , import it
    cookies().set("theme", "dark")
    console.log(cookies().get("theme")) to read it
    cookies func has other methods , has, delete
}

! caching in route handlers
route handlers are cached by default when using the Get method with the Response object in next js
/app/time/route.ts
export async function GET() {
    return Response.json( {time: new Date().toLocalTimeString  } )
}
when you build the app and run it on production, the  time doesn't update because it is cached when using the get method
how do we inform that we don't want the response to be cached ??
- at the top of route.ts export const dynamic = "force-dynamic" (auto is default)
- other sol: using the request object with the get method 
- employing dynamic functions like headers or cookies
- use any http method other than GET
! middleware
is a powerful next js feature ,that offers a robust way to intercept and control the flow, of requests and responses within your applications
it does this at a global level significantly enhancing features like redirection, url rewrites, auth, headers and cookies management
. redirecting
- lets define a middleware 
/src/middleware.ts 
- specify paths where you want it 
-- 1 - custom matches config
import {NextResponse, type NextRequest} from "next/server"
this redirects to the home page when /profile is accessed
export function middleware(request: nextRequest) {
    return nextResponse.redirect("/", request.url)
}
export const config = {
    matches: "/profile",
}

-- 2 - conditional statements
export function middleware(request: nextRequest) {
    if (request.nextUrl.pathname == "/profile") {
        return NextResponse.redirect(new Url("/", request.url))
    }
}
. url rewrite (good for seo)
. handle cookies and headers
export function middleware(request: nextRequest) {
    const response = NextResponse.next()
    const themePreference = request.cookies.get("theme")
    if (!themePreference) {
        response.cookies.set("theme", "dark")
    }

    response.headers.set("custom-header", "custom-value")
    return response
}
*/ 






/*
! environment variable in next js
- create .env.local 
DB_STRING=hey
console.log(process.env.DB_STRING)
*/ 