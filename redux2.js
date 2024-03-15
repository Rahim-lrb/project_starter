/*
! example real-life project
* folder structure
src/
|-- app/
|   |-- store.js
|
|-- features/
|   |-- counter/
|   |   |-- counterSlice.js
|   |
|   |-- todos/
|       |-- todosSlice.js
|
|-- api/
|   |-- index.js
|   |-- todosAPI.js
|   |-- usersAPI.js
|
|-- components/
|   |-- Counter.js
|   |-- TodoList.js
|   |-- UserList.js
|
|-- store/
|   |-- configureStore.js
|
|-- utils/
|   |-- helperFunctions.js
|
|-- index.js

or in /features/counter you put both the slice and the component that uses it

* action/postsAPI.js: /api/index.js includes all the api requests
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../api/index.js';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    try {
        const { data } = await api.fetchPosts();
        return data;
    } catch (error) {
        throw error;
    }
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
    try {
        const { data } = await api.createPost(post);
        return data;
    } catch (error) {
        throw error;
    }
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, updatedPost }) => {
    try {
        const { data } = await api.updatePost(id, updatedPost);
        return data;
    } catch (error) {
        throw error;
    }
});



* postSlice.js
import { createSlice } from '@reduxjs/toolkit';
import * as postsAPI from './postsAPI';

const initialState = [];

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postsAPI.fetchPosts.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(postsAPI.createPost.fulfilled, (state, action) => {
        state.push(action.payload);
      })
      .addCase(postsAPI.updatePost.fulfilled, (state, action) => {
        const index = state.findIndex((post) => post._id === action.payload._id);
        if (index !== -1) {
          state[index] = action.payload;
        }
      })
      .addCase(postsAPI.deletePost.fulfilled, (state, action) => {
        return state.filter((post) => post._id !== action.payload);
      });
  },
});

export default postsSlice.reducer

* authSlice
import * as authAPI from '../api/authAPI';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    const response = await authAPI.login(credentials);
    return response.data;
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async () => {
    await authAPI.logout();
  }
);

const initialState = {
  user: null,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});


* component
- app.js
const dispatch = useDispatch();

useEffect(() => {
    dispatch(fetchPosts());
}, [dispatch]);

- Post.js
import { useSelector } from 'react-redux';

const Posts = () => {
    const posts = useSelector((state) => state.posts);

    return (
        <div>
        {posts.map((post) => (
            <div key={post._id}>
            <h2>{post.title}</h2>
            <p>{post.message}</p>
            </div>
        ))}
        </div>
    );
};
*/ 


/*
! real example in the old way
* actions/posts.js
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


* /api/index.js
import axios from "axios"
const url = `http://localhost:5000/api/v1/posts`;

export const fetchPosts = () => axios.get(url)
export const createPost = (newPost) =>  axios.post(url, newPost)
export const updatePost = (id, updatedPost) =>  axios.patch(`${url}/${id}`, updatedPost)

* constants/actionTypes.js
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const DELETE = 'DELETE';
export const FETCH_ALL = 'FETCH_ALL';
export const LIKE = 'LIKE';

* /reducers
- index.js

import { combineReducers } from 'redux';
import posts from './posts';

export const reducers = combineReducers({ posts });

- posts.js
import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (posts = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case LIKE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case CREATE:
            return [...posts, action.payload];
        case UPDATE:
            return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        default:
            return posts;
    }
};


* components
- app.js 
import { getPosts } from './actions/posts';

const [currentId, setCurrentId] = useState(0);
const dispatch = useDispatch();
const classes = useStyles();

useEffect(() => {
    dispatch(getPosts());
}, [currentId, dispatch]);

posts.js

const Posts = ({ setCurrentId }) => {
    const posts = useSelector((state) => state.posts);
    const classes = useStyles();

    return (
        posts.length ? <CircularProgress /> : (
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map((post) => (
            <Grid key={post._id} item xs={12} sm={6} md={6}>
                <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
            ))}
        </Grid>
        )
    );
};


*/ 
