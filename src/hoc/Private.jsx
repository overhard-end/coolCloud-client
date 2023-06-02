import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Private = ({ children }) => {
  const user = useSelector((state) => state.userReducer);
  if (!user.accessToken) return <Navigate to="/" replace />;
  return children ? children : <Outlet />;
};
export default Private;
