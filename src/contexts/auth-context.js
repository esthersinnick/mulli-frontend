import React, { Component } from 'react'
import authService from '../services/auth-service'

export const AuthContext = React.createContext(); //creamos el contexto

class AuthProvider extends Component {
  state = {
    isLoggedIn: false,
    user: {},
    isLoading: true,
  }
  userUpdate = (userUpdate) => {
    return authService.update(userUpdate)
      .then((user) => {
        this.setState({
          user
        })
      })
  }

  userSignUp = (userDetails) => {
    return authService.signup(userDetails)
      .then((user) => {
        this.setState({
          isLoggedIn: true,
          user
        })
      })
  }

  userLogin = (userDetails) => {
    return authService.login(userDetails)
      .then((user) => {
        this.setState({
          isLoggedIn: true,
          user
        })
      })

  }

  userLogout = () => {
    return authService.logout()
      .then(() => {
        this.setState({
          isLoggedIn: false,
          user: {}
        })
      })
  }

  componentDidMount() {
    authService.me()
      .then(user => {
        this.setState({
          user,
          isLoggedIn: true,
          isLoading: false
        })
      }).catch(() => {
        this.setState({
          user: {},
          isLoggedIn: false,
          isLoading: false
        })
      })
  }

  render() {
    const { user, isLoggedIn, isLoading } = this.state;
    return (
      <>
        {isLoading ? <p>Loading...</p> : (
          <AuthContext.Provider value={
            { //información a la que tendremos acceso desde cualquier componente que sea consumer de este provider
              user,
              isLoggedIn,
              login: this.userLogin,
              signup: this.userSignUp,
              logout: this.userLogout,
              userUpdate: this.userUpdate,
            }
          }>
            {this.props.children}
          </AuthContext.Provider>
        )}
      </>
    )
  }
}

export default AuthProvider;