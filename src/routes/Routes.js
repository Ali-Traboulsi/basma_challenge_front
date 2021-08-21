import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
    useHistory
} from "react-router-dom";
import PropTypes from 'prop-types';
import {ACCESS_TOKEN} from "../constants/apiConstants";
import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import AdminHome from "../pages/Admin/Home/AdminHome";
import Registration from "../pages/User/Registration/Registration";
import Welcome from "../pages/User/Welcome/Welcome";
import LoginForm from "../components/LoginForm/LoginForm";

const authRoute = (Component) => {
    if (localStorage.getItem(ACCESS_TOKEN)) {
        return <Component />
    } else {
        return <Redirect to="/admin/login" />
    }
}

const Routes = props => {
    return (
        <Router {...props}>
            <Switch>
                <Route path="/admin/login" component={LoginForm}/>
                <Route exact path="/">
                    <Redirect to="/dashboard/home"/>
                </Route>
                <Route path="/admin/register" component={RegistrationForm}/>
                {/*<Route path="/admin/home" component={AdminHome}/>*/}
                <Route path="/dashboard/home">
                    {authRoute(AdminHome)}
                </Route>
                <Route path="/user/register" component={Registration}/>
                <Route path="/welcome" component={Welcome}/>
            </Switch>
        </Router>
    );
};

Routes.propTypes = {
    
};

export default Routes;