import React from 'react'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {FaBriefcase} from 'react-icons/fa'

const SimilarJobItem = ({jobData}) => {
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = jobData

  return (
    <li className="bg-gray-800 p-6 rounded-lg shadow-md transition transform hover:scale-105">
      <div className="flex items-start mb-4">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h3 className="text-white font-bold mb-2">Description</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{jobDescription}</p>
      <div className="flex items-center mt-4 text-gray-400 space-x-4">
        <div className="flex items-center">
          <MdLocationOn className="mr-1" />
          <span>{location}</span>
        </div>
        <div className="flex items-center">
          <FaBriefcase className="mr-1" />
          <span>{employmentType}</span>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem