/*
! redux
redux is a state management library
- redux is better in large and complex projects, and useContext for small ones
- when using props and as the structure grows, maintaining the code and understanding it would be tedious and hard (prop drilling), and that's why we use useContext
so we can access data indirectly across comps, yet it can lead to unwanted data availability that we don't need causing states to be scattered
- Redux introduces an external store that holds the application's states, providing isolation from individual components. Data is brought into 
this central store to represent various states. Components can subscribe to the store, ensuring a single source of truth. Actions, 
such as deleting a post, are dispatched as objects containing a type and payload (e.g., id=10). Reducers handle these actions, 
updating the state in the store, which triggers re-rendering for all components utilizing that state.
? eg
deleting a post from a comp, sends an action to the store, this is an Obj that has: type(type of action you want like delete), payload
(extra data like Id), it'd go to the reducer function inside the store that has two params: action(like last one) and state(current state that nothing happened to it),
and this reducer will do the logic and contact the API to apply it (delete the post) [the api would return a new array of posts
with deleting the target and would be put as a new (update) state in the store]
as a result every comp that is subscribed to the state will be rendered
*/ 


/*
! how to use redux 
npm install redux react-redux
1- create a redux store 

import { createStore } from 'redux';
import rootReducer from './reducers'; // You need to create this file

const store = createStore(rootReducer);
export default store;

2- Create Reducers:
Define reducers to specify how the state should change in response to actions. Reducers are pure functions that take the current state and an action and return the new state.

const initialState = {
  Define initial state properties
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    Handle different actions and update state accordingly
    default:
      return state;
  }
};

export default rootReducer;

3- Create Actions:
which are functions that return actions. Actions are plain JavaScript objects with a type property.

export const increment = () => ({
  type: 'INCREMENT',
});

export const decrement = () => ({
  type: 'DECREMENT',
});

4- Combine Reducers (Optional):
If your application has multiple reducers, combine them using combineReducers from the redux package.

import { combineReducers } from 'redux';
import counterReducer from './counterReducer';
import otherReducer from './otherReducer';

const rootReducer = combineReducers({
  counter: counterReducer,
  other: otherReducer,
});

export default rootReducer;

5- Integrate Redux Provider:
Wrap your entire React application with the Provider component from react-redux. This makes the Redux store available to all components.

<Provider store={store}>
    <App />
</Provider>,

6- Connect Components to Redux:
7- Dispatch Actions:
Use the connect function to connect your components to the Redux store. Dispatch actions by calling the corresponding action creators.

*/ 