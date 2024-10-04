import 'bootstrap/dist/css/bootstrap.min.css';
import { searchJobs, viewJobDetails } from './api/jobs.js'; 


document.getElementById('search-jobs-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const searchQuery = document.getElementById('query-input').value;
    console.log(searchQuery)

    searchJobs(searchQuery);
});


function displayJobs(jobs) {
    const jobsContainer = document.getElementById('searched-jobs');
    jobsContainer.innerHTML = '';  
    if (jobs.length === 0) {
        jobsContainer.innerHTML = `<div class="text-dark">No Results Found</div>`;
        return;
    }

    jobs.forEach(job => {
        const jobElement = document.createElement('li');
        jobElement.classList.add('job-card', 'card', 'my-1');
        jobElement.style.width = '18rem';

        jobElement.innerHTML = `
            <div class="card-header">${job.company}</div>
            <div class="card-body">
                <h5 class="card-title">${job.title}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">${job.location}</h6>
                <h6 class="card-subtitle mb-2 text-body-secondary">Posted ${formatJobDate(job.date_posted)}</h6>
                <button class="btn btn-primary view-job-button" job-data-id="${job.id}">View Job</button>
            </div>
        `;

        jobsContainer.appendChild(jobElement);

        jobElement.querySelector('.view-job-button').addEventListener('click', function() {
            const jobId = job.id;
            viewJobDetails(jobId);
        });
        

    });
}

function formatJobDate(postedDate) {
    const date = new Date(postedDate);
    return date.toLocaleDateString('en-US', {
        month: 'numeric', 
        day: 'numeric',
        year: 'numeric'
    });
}


window.onload = function() {
    fetchAllJobs();
};

async function fetchAllJobs() {
    try {
        const response = await fetch('http://localhost:3000/jobs'); 
        if (!response.ok) {
            throw new Error(`An error occurred: ${response.statusText}`);
        }

        const jobs = await response.json();
        displayJobs(jobs);
    } catch (error) {
        console.error("Failed to fetch jobs:", error);
    }
}


export { displayJobs };