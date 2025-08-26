import React from 'react'
import {Navigate} from 'react-router-dom' // Import Navigate
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const {children} = props
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken === undefined) {
    // Return the Navigate component to redirect
    return <Navigate to="/login" replace />
  }

  // If authenticated, render the child components
  return children
}

export default ProtectedRoute