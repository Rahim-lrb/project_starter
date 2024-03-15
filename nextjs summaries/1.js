/*
! next js 
is a framework that is built on top of react js, it uses react to build user interfaces and add additional features to build production-ready
application (since react isn't fully feasible for production), like: routing, optimized rendering..etc

npx create-next-app@latest (install what you wan to use)
npm run dev => will create a development server on port 3000
npm run build => to prepare it for production 
npm start => to run it on production
structure:
- package.json , package-lock.json node modules .gitignore readme file
- next.config.js => configuration for next js 
- ts.config 
- tailwind.config
- eslint.json
- postcss.config
- next-env => declarations
- .next folder: generated when build or dev script , from it our next js app is served on the server
- public folder: contains static files like svg, images
- src folder: 
-- app folder (newly introduced by the app router)
global.css => styling
layout.tsx => layout that can be shared across different pages
page.tsx => the unique ui you see in port 3000

so when you run npm run dev , the execution is transferred to layout.tsx, the rootLayout component is rendered when you navigate to localhost:3000 
the children prop will refer to the component defined page.tsx in the app folder and thats the home comp that would be rendered to the browser

react introduces two ways of creating components: server side or client side 
next js components are server side by default, they can run tasks like reading file, fetching.. however they can't use hooks or handle user 
interaction so we got to make it client side by using "use client" on top of the comp
*/ 

/*
! routing
next has a file based routing mechanism, profile folder represents a url /profile, page.js inside it is the code we display ( a must name)
/app/about/page.tsx => /about, /app/contact/page.tsx => /contact
- next has a default error route , you can change it later
* nested routes /app/blog/page.tsx => /blog , blog/first/page.tsx => /blog/first , blog/second/page.tsx => /blog/second
* dynamic routes /products/page.tsx => /products , /products/page.tsx , /products/[productId]/page.tsx => /products/1
export default function Home( {params} ) {
	return <h1>product: {params.productID}</h1>
}
we can use ts to limit the params : { prams:{ productId: string } }
* nested dynamic routes 
/[productId]/reviews/page.tsx => products/1/reviews , /[productId]/reviews/[reviewId]/page.tsx => products/1/reviews/1
return <h1>product: {params.productID} and {params.reviewsId}</h1>
* catch all segments (parts of a URL path that correspond to dynamic route)
if we want 20 features pages and 20 concepts pages inside, we can use [featureId] and [conceptId]
- we can use slots instead [...name] slug is the most used name
/docs/[..slug] <h1>docs home page</h1> => any url that has docs would be captured and display: /docs/feature1 /docs/feature1/concept1
- you can access the segments from the url
export default function docs( {params} ) {
	if (params.slug?.length === 2)  /docs/routing/catch-all-segments
	return <h1>viewing docs for feature  {params.slug[0]} and concept {params.slug[1]}  </h1>
	if (params.slug?.length === 1)  => /docs/routing
	return <h1>viewing docs for feature  {params.slug[0]}</h1>
	return <h1>home page</h1>
}
- /docs would show 404 error, if you want to display the same page [[...slug]]
* not found page
we can define a not-found page when we navigate to a route that is not defined
/app/not-found.js => would apply to all children
/app/products/[productId]/not-found.js => would apply only on this directory
import { notFound } from "navigation"
export default NotFound()
	<h1>not found page</h1>
- or do it inside the comp /reviews/[reviewId]/page.tsx
if (parseInt(params.reviewId) > 1000 ) {
	notFound()
} return <h2>review 1</h2>
* private folders _
_lib/format-date.ts
_lib/page.tsx => you can not navigate to it, we use it for separating ui logic
* route groups () 
instead of /register/page.tsx , /login/page.tsx , /forgetPassword/page.tsx do => /(auth)/login/page.tsx..etc  => /login
or keep it /auth/login/page.jsx => /auth/login
* layout files
- a file in every folder beside page.tsx, helps structure the content in page.tsx 
const metaData
export default function layout( {children} ) {
	return (
		<>
			<>header</>
			<h1>{children}</h1>
			<>footer</>
		</>
	)
}
- each file applies on its folder and the children folders
- we can create a specific one for each page
* nested group layouts
/(auth)/with-auth-layout/login
/(auth)/with-auth-layout/register
/(auth)/with-auth-layout/layout.tsx => inner layout => would apply only to login and register
* metadata in routing
information associated with routes that can be used for various purposes such as SEO, page titles, description, redirects,, prefetching data...etc
- you can define metadata in any page or layout (page data overwrite layout data), and these metadata are read in order from the root to the top
1- export a static metadata object
export const metadata = {
	title: "About Code volution"
}
2- export a dynamic generateMetadata function
/[productsId]
import {metadata} from "next"
export const generateMetadata = ( {params} ) {
	Metadata => {
		title: `product ${params.productId}`
	}
}

- title as a string 
import Metadata from "next"
export const metadata:Metadata = {
	title: {
		absolute: "shop",
		default: "next project", when the pages in the folder doesn't have a default
		template: "%s | CODE EVOLUTION"
	}
}


* link component navigation
import Link from "next/Link"
<Link href="/blog">hey<Link/>

- active links: 
import {usePathname} from "next/navigation"

const pathname = usePathname()
const active = pathname.startsWith(link.href)
<Link href="" className={isActive ? "font-blue-600" : "font-red-100"} >  <Link/>

- navigating programmatically
"use client"
import {useRouter} from "next/navigation"

const Router = useRouter()
const handleClick = () => {
	router.push("/blog")
	router.replace("/blog") => to replace the history
}

* templates
similar to layout it can structure your content, the only difference when you navigate through pages that share the template, a new instance of the component
is mounted, dom elements are recreated, state is not preserved, and effects are re-synchronized.
- if we create an input in layout.jsx and then write something and navigates to another route , the state is saved and preserved ,
so when you change to template it s not
* loading 
loading.js file in every folder that would be shown before the page is shown, can be used as a spinner or skeleton
* error handling
error.tsw file that can be 
created in every folder to be shown instead of bad errors like failed fetching 
/[reviewId]/error.js
"use client"
export default errorBoundary({error}) {
	return <h1>error page<h1/>
}
note: 
add useClient in the component so it can use this
components hierarchy layout, template , error , suspense , errorBoundary , page

- recovering from errors:
export default errorBoundary({error, reset}) {
	return (
		<>
			<h1>error page<h1/>
			<button onClick={reset}>try again</button>
		</>
	)
}
- handling errors in nested routes
errors bubble up to the closest error boundary , error.tsx will cater to errors for all its child segments, use error.tsx
in the parent folder so it covers these

- handling errors in layouts
ErrorBoundary doesn't catch the error of the layout.js cz it's above it in the hierarchy of the folder, we solve it by moving the file
to the previous folder
*/ 


/*
! parallel routes and intercepting routes
* parallel routes /@name
defining multiple routes that can be displayed in parallel

- old way: user analytics page, notifications page; revenue metrics at once
/dashboard/layout.tsx
<div>{children}<div>
<Analytics></Analytics>
<Notifications></Notifications>
<metrics></metrics>

- new way: slots
/dashboard/@notifications/page.tsx    /dashboard/@user/page.tsx     /dashboard/@revenue/page.tsx  /dashboard/layout.tsx
export default layout({children, users, notifications , revenue}) {
	return (
		<>
			<div>{children}</div>
			<div>{users}</div>
			<div>{notifications}</div>
			<div>{revenue}</div>
		</>
	)
}
- these slots @ cannot be accessed alone 
- each slot can have its layout.tsx, loading.tsx, error.tsx (like using a loader for the one that takes time)
- sub navigation in routes: each slot can function as mini-application with its own navigation and state management

* unmatched routes 
/dashboard/@notifications/page.tsx
(
	<div> 
	<h1>notification<h1/>
	<Link href="/dashboard/archived">archived<Link/>
	</div>
)
/dashboard/@notifications/archived/page.tsx
(
	<div> 
	<h1>archived<h1/>
	<Link href="/dashboard">archived<Link/>
	</div>
)
- the other slots continue to display the content while navigation between notifications and archived, 
- reloading the page would result 404 error, because there is not default.tsx in the slots we used so we know what to display on the
initial load as it serves as a fallback when the framework cannot retrieve a slot's active state from the currentUrl,
you can either mirror the content in page.tsx or create one, default.tsx in dashboard, analytics, users, notifications

* conditional rendering
we can render a login page or dashboard based on the user state
/dashboard/@login/page.tsx => a slot  (don't forget default since it's a slot)
layout.tsx
const isLogged = true 
export default layout({children, users, notifications , revenue}) {
	return isLogged ? (
		<>
			<div>{children}</div>
			<div>{users}</div>
			<div>{notifications}</div>
			<div>{revenue}</div>
		</>
	) : 
	(
		login
	)
}
* intercepting routes 
stop the default routing and display an alternate view or comp while navigation, like when you click on the product, you see like a model of it, 
but when you reload you see the product page. or login on navbar shows a model but when you reload or search by the url you see the whole page,
or in photo field you click you see the image and so on 
example:
- F1/page.tsx
<h1>this is f1<h1/>
<Link href="/f1/f2" >go to F2</Link>
- F2/page.tsx
<h1>this is f2<h1/>
- to create intercepting route (.)f2/page.tsx, use the name of the folder you want to intercept
<h1>this is the page that intercepts f2<h1/>
it the folder you want to intercept is in the parent dir, use (..), two levels above (..)(..), from the root dir (...)
- don't forget to add default.tsx for each
example 2 - Navbar/page.tsx - login/page.tsx

* parallel intercepting routes 
in image gallery, when you click on image, a model appears (intercepting), but the url updates to photo/2 which means it's parallel
also ordinary modal when you click backward , it returns to the last page, but we could work this and make it return to /photos
example:
/photo-feed/page.tsx => we display all the images and use link to navigate to dynamic page
/photo-feed/[id]/page.tsx => we display the image in a whole dynamic page
- we create a model slot so you can't search for it @modal (parallel route) and include it with the children in layout
- inside it we make the intercepting route (..)photo-feed/[id] => photo-feed is two levels above
@modal/(..)[id]/page.tsx
<h1>photo feed id interceptor<h1/>
- the default of the lost @ is null, so when you reload, the interceptor modal is gone
*/ 