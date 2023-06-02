import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const Public = ({ children }) => {
  const { accessToken } = useSelector((state) => state.userReducer);
  if (accessToken) return <Navigate to="/storage" />;
  return children ? children : <Outlet />;
};
export default Public;
