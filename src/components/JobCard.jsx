import React from 'react'
import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {FaBriefcase} from 'react-icons/fa'

const JobCard = ({jobData}) => {
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobData

  return (
    <li className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 transition transform hover:scale-105">
      <Link to={`/jobs/${id}`} className="block">
        <div className="flex items-start mb-4">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="w-16 h-16 mr-4"
          />
          <div>
            <h2 className="text-white text-lg font-bold">{title}</h2>
            <div className="flex items-center text-yellow-500 text-sm">
              <FaStar className="mr-1" />
              <span>{rating}</span>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-gray-400">
            <MdLocationOn className="mr-1" />
            <span>{location}</span>
          </div>
          <div className="flex items-center text-gray-400">
            <FaBriefcase className="mr-1" />
            <span>{employmentType}</span>
          </div>
          <p className="text-white font-bold">{packagePerAnnum}</p>
        </div>
        <hr className="border-gray-700 my-4" />
        <div>
          <h3 className="text-white font-bold mb-2">Description</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {jobDescription}
          </p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard