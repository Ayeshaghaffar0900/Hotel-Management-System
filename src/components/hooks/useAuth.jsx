import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../../store/slices/authSlice';

const useAuth = () => {
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClearError = () => {
    dispatch(clearError());
  };

  return {
    ...authState,
    clearError: handleClearError,
    dispatch // if you need to dispatch other actions from your components
  };
};

export default useAuth;