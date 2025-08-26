import React, {Component} from 'react'
import {useParams} from 'react-router-dom'
import Cookies from 'js-cookie'
import {ClipLoader} from 'react-spinners'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {FaBriefcase} from 'react-icons/fa'

import Header from './Header'
import SimilarJobItem from './SimilarJobItem'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    
    // Access the params from props, passed down from the wrapper
    const {params} = this.props
    const {id} = params
    
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const jobDetails = fetchedData.job_details
      const similarJobs = fetchedData.similar_jobs

      const updatedJobDetails = {
        companyLogoUrl: jobDetails.company_logo_url,
        companyWebsiteUrl: jobDetails.company_website_url,
        employmentType: jobDetails.employment_type,
        id: jobDetails.id,
        jobDescription: jobDetails.job_description,
        lifeAtCompany: {
          description: jobDetails.life_at_company.description,
          imageUrl: jobDetails.life_at_company.image_url,
        },
        location: jobDetails.location,
        packagePerAnnum: jobDetails.package_per_annum,
        rating: jobDetails.rating,
        skills: jobDetails.skills.map(skill => ({
          imageUrl: skill.image_url,
          name: skill.name,
        })),
        title: jobDetails.title,
      }

      const updatedSimilarJobs = similarJobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        rating: job.rating,
        title: job.title,
      }))

      this.setState({
        jobDetails: updatedJobDetails,
        similarJobs: updatedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetailsSuccessView = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails

    return (
      <>
        <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
          <div className="flex items-start mb-4">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="w-16 h-16 mr-4"
            />
            <div>
              <h1 className="text-white text-xl font-bold">{title}</h1>
              <div className="flex items-center text-yellow-500 text-sm">
                <FaStar className="mr-1" />
                <span>{rating}</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4 text-gray-400">
              <div className="flex items-center">
                <MdLocationOn className="mr-1" />
                <span>{location}</span>
              </div>
              <div className="flex items-center">
                <FaBriefcase className="mr-1" />
                <span>{employmentType}</span>
              </div>
            </div>
            <p className="text-white font-bold">{packagePerAnnum}</p>
          </div>
          <hr className="border-gray-700 my-4" />
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white font-bold">Description</h2>
            <a
              href={companyWebsiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 flex items-center"
            >
              Visit
              <FaExternalLinkAlt className="ml-2" />
            </a>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">{jobDescription}</p>

          <h2 className="text-white font-bold mb-4">Skills</h2>
          <ul className="flex flex-wrap list-none p-0">
            {skills.map(skill => (
              <li key={skill.name} className="flex items-center m-2">
                <img src={skill.imageUrl} alt={skill.name} className="w-10 h-10 mr-2" />
                <span className="text-gray-300">{skill.name}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-white font-bold mt-6 mb-4">Life at Company</h2>
          <div className="flex flex-col md:flex-row md:space-x-6">
            <p className="text-gray-400 text-sm leading-relaxed mb-4 md:mb-0">{lifeAtCompany.description}</p>
            <img src={lifeAtCompany.imageUrl} alt="life at company" className="rounded-lg w-full md:w-1/2" />
          </div>
        </div>

        <div className="mt-8">
          <h1 className="text-white text-2xl font-bold mb-4">Similar Jobs</h1>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
            {similarJobs.map(job => (
              <SimilarJobItem key={job.id} jobData={job} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobDetailsFailureView = () => (
    <div className="flex flex-col justify-center items-center py-8">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="w-64"
      />
      <h1 className="text-white text-2xl font-bold mt-4">Oops! Something Went Wrong</h1>
      <p className="text-gray-400 text-sm mt-2">We cannot seem to find the page you're looking for.</p>
      <button
        type="button"
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded mt-4 hover:bg-blue-700"
        onClick={this.getJobDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="flex justify-center items-center py-8">
      <div data-testid="loader">
        <ClipLoader color="#ffffff" size={50} />
      </div>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    let content
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        content = this.renderLoadingView()
        break
      case apiStatusConstants.success:
        content = this.renderJobDetailsSuccessView()
        break
      case apiStatusConstants.failure:
        content = this.renderJobDetailsFailureView()
        break
      default:
        content = null
    }

    return (
      <div className="bg-gray-900 min-h-screen pt-20">
        <Header />
        <div className="max-w-screen-xl mx-auto px-4 py-8">
          {content}
        </div>
      </div>
    )
  }
}

// Create a functional component wrapper to pass the URL params
const JobDetailsWithRouter = (props) => {
  const params = useParams();
  return <JobDetails {...props} params={params} />;
};

export default JobDetailsWithRouter