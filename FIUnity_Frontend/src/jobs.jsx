import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './jobs.css';

const dummyJobs = [
    {
        jobPosition: 'Software Engineer',
        jobId: '12345',
        companyName: 'ABC Inc.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat odio vel risus posuere, at blandit magna bibendum. Integer eget malesuada turpis. ',
        salary: '$80,000 - $100,000',
        type: 'Full-Time',
        mode: 'Remote',
        startDate: '2024-06-01',
        endDate: '2024-12-31',
        otherRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat odio vel risus posuere, at blandit magna bibendum.',
        usWorkAuthorization: true,
        usCitizenship: false,
        usResidency: true,
        applicationLink: 'https://www.google.com'
    },
    {
        jobPosition: 'Data Analyst',
        jobId: '67890',
        companyName: 'XYZ Corp.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat odio vel risus posuere, at blandit magna bibendum. Integer eget malesuada turpis. ',
        salary: '$60,000 - $80,000',
        type: 'Part-Time',
        mode: 'In-Person',
        startDate: '2024-07-01',
        endDate: '',
        otherRequirements: '',
        usWorkAuthorization: true,
        usCitizenship: false,
        usResidency: true,
        applicationLink: 'https://example.com/job/67890'
    },
    {
        jobPosition: 'Frontend Developer',
        jobId: '54321',
        companyName: 'DEF Ltd.',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat odio vel risus posuere, at blandit magna bibendum. Integer eget malesuada turpis. ',
        salary: '$70,000 - $90,000',
        type: 'Full-Time',
        mode: 'Hybrid',
        startDate: '2024-08-01',
        endDate: '2025-02-28',
        otherRequirements: '',
        usWorkAuthorization: true,
        usCitizenship: false,
        usResidency: true,
        applicationLink: 'https://www.example.com'
    },
    {
        jobPosition: 'Product Manager',
        jobId: '98765',
        companyName: 'GHI Enterprises',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat odio vel risus posuere, at blandit magna bibendum. Integer eget malesuada turpis. ',
        salary: '$90,000 - $110,000',
        type: 'Full-Time',
        mode: 'Remote',
        startDate: '2024-09-01',
        endDate: '',
        otherRequirements: '',
        usWorkAuthorization: true,
        usCitizenship: false,
        usResidency: true,
        applicationLink: 'https://www.example.com/job/98765'
    },
    {
        jobPosition: 'UX/UI Designer',
        jobId: '13579',
        companyName: 'JKL Solutions',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat odio vel risus posuere, at blandit magna bibendum. Integer eget malesuada turpis. ',
        salary: '$75,000 - $95,000',
        type: 'Full-Time',
        mode: 'In-Person',
        startDate: '2024-10-01',
        endDate: '2025-04-30',
        otherRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat odio vel risus posuere, at blandit magna bibendum.',
        usWorkAuthorization: true,
        usCitizenship: false,
        usResidency: true,
        applicationLink: 'https://www.example.com/job/13579'
    },
    {
        jobPosition: 'Marketing Manager',
        jobId: '24680',
        companyName: 'MNO Marketing',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat odio vel risus posuere, at blandit magna bibendum. Integer eget malesuada turpis. ',
        salary: '$85,000 - $105,000',
        type: 'Full-Time',
        mode: 'Remote',
        startDate: '2024-11-01',
        endDate: '',
        otherRequirements: '',
        usWorkAuthorization: true,
        usCitizenship: false,
        usResidency: true,
        applicationLink: 'https://www.example.com/job/24680'
    },
    {
        jobPosition: 'HR Coordinator',
        jobId: '36912',
        companyName: 'PQR HR Solutions',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat odio vel risus posuere, at blandit magna bibendum. Integer eget malesuada turpis. ',
        salary: '$55,000 - $75,000',
        type: 'Part-Time',
        mode: 'In-Person',
        startDate: '2024-12-01',
        endDate: '',
        otherRequirements: '',
        usWorkAuthorization: true,
        usCitizenship: false,
        usResidency: true,
        applicationLink: 'https://www.example.com/job/36912'
    },
    {
        jobPosition: 'Financial Analyst',
        jobId: '11111',
        companyName: 'RST Finance',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat odio vel risus posuere, at blandit magna bibendum. Integer eget malesuada turpis. ',
        salary: '$70,000 - $90,000',
        type: 'Full-Time',
        mode: 'Remote',
        startDate: '2025-01-01',
        endDate: '2025-07-31',
        otherRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat odio vel risus posuere, at blandit magna bibendum.',
        usWorkAuthorization: true,
        usCitizenship: false,
        usResidency: true,
        applicationLink: 'https://www.example.com/job/11111'
    },
    {
        jobPosition: 'Customer Support Specialist',
        jobId: '22222',
        companyName: 'UVW Services',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat odio vel risus posuere, at blandit magna bibendum. Integer eget malesuada turpis. ',
        salary: '$45,000 - $65,000',
        type: 'Full-Time',
        mode: 'Hybrid',
        startDate: '2025-02-01',
        endDate: '',
        otherRequirements: '',
        usWorkAuthorization: true,
        usCitizenship: false,
        usResidency: true,
        applicationLink: 'https://www.example.com/job/22222'
    },
    {
        jobPosition: 'Graphic Designer',
        jobId: '33333',
        companyName: 'WXY Designs',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat odio vel risus posuere, at blandit magna bibendum. Integer eget malesuada turpis. ',
        salary: '$60,000 - $80,000',
        type: 'Full-Time',
        mode: 'Remote',
        startDate: '2025-03-01',
        endDate: '2025-09-30',
        otherRequirements: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed feugiat odio vel risus posuere, at blandit magna bibendum.',
        usWorkAuthorization: true,
        usCitizenship: false,
        usResidency: true,
        applicationLink: 'https://www.example.com/job/33333'
    }
];


const JobsList = () => {
    const [jobs, setJobs] = useState(dummyJobs);
    const [selectedJob, setSelectedJob] = useState(null);

    const handleJobClick = (jobPosition) => {
        // Find the selected job from the dummy data
        const selected = dummyJobs.find(job => job.jobPosition === jobPosition);
        setSelectedJob(selected);
    };

    //const [jobs, setJobs] = useState([]);
    //const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        // Fetch job posting data from your backend
        axios.get('http://10.108.229.73:8000/job-posting/')
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error('Error fetching jobs:', error);
            });
    }, []);

    /*
    const handleJobClick = (jobPosition) => {
        // Fetch job posting details for the selected job
        axios.get(`http://10.108.229.73:8000/job-posting/${jobPosition}`)
            .then(response => {
                setSelectedJob(response.data);
            })
            .catch(error => {
                console.error('Error fetching job details:', error);
            });
    };
    */

    return (
        <>
            <div className="job-list-container">
                <a href="http://10.108.229.73:8000/job-posting/" >
                    <button className="post-job-button">
                        Post a Job
                    </button>
                </a>
                <div className="job-list">
                    <h2>Job Postings</h2>
                    <ul>
                        {jobs.map(job => (
                            <li key={job.jobPosition} onClick={() => handleJobClick(job.jobPosition)}>
                                {job.jobPosition} - {job.companyName}
                            </li>
                        ))}
                    </ul>
                </div>
                {selectedJob && (
                    <div className="job-details">
                        <div>
                            <h3>{selectedJob.jobPosition}</h3>
                            {selectedJob.jobId && (
                                <p>Job ID: {selectedJob.jobId}</p>
                            )}
                            <p>{selectedJob.companyName}</p>
                            {selectedJob.description && (
                                <div>
                                    <h4>Description</h4>
                                    <p>{selectedJob.description}</p>
                                </div>
                            )}

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="4" y="8" width="24" height="16" rx="2" stroke="#0C3D72" strokeWidth="2" />
                                    <path d="M8 12H10.6667" stroke="#0C3D72" strokeWidth="2" strokeLinecap="round" />
                                    <path d="M21.333 20H23.9997" stroke="#0C3D72" strokeWidth="2" strokeLinecap="round" />
                                    <circle cx="16" cy="16" r="3" stroke="#0C3D72" strokeWidth="2" />
                                </svg>
                                <p>{selectedJob.salary}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_52_145)">
                                        <path d="M13.9641 22.1786H0.821289V6.57141L7.39272 0.821411L13.9641 6.57141V22.1786Z" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M13.9639 22.1785H22.1782V10.6785H13.9639" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7.39258 22.1785V18.8928" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M4.92871 13.9643H9.85728" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M4.92871 9.03571H9.85728" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_52_145">
                                            <rect width="23" height="23" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>{selectedJob.type}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_52_140)">
                                        <path d="M18.8931 8.21427C18.8931 13.1428 11.5003 18.8928 11.5003 18.8928C11.5003 18.8928 4.10742 13.1428 4.10742 8.21427C4.10742 4.18763 7.47364 0.821411 11.5003 0.821411C15.5269 0.821411 18.8931 4.18763 18.8931 8.21427Z" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M11.4994 10.6786C12.8604 10.6786 13.9637 9.57528 13.9637 8.21429C13.9637 6.85329 12.8604 5.75 11.4994 5.75C10.1384 5.75 9.03516 6.85329 9.03516 8.21429C9.03516 9.57528 10.1384 10.6786 11.4994 10.6786Z" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M18.1983 16.4285H19.7141L22.1784 22.1785H0.821289L3.28557 16.4285H4.80144" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_52_140">
                                            <rect width="23" height="23" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <p>{selectedJob.mode}</p>
                            </div>


                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="3" y="6" width="18" height="15" rx="2" stroke="#0C3D72" stroke-width="2" />
                                    <path d="M4 11H20" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" />
                                    <path d="M9 16H15" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" />
                                    <path d="M8 3L8 7" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" />
                                    <path d="M16 3L16 7" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" />
                                </svg>

                                <p>Start Date: {selectedJob.startDate}</p>
                                {selectedJob.endDate && (
                                    <p style={{ marginLeft: '1rem' }}>End Date: {selectedJob.endDate}</p>
                                )}
                            </div>

                            {selectedJob.otherRequirements && (
                                <div>
                                    <h4>Other Requirements</h4>
                                    <p>{selectedJob.otherRequirements}</p>
                                </div>
                            )}

                            <div>
                                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0px' }}>
                                    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="6.45801" y="5.16669" width="18.0833" height="21.9583" rx="2" stroke="#0C3D72" stroke-width="2" />
                                        <path d="M11.625 11.625H19.375" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" />
                                        <path d="M11.625 16.7917H19.375" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" />
                                        <path d="M11.625 21.9583H16.7917" stroke="#0C3D72" stroke-width="2" stroke-linecap="round" />
                                    </svg>
                                    <p>US Work Authorization Required: {selectedJob.usWorkAuthorization ? 'Yes' : 'No'}</p>

                                </div>
                
                                <p style={{ marginLeft: '2.2rem', marginTop: '0' }}>US Citizenship Required: {selectedJob.usCitizenship ? 'Yes' : 'No'}</p>
                                <p style={{ marginLeft: '2.2rem', marginTop: '0' }}>US Residency Required: {selectedJob.usResidency ? 'Yes' : 'No'}</p>

                            </div>

                            <p>
                                <a href={selectedJob.applicationLink}>
                                    <button>
                                        Apply
                                    </button>
                                </a>
                            </p>
                            <p>Posted: {new Date(selectedJob.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );

};

export default JobsList;






