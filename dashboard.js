let projects =
    JSON.parse(
        localStorage.getItem("projects")
    ) || [];

let totalProjects =
    projects.length;

let totalCost = 0;

let averageCost = 0;

let highestCost = 0;
let highestProject = "None";

projects.forEach(project => {

    let projectCost =

        (project.tileCost || 0) +
        (project.paintCost || 0) +
        (project.concreteCost || 0);

    totalCost += projectCost;

    if (projectCost > highestCost) {

        highestCost = projectCost;

        highestProject = project.name;

    }

});
if (totalProjects > 0) {

    averageCost =
        totalCost /
        totalProjects;

}

let lastProject =
    totalProjects > 0
        ? projects[projects.length - 1].name
        : "No Projects";

let recentProjects = "";

projects.slice(-5).reverse().forEach(project => {

    recentProjects += `
        <li>${project.name}</li>
        `;

});

document.getElementById("stats").innerHTML = `

    <div class="dashboard-grid">

        <div class="stat-card">
            <h3>📁 Projects</h3>
            <p>${totalProjects}</p>
        </div>

        <div class="stat-card">
            <h3>💰 Total Cost</h3>
            <p>${totalCost.toFixed(2)}</p>
        </div>

        <div class="stat-card">
            <h3>📋 Last Project</h3>
            <p>${lastProject}</p>
        </div>

        <div class="stat-card">

    <h3>📈 Average Cost</h3>

    <p>
        ${averageCost.toFixed(2)}
    </p>

</div>

<div class="stat-card">

    <h3>🏆 Highest Project</h3>

    <p>${highestProject}</p>

</div>

    </div>

    <h2>Recent Projects</h2>

    <ul>
        ${recentProjects}
    </ul>

    `;

function deleteAllProjects() {

    if (
        confirm(
            "Delete all projects?"
        )
    ) {

        localStorage.removeItem(
            "projects"
        );

        location.reload();

    }

}