/*
! state in react
state is used to store data that represents the current situation, and can trigger re-rendering the component
- we use state instead of vars because: 
-- when using vars and update it, it doesn't display on the UI, because vars doesn't re-render (update) the page
- so we use state in every case that needs re-rendering
note: 
- back in the days, they couldn't use state in func comp unlike class component, but now we can with useState hook
- state is one of the reasons frameworks got invented
- state management is organizing your code in a specific structure so your ui doesn't have problems
*/ 

/*
! react virtual Dom behind the scenes
- React creates an initial virtual DOM representation (vDOM) based on the JSX code and component structure in your application.
- When a component's state or props change, React generates a new vDOM representation.
- React performs a process called reconciliation, where it compares the previous vDOM with the new vDOM to identify the differences.
- React determines the minimal set of changes needed to update the actual DOM based on the identified differences.
- React applies the necessary changes to the vDOM.
- React then applies these changes to the actual DOM, but only to the specific elements that require updates or additions. This process is known as reconciliation diffing.
- The updated portion of the vDOM is rendered to reflect the changes in the actual DOM.
? in another way (don't know if it's true)
you write a react code, means you are giving react a virtual dom, react remembers it, then make an actual dom out of it (that would be displayed)
then you make a change of the code , means you are giving react another virtual dom (2), it compares it with the v dom 1 and updates the real dom it made before
*/ 

/*
! UseState hook
hooks in react are funcs that allow you to use state and other react features in func component [since func were stateless comp unlike class]
- import { useState } from "react";
- useState hook is a function that returns an array [initial value, function]
the function changes and manipulates the initial value and re-render the page
- put the initial value inside useState(0)
- to link between the state the input, put the initial value var in Jsx [now it changes whenever the i,v changes]
- call a func in the event and use the hook function to change the initial value [cant edit the value directly, we should use the function of the hook]
note:
- we can either define the state and its values one by one, or use destructuring directly
*/