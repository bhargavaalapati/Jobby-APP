import React from 'react'
import {Component} from 'react'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'

// 1. Rename the class to match the filename convention
class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {navigate} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    navigate('/', {replace: true})
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <div className="flex flex-col mt-5 w-full">
        <label className="text-gray-300 text-sm font-semibold mb-1" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="bg-gray-700 text-white border border-gray-500 rounded p-2 focus:outline-none focus:border-blue-500"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <div className="flex flex-col mt-5 w-full">
        <label className="text-gray-300 text-sm font-semibold mb-1" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="bg-gray-700 text-white border border-gray-500 rounded p-2 focus:outline-none focus:border-blue-500"
          value={password}
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </div>
    )
  }

  render() {
    const {showSubmitError, errorMsg} = this.state
    const {navigate} = this.props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      // Return the navigation call directly
      return navigate('/', {replace: true})
    }
    return (
      <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gray-900 md:space-x-10">
  <div className="hidden md:block w-96 h-96 flex-shrink-0">
    <img
      src="https://media.istockphoto.com/id/1163040032/vector/jobs-purple-background.jpg?s=1024x1024&w=is&k=20&c=MYzr2a2AvHl-lLyJLGwYzXvikhnwd5kSt2A-JYDgKLs="
      alt="website login"
      className="w-full h-full object-cover rounded-lg shadow-lg"
    />
  </div>
  <form className="bg-gray-800 p-8 md:p-12 rounded-lg shadow-lg w-11/12 md:w-96 flex flex-col items-center" onSubmit={this.submitForm}>
    <img
      src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
      className="w-36 mb-8"
      alt="website logo"
      data-testid="websiteLogo"
    />
    {this.renderUsernameField()}
    {this.renderPasswordField()}
    <button type="submit" className="bg-blue-600 text-white w-full py-2 mt-6 rounded font-semibold hover:bg-blue-700">
      Login
    </button>
    {showSubmitError && <p className="text-red-500 text-sm mt-2 self-start">*{errorMsg}</p>}
  </form>
      </div>
    )
  }
}

// 2. Wrap the component in a named function to use the hook
function LoginFormWithRouter(props) {
  const navigate = useNavigate();
  return <LoginForm {...props} navigate={navigate} />;
}

// 3. Export the new named wrapper component
export default LoginFormWithRouter