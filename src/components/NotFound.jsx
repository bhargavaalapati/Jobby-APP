const NotFound = () => (
  <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900">
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
      className="w-64 mb-6"
    />
    <h1 className="text-white text-3xl font-bold mb-2">Page Not Found</h1>
    <p className="text-gray-400 text-lg text-center max-w-lg">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound