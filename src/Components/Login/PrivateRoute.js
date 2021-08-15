import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

const PrivateRoute = ({ children, ...rest }) => {
    /* eslint-disable no-unused-vars */
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    /* eslint-disable no-unused-vars */
    return (
        <Route
            {...rest}
            render={({ location }) =>
                (loggedInUser.Role || sessionStorage.getItem('role')) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
};
export default PrivateRoute;