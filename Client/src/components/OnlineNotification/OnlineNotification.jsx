import React from 'react'

const OnlineNotification = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Your device seems to be offline</h1>
      <p className="text-lg text-gray-600 mb-6">
        Please check your internet connection and try reloading the page.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-lg hover: bg-gradient-to-r from-indigo-500 via-purple-300 to-pink-300 text-white transition duration-300"
      >
        Retry
      </button>
    </div>
  </div>
  )
}

export default OnlineNotification