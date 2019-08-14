import React, { Component } from 'react'
import {AuthContext} from '../contexts/auth-context'

//esto será un HOC

const withAuth = (Comp) => {
  return class WithAuth extends Component {
    render() {
      return (
        <AuthContext.Consumer>
          {({user, isLoggedIn, login, signup, logout}) => ( //desestrucutramos value directamente para poder usarlo debajo sin tener que poner value.loquesea
            <Comp 
              user={user} 
              isLoggedIn={isLoggedIn} 
              login={login} 
              signup={signup} 
              logout={logout} 
              {...this.props} //así mantenemos las props que le pasamos manulamente al propio componente
            />
          )}
        </AuthContext.Consumer>
      )
    }
  }  
} 

export default withAuth