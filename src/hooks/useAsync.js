import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth/auth-context';

const useAsync = (asyncFunction, dispatch, payload, check) => {
  const navigate = useNavigate();
  const {
    user: { jwt },
  } = useAuth();
  const [loading, setLoading] = useState(false);

  const callAsyncFunction = async () => {
    try {
      setLoading(true);
      await asyncFunction(dispatch, navigate, payload, jwt, check);
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  return { callAsyncFunction, loading };
};

export { useAsync };
