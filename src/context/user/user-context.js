import axios from 'axios';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from '../auth/auth-context';

const initialState = {
  followers: [],
  following: [],
  allPosts: [],
  userPosts: [],
  userDispatch: () => {},
};

const UserContext = createContext(initialState);

const userReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_DATA': {
      const {
        user: { bookmarks, followers, following, username } = {},
        posts,
      } = action.data;
      return {
        ...state,
        bookmarks,
        followers,
        following,
        allPosts: posts,
        userPosts: posts.filter((post) => post.username === username),
      };
    }

    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const { user } = useAuth();
  const [userState, userDispatch] = useReducer(userReducer, initialState);
  const value = { ...userState, userDispatch };

  useEffect(() => {
    const initializeData = async () => {
      let {
        data: { posts },
      } = await axios.get('api/posts');
      console.log(posts);
      userDispatch({
        type: 'INITIALIZE_DATA',
        data: { user: user ? user : {}, posts },
      });
    };

    initializeData();
  }, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
