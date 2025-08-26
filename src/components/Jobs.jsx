import React from 'react'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import {ClipLoader} from 'react-spinners'

import Header from './Header'
import JobCard from './JobCard'

import {employmentTypesList, salaryRangesList} from './Constants.jsx'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileData: {},
    jobsList: [],
    profileApiStatus: apiStatusConstants.initial,
    jobsApiStatus: apiStatusConstants.initial,
    searchInput: '',
    employmentType: [],
    minimumPackage: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobs()
  }

  getProfileDetails = async () => {
    this.setState({profileApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const profileDetails = fetchedData.profile_details
      const updatedProfileData = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        profileData: updatedProfileData,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileApiStatus: apiStatusConstants.failure})
    }
  }

  getJobs = async () => {
    this.setState({jobsApiStatus: apiStatusConstants.inProgress})
    const {searchInput, employmentType, minimumPackage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const employmentTypeString = employmentType.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypeString}&minimum_package=${minimumPackage}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedJobsList = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedJobsList,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({jobsApiStatus: apiStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  onSearchButtonClick = () => {
    this.getJobs()
  }

  onSelectEmploymentType = event => {
    const {value, checked} = event.target

    if (checked) {
      this.setState(
        prevState => ({
          employmentType: [...prevState.employmentType, value],
        }),
        this.getJobs,
      )
    } else {
      this.setState(
        prevState => ({
          employmentType: prevState.employmentType.filter(
            type => type !== value,
          ),
        }),
        this.getJobs,
      )
    }
  }

  onSelectSalaryRange = event => {
    this.setState({minimumPackage: event.target.value}, this.getJobs)
  }

  renderProfileLoadingView = () => (
    <div className="flex justify-center items-center py-8">
      <div data-testid="loader">
        <ClipLoader // Corrected component name
          color="#ffffff"
          size={50}
        />
      </div>
    </div>
  )

  renderProfileFailureView = () => (
    <div className="flex justify-center items-center py-8">
      <button
        type="button"
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700"
        onClick={this.getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderProfileSuccessView = () => {
    const {profileData} = this.state
    const {name, profileImageUrl, shortBio} = profileData

    return (
      <div className="bg-gray-800 p-6 rounded-lg mb-6">
        <img src={profileImageUrl} alt="profile" className="w-16 h-16 rounded-full mb-4" />
        <h1 className="text-white text-lg font-bold mb-1">{name}</h1>
        <p className="text-gray-400 text-sm">{shortBio}</p>
      </div>
    )
  }

  renderProfile = () => {
    const {profileApiStatus} = this.state
    switch (profileApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderProfileLoadingView()
      case apiStatusConstants.success:
        return this.renderProfileSuccessView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      default:
        return null
    }
  }

  renderJobsLoadingView = () => (
    <div className="flex justify-center items-center py-8">
      <div data-testid="loader">
        <ThreeDots // Corrected component name
          color="#ffffff"
          height={50}
          width={50}
        />
      </div>
    </div>
  )

  renderJobsSuccessView = () => {
    const {jobsList} = this.state
    const showJobsList = jobsList.length > 0

    return showJobsList ? (
      <ul className="list-none p-0">
        {jobsList.map(job => (
          <JobCard key={job.id} jobData={job} />
        ))}
      </ul>
    ) : (
      <div className="flex flex-col justify-center items-center py-8">
        <img src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png" alt="no jobs" className="w-64" />
        <h1 className="text-white text-2xl font-bold mt-4">No Jobs Found</h1>
        <p className="text-gray-400 text-sm mt-2">We could not find any jobs. Try other filters.</p>
      </div>
    )
  }

  renderJobsFailureView = () => (
    <div className="flex flex-col justify-center items-center py-8">
      <img src="https://assets.ccbp.in/frontend/react-js/failure-img.png" alt="failure view" className="w-64" />
      <h1 className="text-white text-2xl font-bold mt-4">Oops! Something Went Wrong</h1>
      <p className="text-gray-400 text-sm mt-2">We cannot seem to find the page you're looking for.</p>
      <button
        type="button"
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-blue-700"
        onClick={this.getJobs}
      >
        Retry
      </button>
    </div>
  )

  renderJobs = () => {
    const {jobsApiStatus} = this.state
    switch (jobsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderJobsLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsSuccessView()
      case apiStatusConstants.failure:
        return this.renderJobsFailureView()
      default:
        return null
    }
  }

  renderFilters = () => {
    // This was already corrected in a previous conversation, so it's good to go
    const {minimumPackage} = this.state
    return (
      <div className="flex flex-col w-full md:w-80 p-4">
        {this.renderProfile()}
        <hr className="border-gray-700 my-4" />
        <h2 className="text-white text-lg font-bold mb-4">Type of Employment</h2>
        <ul className="list-none p-0">
          {employmentTypesList.map(type => (
            <li key={type.employmentTypeId} className="mb-2">
              <input
                type="checkbox"
                id={type.employmentTypeId}
                value={type.employmentTypeId}
                checked={this.state.employmentType.includes(
                  type.employmentTypeId,
                )}
                onChange={this.onSelectEmploymentType}
                className="mr-2"
              />
              <label htmlFor={type.employmentTypeId} className="text-gray-300">
                {type.label}
              </label>
            </li>
          ))}
        </ul>
        <hr className="border-gray-700 my-4" />
        <h2 className="text-white text-lg font-bold mb-4">Salary Range</h2>
        <ul className="list-none p-0">
          {salaryRangesList.map(range => (
            <li key={range.salaryRangeId} className="mb-2">
              <input
                type="radio"
                id={range.salaryRangeId}
                name="salaryRange"
                value={range.salaryRangeId}
                checked={minimumPackage === range.salaryRangeId}
                onChange={this.onSelectSalaryRange}
                className="mr-2"
              />
              <label htmlFor={range.salaryRangeId} className="text-gray-300">
                {range.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="bg-gray-900 min-h-screen pt-20">
        <Header />
        <div className="flex flex-col md:flex-row max-w-screen-xl mx-auto px-4 py-8">
          {this.renderFilters()}
          <div className="flex flex-col w-full md:ml-8">
            <div className="flex items-center bg-gray-800 rounded-lg p-2 mb-6">
              <input
                type="search"
                className="bg-transparent text-white w-full focus:outline-none placeholder-gray-400"
                placeholder="Search"
                value={searchInput}
                onChange={this.onChangeSearchInput}
                onKeyDown={this.onEnterSearchInput}
              />
              <button
                type="button"
                className="bg-blue-600 text-white p-2 rounded ml-2"
                data-testid="searchButton"
                onClick={this.onSearchButtonClick}
              >
                <BsSearch />
              </button>
            </div>
            {this.renderJobs()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs