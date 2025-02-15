import axios from 'axios';
import React, { useState } from 'react'
import './DeleteJobComponent.css'
const DeleteJobComponent = () => {
    const [jobInfo, setjobInfo] = useState({
        jobTitle: '',
        jobID: '',
        companyName: '',
        location: '',
        jobPreference: '',
        jobSkills: ''
    })

    const inputHandler = (event) => {
        const { name, value } = event.target
        setjobInfo({ ...jobInfo, [name]: value });
    }

    const jobIdValidator = async (event) => {
        event.preventDefault()
        await axios.post('http://localhost:3500/api/v1/job/validate', { jobID: jobInfo.jobID })
            .then(response => {
                console.log(response.data)
                var data = response.data
                if (data) {
                    setjobInfo({
                        ...jobInfo,
                        jobTitle: data.jobTitle,
                        companyName: data.companyName,
                        location: data.location,
                        jobPreference: data.jobPreference,
                        jobSkills: data.jobSkills
                    });
                }
            })
            .catch(error => {
                alert(error.response.data.message);
            })
    }

    const deletejobs = async (event) => {
        event.preventDefault()
        await axios.delete(`http://localhost:3500/api/v1/job?jobID=${jobInfo.jobID}`)
            .then(response => {
                alert(response.data.message)
                window.location.href = '/'
            })
            .catch(error => alert(error.response.data.message))
    }

    const { jobTitle,
        jobID,
        companyName,
        location,
        jobPreference,
        jobSkills } = jobInfo;

    return (
        <form className='form-container' onSubmit={deletejobs}>
            <h2>Delete a job</h2>

            <div className='form-group'>
                <label>JOB ID</label>
                <input
                    type='text'
                    className='form-control'
                    placeholder='Enter the job ID'
                    value={jobID}
                    name="jobID"
                    onChange={inputHandler}
                    required
                />
            </div>
            <div>
                <button type="button" onClick={jobIdValidator}>Check</button>
            </div>
            <div className='form-group'>
                <label>Job Title</label>
                <input
                    type='text'
                    placeholder='Enter the job title'
                    value={jobTitle}
                    name="jobTitle"
                    onChange={inputHandler}
                    required
                />
            </div>

            <div className='form-group'>
                <label>Company Name</label>
                <input
                    type='text'
                    placeholder='Enter the companyName'
                    value={companyName}
                    name="companyName"
                    onChange={inputHandler}
                    required
                />
            </div>

            <div className='form-group'>
                <label>Location</label>
                <input
                    type='text'
                    placeholder='Enter the location'
                    value={location}
                    name="location"
                    onChange={inputHandler}
                    required
                />
            </div>

            <div className='form-group'>
                <label>Job preference</label>
                <select
                    className='drop-down'
                    type='text'
                    placeholder='Enter the job preference'
                    value={jobPreference}
                    name="jobPreference"
                    onChange={inputHandler}
                    required>
                    <option value="">--Select--</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Remote">Remote</option>
                </select>
            </div>

            <div className='form-group'>
                <label>Job Skills</label>
                <input
                    type='text'
                    placeholder='Enter the skills'
                    value={[jobSkills]}
                    name="jobSkills"
                    onChange={inputHandler}
                    required
                />
            </div>

            <div>
                <button type='submit'>Delete</button>
            </div>
        </form>
    );
}

export default DeleteJobComponent

