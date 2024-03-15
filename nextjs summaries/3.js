/*
! rendering 
Rendering in web development refers to the process of converting code into user interfaces. Js frameworks like React and Next.js offer flexibility in rendering approaches. 

* Client-Side Rendering (CSR):
entails rendering directly within the user's browser, where initial HTML content is loaded along with necessary JavaScript files, enabling dynamic fetching of additional data and resources. Next.js supports CSR, beneficial for adding interactivity to applications. 
drawbacks:
- seo, generating html that contains a single div tag is not optimal for seo as it provides little content to the engine
- performance, having the browser (client) handle all the work, such as fetching data, computing the ui, and making the html interactive
can slow things users might see a blank screen or a loading spinner while the page loads 
- each feature added is increases the size of js bundle, prolonging the wait time for users to see the ui

* Server-Side Rendering (SSR): utilized by default in next js
the server sends fully rendered HTML content to the client's browser. along the js code, then the browser (client) begins to render the page
while attaching the js to that html and make the application interactive (hydration)
- next js uses it by default
- used when fetching data or gathering resources from the backend (not much interactivity) 

benefits:
- it improves the seo because search engines can index the server-rendered content
- users can see immediately the html page instead of a blank screen or loading spinner

server-side solutions: 
- static side generation SSG: occurs at a building time, when the app is deployed on the server, this results in pages that are already rendered and ready to serve,
it is ideal for the content that doesn't change too often (caching)
- server side rendering SSR: renders pages on demand in response to user requests, it is suitable for personalized content like social media feeds, where the html depends 
on the logged in user (no caching)

drawbacks: 
- data fetching must be completed before the server begins rendering the html (1)
- the js required for the comp needs to be fully loaded on the client side before hydration can start (2)
- all components have to be hydrated before they become interactive (3)

* Suspense (solution)
react 18 introduces <Suspense>, used to unlock two major SSR
- (1) you don't have to fetch everything to show anything and that by wrapping the mainContent (that takes time) using <Suspense>,
so react doesn't wait for the mainContent data to be fetched and start streaming the html of the rest of the page, and send a spinner while waiting for the mainContent
navbar - sidebar - mainContent
- code splitting (2): allows you to mark specific code segments as not immediately necessary for loading, signaling your bundler
to segregate them into separate <script> tags, using react lazy enables you to separate the main section code from the primary js bundler,
now the js containing everything except the mainContent can be downloaded independently by the client without having to wait for the main content
AKA selective hydration, allows for the hydration of sections as they become available before the rest of html and js are fully downloaded
- (3) also offers a solution for the third issue the necessity to hydrate everything to interact with everything,
react begins hydrating asap enabling to interact with elements like headers and sidebar , it s managed automatically by react , 
in scenarios where multiple components are awaiting hydration, React prioritize hydration based on user interactions


drawbacks: 
- even tho the js streamed to the browser async , the entire code for a web must be downloaded by the user, 
as the app adds more features , the amount of code the user needs to download grows, should users really have to download so much data??
second the current approach requires all react comps undergo hydration on the client side , irrespective of their actual need for interactivity
this process , can inefficiently spend resources and extend the loading images and time to interactivity for users as their devices
need to process and render comps that may not require client side interaction . should all comps be hydrated even those that don't need
interactivity ??
third, in spite of server superior capacity for handling intensive processing tasks, the bulk of js execution still takes place on the user device
this can slow down the performance especially on devices that are not very powerful, should so much of the work be done on the user device
*/








/*
! images optimization 
import Image from "next/Image"
<Image src={} alt width height></Image>
- for better optimization, use image attributes 
- use priority if you want the image to be rendered first
! font optimization
import { Inter } from 'next/font/google'
If loading a variable font, you don't need to specify the font weight
const inter = Inter({
    subsets: ['latin'],
    weight: 500,
    display: 'swap',
})
<h1 lang="en" className={inter.className}>hey<h1/>
! fetching data in next js
* on the client
"use client"
import {useState, useEffect} from "react"

const [ products, setProducts ] = useState([])
useEffect(() => {
    async function fetchData() {
        const data = await fetch("json/placeholder")
        setProducts(data.json())
    }
    fetchData()
}, [])
* on the server
async function fetchData() {
    const data = await fetch("json/placeholder")
    data = await data.json()
    return data
}

export default async function Page() {
    const data = await fetchData()
    return <main>{data}</main>
}
- you don't need useState or useEffect since you don't need to rerender the page because server-side comps are pre rendered in each
request, and the data they receive during the server-side rendering (SSR) process is already part of their initial props.

! caching
the process of storing generated pages or assets in memory or on disk so that they can be served more quickly in subsequent requests
- on server component the data by default is cached.
func getRandomNumber() {
    return Math.floor(Math.random() * (1000 - 100) + 100)
}
const response = await fetch("", { cache: "force-cache"}) => by default in server comp
- set it to no-store to stop it
- in client side comp , cache: "no-store" by default
! notifications
react-toastify
- create your own tailwind css toast, flowBite
- Sonner is go good
*/ 

