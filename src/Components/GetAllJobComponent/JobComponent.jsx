import React from 'react'
import './GetAllJobComponent.css'

const JobComponent = ({job}) => {
  return (
    <div className='card'>
    <div className="text-container">
    <h2>{job.jobTitle}</h2>
    <p className='status'> {job.jobID}</p>
    <p className='status'> {job.companyName}</p>
    <p className='author'>{job.location}</p>
    <p className="availability">{job.jobPreference}</p>
    <p className='author'>Skills: {job.jobSkills.map(skill =>(skill)).join(', ')}</p>
    </div>
  </div>
  )
}

export default JobComponent
