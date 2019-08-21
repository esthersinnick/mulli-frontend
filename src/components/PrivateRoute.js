import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import withAuth from './withAuth'

const PrivateRoute = (props) => {
  const { isLoggedIn, render, ...rest } = props; // convertimos component a mayúscula para que react lo entienda como un componente
  return (
    <>
      {isLoggedIn ?
        <Route
          render={render} {...rest}
        />
        : <Redirect to='/login' />}
    </>

  )
}

export default withAuth(PrivateRoute);
