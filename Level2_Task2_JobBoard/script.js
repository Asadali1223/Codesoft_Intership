const jobs = [
    { title: "Frontend Developer", company: "Tech Solutions", location: "Remote", type: "Full-time", description: "Build UI using HTML, CSS & JS." },
    { title: "Web Dev Intern", company: "Startup Hub", location: "Bangalore", type: "Internship", description: "Assist in web development tasks." },
    { title: "Backend Developer", company: "CodeWorks", location: "Pune", type: "Full-time", description: "Work on APIs and backend logic." },
    { title: "UI/UX Designer", company: "Creative Labs", location: "Mumbai", type: "Full-time", description: "Design user-friendly interfaces." }
];

const jobList = document.getElementById("jobList");
const searchInput = document.getElementById("searchInput");
const jobTypeFilter = document.getElementById("jobTypeFilter");
const applicationsList = document.getElementById("applicationsList");

const jobModal = document.getElementById("jobModal");
const applyModal = document.getElementById("applyModal");

let selectedJobTitle = "";

/* DISPLAY JOBS */
function displayJobs(list) {
    jobList.innerHTML = "";
    list.forEach(job => {
        const card = document.createElement("div");
        card.className = "job-card fade-in";
        card.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company} • ${job.location} • ${job.type}</p>
        `;
        card.onclick = () => openModal(job);
        jobList.appendChild(card);
    });
}

/* FILTER JOBS */
function filterJobs() {
    const text = searchInput.value.toLowerCase();
    const type = jobTypeFilter.value;

    const filtered = jobs.filter(job =>
        job.title.toLowerCase().includes(text) &&
        (type === "all" || job.type === type)
    );
    displayJobs(filtered);
}

/* MODAL */
function openModal(job) {
    selectedJobTitle = job.title;
    document.getElementById("modalTitle").innerText = job.title;
    document.getElementById("modalCompany").innerText = "Company: " + job.company;
    document.getElementById("modalLocation").innerText = "Location: " + job.location;
    document.getElementById("modalType").innerText = "Type: " + job.type;
    document.getElementById("modalDescription").innerText = job.description;
    jobModal.style.display = "flex";
}

function closeModal() {
    jobModal.style.display = "none";
}

/* APPLY FORM */
function openApplyForm() {
    applyModal.style.display = "flex";
}

function closeApplyForm() {
    applyModal.style.display = "none";
    document.getElementById("applyForm").reset();
}

document.getElementById("applyForm").addEventListener("submit", e => {
    e.preventDefault();

    const name = document.getElementById("applicantName").value;
    const email = document.getElementById("applicantEmail").value;

    const applications = JSON.parse(localStorage.getItem("applications")) || [];
    applications.push({ name, email, job: selectedJobTitle });

    localStorage.setItem("applications", JSON.stringify(applications));
    displayApplications();
    closeApplyForm();
});

/* DISPLAY APPLICATIONS */
function displayApplications() {
    const apps = JSON.parse(localStorage.getItem("applications")) || [];
    applicationsList.innerHTML = "";

    if (apps.length === 0) {
        applicationsList.innerHTML = "<p>No applications submitted yet.</p>";
        return;
    }

    apps.forEach((app, index) => {
        const div = document.createElement("div");
        div.className = "application-card";
        div.innerHTML = `
            <p><strong>Name:</strong> ${app.name}</p>
            <p><strong>Email:</strong> ${app.email}</p>
            <p><strong>Job:</strong> ${app.job}</p>
            <button class="delete-btn" onclick="deleteApplication(${index})">Delete</button>
        `;
        applicationsList.appendChild(div);
    });
}

/* DELETE FUNCTIONS */
function deleteApplication(index) {
    const apps = JSON.parse(localStorage.getItem("applications")) || [];
    apps.splice(index, 1);
    localStorage.setItem("applications", JSON.stringify(apps));
    displayApplications();
}

function clearAllApplications() {
    if (confirm("Delete all applications?")) {
        localStorage.removeItem("applications");
        displayApplications();
    }
}

searchInput.addEventListener("input", filterJobs);
jobTypeFilter.addEventListener("change", filterJobs);

/* INIT */
displayJobs(jobs);
displayApplications();