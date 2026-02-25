function filterJobs() {
  let searchInput = document.getElementById("searchInput").value.toLowerCase();
  let locationInput = document.getElementById("locationInput").value.toLowerCase();
  let salaryInput = document.getElementById("salaryInput").value.toLowerCase();

  let jobCards = document.getElementsByClassName("job-card");
  for (let i = 0; i < jobCards.length; i++) {
    let card = jobCards[i];
    let title = card.querySelector("h3").innerText.toLowerCase();
    let company = card.querySelector("p").innerText.toLowerCase();
    let salary = card.querySelectorAll("p")[1].innerText.toLowerCase();

    if (
      title.includes(searchInput) &&
      company.includes(locationInput) &&
      salary.includes(salaryInput)
    ) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  }
}

async function loadJobs() {
  try {
    const response = await fetch("https://employee-icr5.onrender.com/api/jobs");
    const jobs = await response.json();
    let container = document.getElementById("jobContainer");
    container.innerHTML = "";

    jobs.forEach(job => {
      let card = document.createElement("div");
      card.className = "col-md-4";
      card.innerHTML = `
        <div class="job-card p-3 mb-3 border rounded shadow-sm">
          <h3 class="text-danger">${job.title}</h3>
          <p>${job.company} - ${job.location}</p>
          <p>Salary: ${job.salary}</p>
          <p>${job.description.substring(0, 100)}...</p>
          <a href="https://employee-icr5.onrender.com/job/${job._id}" class="btn btn-outline-danger">View Details</a>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading jobs:", error);
    document.getElementById("jobContainer").innerHTML =
      "<p class='text-danger'>⚠️ Unable to load jobs. Please try again later.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("jobContainer")) {
    loadJobs();
  }
});
