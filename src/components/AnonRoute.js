import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import withAuth from './withAuth'

const AnonRoute = (props) => {
  const { isLoggedIn, component: Component, ...rest } = props; // convertimos component a mayúscula para que react lo entienda como un componente
  return (
    <>
      {!isLoggedIn ?
        <Route
          render={(props) => <Component {...props} />} {...rest}
        />
        : <Redirect to='/' />}
    </>

  )
}

export default withAuth(AnonRoute);
