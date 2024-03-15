/*
! redux & redux-toolkit & react-redux
is a js (not tied to react only) predictable state container 
- react-redux is a tool to connect our project to the store
- redux
- redux toolkit is a package and the official tool to use redux easily because using redux directly can be confusing 
the three core concepts of redux: 
1-store: 
- an external store that holds the application states, ensuring a single source of truth, and the components have the choice
to subscribe, also a global state that is stored as an object inside te store.
- a global state that's gonna be accessible across any component and can be subscribed to by any component
- store is made up of slices, each one is responsible of a feature in the app, counterSlice, userSlice, postsSlice..., each one
would hold the pieces of state related to it.
2-actions:
- you use it to tell redux what it should do to the state using dispatch, like: action to increment the state of count, decrement...
3-reducers:
- is the function that would handle the state based on the action type, if the action is update, it'd update the state
- we can't mutate (change the state directly), we should copy the state update it and replace it

* creating the store in /state/store.js or /app.store.js
import { configureStore } from '@reduxjs/toolkit'
export default configureStore({
    reducer: {
      . here we add the slices of our project (some people call them reducers)
      counter: counterSlice
      todo: todoSlice,
      user: userSlice,
    }
})

- connect it to your application in index.js using react redux
import { Provider } from 'react-redux';
import { store } from "./state/store"
<Provider store={store}>
    <App />  
</Provider>

* the slice and the reducers => /state/counter/counterSlice.js or src/features/counter/counterSlice.js so we put the component in the same file
- a slice is refers to a portion of the Redux state that is managed independently within the Redux store. It encapsulates related data and logic for a specific feature or domain of your application.
- the reducer function specifies how the state should change in response to dispatch actions
import { createSlice } from '@reduxjs/toolkit';

const initialState = { value: 0 }; => define the initial state an object, array...

const counterSlice = createSlice({ => create the slice, name it, give it the initial state, reducers
    name: 'counter',
    initialState,
    reducers: { => an obj that contains all the reducers that tell the state how to change
        increment(state) {
            state.value += 1;
        },
        decrement(state) {
            state.value -= 1;
        },
        incrementByAmount(state, action) { => this is how to receive data 
            state.value += action.payload;
        }
    }
});


. export the reducers also their names as an action (using destructuring)
export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer; => export the slice so it can be used in the store

* use the store states in your component
/component.js
- useSelector => to access any state inside the store
- useDispatch => to dispatch an action type 

import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './actions';

const CounterComponent = () => {
    const count = useSelector(state => state.count);
    const dispatch = useDispatch();
    const [incrementAmount, setIncrementAmount] = useState(1);

    return (
        <div>
            <h1>Counter Value: {count}</h1>
            <button onClick={() => dispatch(increment())}>Increment</button>
            <button onClick={() => dispatch(decrement())}>Decrement</button>
            <input 
                type="number" 
                value={incrementAmount} 
                . you pass a payload to your action creator
                onChange={(e) => setIncrementAmount(parseInt(e.target.value))} 
            />
            <button onClick={() => dispatch(incrementByAmount(incrementAmount))}>
                Increment by Amount
            </button>
        </div>
    );
};
*/



/*
! fetching in redux (Thunk)
s a function that wraps an action creator, delaying its execution. It's used to handle asynchronous operations, like fetching data, 
by allowing you to prepare the result before dispatching actions.

* slice
/state/counter/counterSlice.js 
import { createSlice } from '@reduxjs/toolkit';

. define the thunk before the slice / two args: name (we name it ourselves), the function we can pass what we want to it
export const fetchPosts = createAsyncThunk('posts/fetchPosts',
  async () => {
    const response = await fetch('/api/posts');
    const data = await response.json();
    return data;
  }
);


const initialState = {
  posts: [],
  loading: false,
  error: null
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => { 
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


export { fetchPosts };
export default postsSlice.reducer;

- we can define as many as we want initial fields , postById, posts...etc
- we can put all the thunks in a folder called 
* usage
const dispatch = useDispatch();
  . state is the store, posts is the slice, posts initial state
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    // Dispatch fetchPosts action when component mounts
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
*/


