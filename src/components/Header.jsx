import React from 'react'
import {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom' // Replaced useHistory with useNavigate
import Cookies from 'js-cookie'
import {AiOutlineMenu, AiOutlineLogout} from 'react-icons/ai'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate() // Use the useNavigate hook here

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true}) // Use navigate instead of history.replace
  }

  const renderMobileMenu = () => (
    <div className="md:hidden flex justify-between items-center w-full px-4 py-3 bg-gray-800">
      <Link to="/">
        <img
          className="w-24"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <div className="flex items-center">
        <button
          type="button"
          className="text-white text-xl mr-4"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <AiOutlineMenu />
        </button>
        <button
          type="button"
          className="text-white text-xl"
          onClick={onClickLogout}
        >
          <AiOutlineLogout />
        </button>
      </div>
      {isMobileMenuOpen && (
        <ul className="absolute top-16 left-0 right-0 bg-gray-800 flex flex-col items-center py-4 space-y-4">
          <li>
            <Link to="/" className="text-white text-lg hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="text-white text-lg hover:text-blue-500">
              Jobs
            </Link>
          </li>
        </ul>
      )}
    </div>
  )

  const renderDesktopHeader = () => (
    <div className="hidden md:flex justify-between items-center w-full max-w-7xl mx-auto px-4 py-6 bg-gray-800">
      <Link to="/">
        <img
          className="w-24"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
      </Link>
      <ul className="flex items-center space-x-6">
        <li>
          <Link
            to="/"
            className="text-white text-lg font-semibold hover:text-blue-500"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/jobs"
            className="text-white text-lg font-semibold hover:text-blue-500"
          >
            Jobs
          </Link>
        </li>
        <li>
          <button
            type="button"
            className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  )

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav>
        {renderDesktopHeader()}
        {renderMobileMenu()}
      </nav>
    </header>
  )
}

export default Header