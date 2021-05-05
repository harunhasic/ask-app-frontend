import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GuestRoutes from './GuestRoutes';
import PrivateRoute from './PrivateRoutes'
import Login from '../login/Login';
import Register from '../register/Register';
import LandingPage from '../landingPage/LandingPage'
import NewQuestion from '../form/NewQuestion'
import QuestionPage from '../questionPage/questionPage'
import UpdateQuestion from '../form/UpdateQuestion'


const UserRoutes = (props) => {
    return (
        <Switch>
            <GuestRoutes path="/login" {...props} component={Login} />
            <GuestRoutes path="/register" {...props} component={Register} />
            <Route exact path="/" render={() => <LandingPage {...props} />} />
            <Route path="/questions/new" render={() => <NewQuestion {...props} />} />
            <Route path="/question/update" render={() => <UpdateQuestion {...props} />} />
            <Route path="/question/:id" render={() => <QuestionPage {...props} />} />
        </Switch>
    );
}

export default UserRoutes;