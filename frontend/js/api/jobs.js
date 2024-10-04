
import {  displayJobs } from '../index.js';

async function searchJobs(searchQuery) {
    try {
        const response = await fetch(`http://localhost:3000/jobs?q=${encodeURIComponent(searchQuery)}`);

        if (!response.ok) {
            throw new Error(`An error occurred: ${response.statusText}`);
        }

        const jobs = await response.json();

        displayJobs(jobs);
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
    }
}

async function viewJobDetails(jobId) {
    try {
        const response = await fetch(`http://localhost:3000/jobs/${jobId}`); 

        if (!response.ok) {
            throw new Error(`An error occurred: ${response.statusText}`);
        }

        const jobDetails = await response.json();
        displayJobDetails(jobDetails); 
    } catch (error) {
        console.error("Failed to fetch job details:", error);
    }
}

function displayJobDetails(job) {
    const jobDetailsCard = document.getElementById('job-details-card');
    jobDetailsCard.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h3 class="card-title">${job.title}</h3>
                <h4 class="card-subtitle mb-2 text-body-secondary pb-3">${job.company}</h4>
                <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
                <h6 class="card-subtitle mb-2 text-body-secondary pb-3">Posted ${formatJobDate(job.date_posted)}</h6>
                <h5 class="card-subtitle mb-2">Description</h5>
                <p class="card-text">${job.description}</p>
                <h5 class="card-subtitle mb-2">Qualifications</h5>
                <p class="card-text">${job.qualifications}</p>
                <button class="btn btn-success save-job">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark" viewBox="0 0 16 16">
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z" />
                    </svg>
                    Save Job
                </button>
            </div>
        </div>
    `;

}


function formatJobDate(postedDate) {
    const date = new Date(postedDate);
    return date.toLocaleDateString('en-US', {
        month: 'numeric', 
        day: 'numeric',
        year: 'numeric'
    });
}

export { searchJobs, viewJobDetails };
