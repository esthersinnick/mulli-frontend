import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import withAuth from './withAuth'

const AdminRoute = (props) => {
  const {isLoggedIn, component:Component, ...rest} = props; // convertimos component a mayúscula para que react lo entienda como un componente
  return (
    <>
      {isLoggedIn && props.user.isAdmin ? 
      <Route 
        render={(props) => <Component {...props} />} {...rest} 
      /> 
      : <Redirect to='/login' /> }
    </>

  )
}

export default withAuth(AdminRoute);
