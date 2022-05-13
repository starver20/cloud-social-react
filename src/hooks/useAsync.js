import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const useAsync = (asyncFunction, dispatch, payload, check) => {
  const navigate = useNavigate();
  const { jwt } = useSelector((state) => state.auth.user);
  const [loading, setLoading] = useState(false);

  const callAsyncFunction = async () => {
    try {
      setLoading(true);
      await dispatch(asyncFunction(payload));
      setLoading(false);
    } catch (err) {
      alert(err);
    }
  };

  return { callAsyncFunction, loading };
};

export { useAsync };
