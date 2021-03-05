import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'

import RouteHandler from './route-handler/RouteHandlerContainer'
import IntercomScreen from './screens/intercom-screen/IntercomScreenContainer'
import AdminScreen from './screens/admin-screen/AdminScreenContainer'
import ServiceScreen from './screens/service-screen/ServiceScreenContainer'
import ResidentScreen from './screens/resident-screen/ResidentScreenContainer'
import NotFoundScreen from './not-found-screen/NotFoundScreen'
import SignIn from './sign-in/SignInContainer'
import NotificationsProvider from '../utils/notifications/NotificationsProvider'
import UpdateHandler from './subcomponents/update-handler/UpdateHandlerContainer'
import history from '../url/history'
import Roles from '../constants/Roles'

import './App.css'
import '../styles/variables.css'
import '../styles/common.css'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = (props) => {
  const {
    role,
    isLogged,
    requestCheckAuth,
  } = props;

  React.useEffect(() => {

    isLogged && requestCheckAuth()
  }, [isLogged, requestCheckAuth])

  return (
    <Router history={history}>
      <NotificationsProvider />
      <div className='b-app'>
        <UpdateHandler />
        <div className='b-app__main-content'> 
          <Switch>
            <Route exact path='/' component={RouteHandler} />
            <Route path='/sign-in' component={SignIn} />
            <Route exact path={
              role === Roles.ADMINISTRATOR
              ?
                '/admin/intercom/:id'
              :
                '/company/intercom/:id'
            } 
            component={IntercomScreen} />
            <Route path='/admin' component={AdminScreen} />
            <Route path='/company' component={ServiceScreen} />
            <Route path='/resident' component={ResidentScreen} />
            <Route component={NotFoundScreen} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
