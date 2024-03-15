/*
! react js 
a declarative, efficient, and flexible JavaScript library for building user interfaces. It simplifies the process of creating 
interactive UIs by breaking them into reusable components.
- a react application is built using components (the building blocks).
! functional component
- the component file name should be capitalized, its func should be exported
- the comp returns a JSX (a mix of html and js, html and logic)
- the returned jsx should be put inside one DIV or empty <></>
- there isn't document.get in react so we attach the function to the event 
function Component() {
    logic here
    const styling = {
        color:"red",
    }
    function age() {
        return 7
    }

    return (
        <div>
            <h1 style={{color: "red"}}  >hello</h1>
            <h2 style={{styling}  >hello</h2>
            <h3>my age is: {age} </h3>
        </div>
    )
}
export default Component;

! props (properties)
an object that contains values we passed from one component to another
<Idea2 name="john" lastName="smith">hey react</Idea2> <== in parent
export default function Comp(props) {
    return (
        <button>
            <p>{props.children}</p>
            my name is:  {props.name} {props.lastName}
        </button>
    )

- you can destructure them directly Comp({name, lastName="none"}), and even use default param

! conditional rendering
function Greeting({ isLoggedIn }) {
    return (
        <div>
        {isLoggedIn ? (
            <h1>Welcome back, User!</h1>
        ) : (
            <h1>Please log in to continue.</h1>
        )}

        {isLoggedIn ? <LoggedInComponent /> : <LoggedOutComponent />}
        </div>
    );
}

! list rendering
rendering a collection of elements, often represented as an array, into the JSX of your React components
const items = ['Item 1', 'Item 2', 'Item 3'];

return (
    <ul>
        {items.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
    </ul>
);
note: 
li in react should have
*/ 