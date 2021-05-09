import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GuestRoutes from './GuestRoutes';
import PrivateRoute from './PrivateRoutes'
import Login from '../login/Login';
import Register from '../register/Register';
import LandingPage from '../landingPage/LandingPage'
import NewQuestion from '../form/NewQuestion'
import QuestionPage from '../questionPage/QuestionPage'
import UpdateQuestion from '../form/UpdateQuestion'
import NewAnswer from '../form/NewAnswer';
import ProfilePage from '../profile/ProfilePage';
import UpdateAnswer from '../form/UpdateAnswer';
import UpdateProfile from '../form/UpdateProfile';

const UserRoutes = (props) => {
    return (
        <Switch>
            <GuestRoutes path="/login" {...props} component={Login} />
            <GuestRoutes path="/register" {...props} component={Register} />
            <Route exact path="/" render={() => <LandingPage {...props} />} />
            <Route path="/questions/new" render={() => <NewQuestion {...props} />} />
            <Route path="/questions/answer/new" render={() => <NewAnswer {...props} />} />
            <Route path="/question/update/" render={() => <UpdateQuestion {...props} />} />
            <Route path="/answer/update" render={() => <UpdateAnswer {...props} />} />
            <PrivateRoute path="/question/:id" component={QuestionPage} />
            <PrivateRoute path="/profile" component={ProfilePage} />
            <PrivateRoute path="/edit/user/" component={UpdateProfile} />
        </Switch>
    );
}

export default UserRoutes;