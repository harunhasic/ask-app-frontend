import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isTokenValid } from '../../utils/LocalStorage/LocalStorage';


const PrivateRoute = ({ component: Component, path: Path, ...rest }) => {
    return (
        <Route
            path={Path}
            render={() => isTokenValid() ? <Component {...rest} /> : <Redirect push to="/login" />}
        />
    )
}

export default PrivateRoute;