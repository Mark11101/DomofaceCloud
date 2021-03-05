import React from 'react'
import { Redirect } from 'react-router-dom'
import Roles from '../../constants/Roles'

const RouteHandler = (props) => {
  const {
    role,
    isLogged,
  } = props;

  if (isLogged) {    
    if (role === Roles.ADMINISTRATOR) {
      return (
        <Redirect 
          to={{
            pathname: '/admin',
          }}
        />
      )
    } else if (role === Roles.SERVICE_COMPANY) {
      return (
        <Redirect 
          to={{
            pathname: '/company',
          }}
        />
      )
    } else if (role === Roles.TENANT) {
      return (
        <Redirect 
          to={{
            pathname: '/resident',
          }}
        />
      )
    } else {
      return null
    }
  } else {
    return (
      <Redirect 
        to={{
          pathname: '/sign-in',
        }}
      />
    )
  }
}

export default RouteHandler
