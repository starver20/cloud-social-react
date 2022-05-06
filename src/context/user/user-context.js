import axios from 'axios';
import { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from '../auth/auth-context';
import { useManipulators } from '../../hooks/useManipulators';

const initialState = {
  followers: [],
  following: [],
  allPosts: [],
  allUsers: [],
  userPosts: [],
  bookmarks: [],
  // followingPosts: [],
  userDispatch: () => {},
};

const UserContext = createContext(initialState);

const userReducer = (state, action) => {
  const { getFollowingUsernames } = useManipulators();

  switch (action.type) {
    case 'INITIALIZE_DATA': {
      const {
        user: { bookmarks, followers, following, username } = {},
        posts,
        allUsers,
      } = action.data;

      return {
        ...state,
        bookmarks,
        followers,
        following,
        userPosts: posts.filter((post) => post.username === username),
        allPosts: posts,
        allUsers,
      };
    }
    case 'UPDATE_FOLLOWING': {
      return {
        ...state,
        following: action.payload.following,
      };
    }

    case 'UPDATE_POSTS': {
      return {
        ...state,
        allPosts: action.payload.posts,
      };
    }
    case 'UPDATE_BOOKMARKS': {
      return {
        ...state,
        bookmarks: action.payload.bookmarks,
      };
    }

    case 'CLEAR_DATA': {
      return { ...initialState };
    }
    default:
      return state;
  }
};

const UserProvider = ({ children }) => {
  const { user } = useAuth();
  // const { user: { user = {} } = {}, jwt } = useAuth();
  const [userState, userDispatch] = useReducer(userReducer, initialState);
  const value = { ...userState, userDispatch };

  useEffect(() => {
    const initializeData = async () => {
      try {
        let {
          data: { posts },
        } = await axios.get('/api/posts');

        let {
          data: { users },
        } = await axios.get('/api/users');
        // If used api/users above, it results in namespace error while reloading on a page whose url contains params

        if (user?.jwt) {
          let {
            data: { user: responseUser },
          } = await axios.get(`/api/users/${user?.user._id}`);

          userDispatch({
            type: 'INITIALIZE_DATA',
            data: {
              user: responseUser ? responseUser : {},
              posts,
              allUsers: users,
            },
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    initializeData();
  }, [user]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
