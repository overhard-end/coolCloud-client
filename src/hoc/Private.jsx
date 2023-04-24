import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '..';
import { useContext } from 'react';

const Private = ({ children }) => {
  const user = useContext(UserContext);
  const refreshToken = user.tokens.refreshToken;
  if (!refreshToken) return <Navigate to="/auth" replace />;
  return children ? children : <Outlet />;
};
export default Private;
