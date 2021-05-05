import React from 'react';
import { Route } from 'react-router-dom';
import { isTokenValid } from '../../utils/LocalStorage/LocalStorage';
import NotFound from '../notFound/NotFound';


const GuestRoutes = ({ component: Component, path: Path, ...rest }) => {
  return (
    <Route
      path={Path}
      render={() => !isTokenValid() ? <Component {...rest} /> : <NotFound />}
    />
  )
}

export default GuestRoutes;