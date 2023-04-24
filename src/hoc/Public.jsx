import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '..';
import { useContext } from 'react';

const Public = ({ children }) => {
  const user = useContext(UserContext);
  if (user.tokens.accessToken) return <Navigate to="/" />;
  return children ? children : <Outlet />;
};
export default Public;
