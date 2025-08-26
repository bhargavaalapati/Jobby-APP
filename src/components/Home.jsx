import React from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'

const Home = () => (
  <div className="min-h-screen bg-[url('https://assets.ccbp.in/frontend/react-js/home-sm-bg.png')] md:bg-[url('https://assets.ccbp.in/frontend/react-js/home-lg-bg.png')] bg-cover flex flex-col pt-20">
    <Header />
    <div className="flex flex-col p-8 md:p-12 max-w-screen-xl mx-auto flex-grow justify-center">
      <h1 className="text-white text-4xl md:text-6xl font-bold leading-tight">
        Find The Job That <br /> Fits Your Life
      </h1>
      <p className="text-gray-300 text-lg md:text-xl mt-4 max-w-lg">
        Millions of people are searching for jobs, salary information, company reviews, and more. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button
          type="button"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-6 hover:bg-blue-700"
        >
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home