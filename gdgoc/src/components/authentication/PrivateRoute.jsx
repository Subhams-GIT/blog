import { Route} from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { redirect } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <redirect to="/login" />
        );
      }}
    />
  );
};

export default PrivateRoute;
