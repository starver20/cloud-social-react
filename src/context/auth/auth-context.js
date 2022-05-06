import axios from 'axios';
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const authContext = createContext({
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  user: {},
});

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

const useAuth = () => useContext(authContext);

const useProvideAuth = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('cloudSocialUser'))
  );

  const login = async (body, rememberMe) => {
    let response = await axios.post('/api/auth/login', body);
    if (response.status === 200) {
      toast.success('Login successfull.');
      if (rememberMe) {
        localStorage.setItem(
          'cloudSocialUser',
          JSON.stringify({
            user: {
              _id: response.data.foundUser._id,
              username: response.data.foundUser.username,
            },
            jwt: response.data.encodedToken,
          })
        );
      }
      setUser({
        user: {
          _id: response.data.foundUser._id,
          username: response.data.foundUser.username,
        },
        jwt: response.data.encodedToken,
      });
    }
    return { user: response.data.foundUser, status: response.status };
  };

  const signup = async (body) => {
    const response = await axios.post('/api/auth/signup', body);
    if (response.status === 201) {
      toast.success('Signup successfull.');
      setUser({
        user: response.data.createdUser,
        jwt: response.data.encodedToken,
      });
    }
    return { user: response.data.createdUser, status: response.status };
  };

  const logout = () => {
    toast.success('Logout successfull.');
    localStorage.removeItem('user');
    setUser({});
    navigate('/');
  };

  return { login, signup, user, logout };
};

export { AuthProvider, useAuth };
