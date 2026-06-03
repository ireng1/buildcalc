let tileCost = 0;
let paintCost = 0;
let concreteCost = 0;
let isPro = false;

// =====================
// TILE CALCULATOR
// =====================

function calculateTiles() {

    let roomLength = parseFloat(
        document.getElementById("roomLength").value
    );

    let roomWidth = parseFloat(
        document.getElementById("roomWidth").value
    );

    let tileLength = parseFloat(
        document.getElementById("tileLength").value
    );

    let tileWidth = parseFloat(
        document.getElementById("tileWidth").value
    );

    let tilesPerBox = parseFloat(
        document.getElementById("tilesPerBox").value
    );

    let boxPrice = parseFloat(
        document.getElementById("boxPrice").value
    );

    let waste = parseFloat(
        document.getElementById("wastePercent").value
    );

    if (
        isNaN(roomLength) ||
        isNaN(roomWidth) ||
        isNaN(tileLength) ||
        isNaN(tileWidth) ||
        isNaN(tilesPerBox)
    ) {
        alert("Please fill all tile fields");
        return;
    }

    let roomArea = roomLength * roomWidth;

    let tileArea =
        (tileLength / 100) *
        (tileWidth / 100);

    let tilesNeeded =
        Math.ceil(roomArea / tileArea);

    tilesNeeded =
        Math.ceil(
            tilesNeeded * (1 + waste / 100)
        );

    let boxesNeeded =
        Math.ceil(
            tilesNeeded / tilesPerBox
        );

    if (!isNaN(boxPrice)) {
        totalCost = boxesNeeded * boxPrice;
    }

    tileCost = totalCost;
    updateSummary();
    if (!isNaN(boxPrice)) {
        totalCost =
            boxesNeeded * boxPrice;
    }

    document.getElementById("tileResult").innerHTML = `
        < h3 > Tile Results</h3 >

        <p>Room Area: ${roomArea.toFixed(2)} m²</p>

        <p>Tiles Needed: ${tilesNeeded}</p>

        <p>Boxes Needed: ${boxesNeeded}</p>

        <p>Total Cost: ${totalCost.toFixed(2)}</p>

        `;
}



// =====================
// PAINT CALCULATOR
// =====================

function calculatePaint() {

    let length = parseFloat(
        document.getElementById("paintLength").value
    );

    let width = parseFloat(
        document.getElementById("paintWidth").value
    );

    let height = parseFloat(
        document.getElementById("paintHeight").value
    );

    let doors = parseFloat(
        document.getElementById("doors").value
    );

    let windows = parseFloat(
        document.getElementById("windows").value
    );

    let coverage = parseFloat(
        document.getElementById("paintCoverage").value
    );

    let paintPrice = parseFloat(
        document.getElementById("paintPrice").value
    );

    if (
        isNaN(length) ||
        isNaN(width) ||
        isNaN(height) ||
        isNaN(coverage)
    ) {
        alert("Please fill all paint fields");
        return;
    }

    if (isNaN(doors)) doors = 0;
    if (isNaN(windows)) windows = 0;
    if (isNaN(paintPrice)) paintPrice = 0;

    let wallArea =
        2 * (length + width) * height;

    let doorsArea =
        doors * 2;

    let windowsArea =
        windows * 1.5;

    let paintArea =
        wallArea - doorsArea - windowsArea;

    let litersNeeded =
        paintArea / coverage;

    let totalCost =
        litersNeeded * paintPrice;
    paintCost = totalCost;
    updateSummary();

    document.getElementById("paintResult").innerHTML = `
        <h3>Paint Results</h3>

        <p>Wall Area: ${paintArea.toFixed(2)} m²</p>

        <p>Paint Needed: ${litersNeeded.toFixed(2)} L</p>

        <p>Total Cost: ${totalCost.toFixed(2)}</p>
        `;
}


// =====================
// WIRE CALCULATOR
// =====================

function calculateWire() {

    let voltage = parseFloat(
        document.getElementById("voltage").value
    );

    let current = parseFloat(
        document.getElementById("current").value
    );

    let length = parseFloat(
        document.getElementById("cableLength").value
    );

    let material =
        document.getElementById("material").value;

    if (
        isNaN(voltage) ||
        isNaN(current) ||
        isNaN(length)
    ) {
        alert("Please fill all wire fields");
        return;
    }

    let power =
        voltage * current;

    let cableSize;
    if (current <= 10)
        cableSize = "1.5 mm²";
    else if (current <= 16)
        cableSize = "2.5 mm²";
    else if (current <= 25)
        cableSize = "4 mm²";
    else if (current <= 32)
        cableSize = "6 mm²";
    else
        cableSize = "10 mm² +";

    let factor =
        material === "copper"
            ? 0.018
            : 0.028;

    let voltageDrop =
        (
            2 *
            length *
            current *
            factor
        ).toFixed(2);

    document.getElementById("wireResult").innerHTML = `
        <h3>Wire Results</h3>

        <p>Power: ${power.toFixed(2)} W</p>

        <p>Recommended Cable: ${cableSize}</p>

        <p>Voltage Drop: ${voltageDrop} V</p>

        <p>Material: ${material}</p>
        `;
}
function updateSummary() {

    let projectName =
        document.getElementById("projectName").value || "Untitled";

    let total =
        tileCost +
        paintCost +
        concreteCost;

    document.getElementById("summary").innerHTML = `

        <h3>${projectName}</h3>

        <p>Tile Cost: ${tileCost.toFixed(2)}</p>

        <p>Paint Cost: ${paintCost.toFixed(2)}</p>

        <p>Concrete Cost: ${concreteCost.toFixed(2)}</p>

        <h2>Total Cost: ${total.toFixed(2)}</h2>

        `;
}
function saveProject() {

    let projects =
        JSON.parse(localStorage.getItem("projects")) || [];

    // FREE LIMIT CONTROL
    if (!isPro && projects.length >= 1) {
        alert("Free version allows only 1 project. Upgrade to Pro.");
        return;
    }

    let projectName =
        document.getElementById("projectName").value || "Untitled";

    let projectData = {

        name: projectName,
        tileCost: tileCost,
        paintCost: paintCost,
        concreteCost: concreteCost,
        date: new Date().toLocaleString()

    };

    projects.push(projectData);

    localStorage.setItem("projects", JSON.stringify(projects));

    alert("Project Saved ✔");
}
window.onload = function () {

    let savedProject =
        localStorage.getItem(
            "buildcalcProject"
        );

    if (savedProject) {

        let project =
            JSON.parse(savedProject);

        document.getElementById(
            "projectName"
        ).value =
            project.name;

        tileCost =
            project.tileCost;

        paintCost =
            project.paintCost;

        updateSummary();
    }

}
function calculateConcrete() {

    let length =
        parseFloat(
            document.getElementById(
                "concreteLength"
            ).value
        );

    let width =
        parseFloat(
            document.getElementById(
                "concreteWidth"
            ).value
        );

    let thickness =
        parseFloat(
            document.getElementById(
                "concreteThickness"
            ).value
        );

    if (
        isNaN(length) ||
        isNaN(width) ||
        isNaN(thickness)
    ) {
        alert(
            "Please fill all concrete fields"
        );
        return;
    }

    let volume =
        length *
        width *
        thickness;

    let cementBags =
        Math.ceil(volume * 7);

    let sand =
        (volume * 0.5).toFixed(2);

    let gravel =
        (volume * 0.8).toFixed(2);

    concreteCost =
        cementBags * 6;

    updateSummary();

    document.getElementById(
        "concreteResult"
    ).innerHTML = `

        <h3>Concrete Results</h3>

        <p>
        Volume:
        ${volume.toFixed(2)}
        m³
        </p>

        <p>
        Cement Bags:
        ${cementBags}
        </p>

        <p>
        Sand:
        ${sand}
        m³
        </p>

        <p>
        Gravel:
        ${gravel}
        m³
        </p>

        <p>
        Estimated Cost:
        ${concreteCost.toFixed(2)}
        $
        </p>

        `;
}
function downloadPDF() {

    const { jsPDF } = window.jspdf;

    let doc = new jsPDF();

    let projectName =
        document.getElementById("projectName").value || "Project";

    let total = `
        tileCost + paintCost + concreteCost;

    let text =
        Project Name: ${projectName}

    ----------------------

        Tile Cost: ${tileCost.toFixed(2)}

Paint Cost: ${paintCost.toFixed(2)}

Concrete Cost: ${concreteCost.toFixed(2)}

    ----------------------

        TOTAL COST: ${total.toFixed(2)}
    `;

    doc.setFontSize(12);
    doc.text(text, 10, 10);

    doc.save(projectName + "_report.pdf");
}
function calculateSolar() {

    let dailyLoad =
        parseFloat(document.getElementById("dailyLoad").value);

    let sunHours =
        parseFloat(document.getElementById("sunHours").value);

    let panelPower =
        parseFloat(document.getElementById("panelPower").value);

    if (
        isNaN(dailyLoad) ||
        isNaN(sunHours) ||
        isNaN(panelPower)
    ) {
        alert("Please fill solar fields");
        return;
    }

    let requiredPower =
        dailyLoad / sunHours;

    let panelsNeeded =
        Math.ceil(requiredPower / panelPower);

    document.getElementById("solarResult").innerHTML = `

        <h3>Solar Results</h3>

        <p>Required Power: ${requiredPower.toFixed(2)} W</p>

        <p>Panels Needed: ${panelsNeeded}</p>

        `;
}
function calculateSteel() {

    let length =
        parseFloat(document.getElementById("slabLength").value);

    let width =
        parseFloat(document.getElementById("slabWidth").value);

    let spacing =
        parseFloat(document.getElementById("spacing").value);

    let barLength =
        parseFloat(document.getElementById("barLength").value);

    if (
        isNaN(length) ||
        isNaN(width) ||
        isNaN(spacing) ||
        isNaN(barLength)
    ) {
        alert("Please fill all steel fields");
        return;
    }

    // تحويل التباعد من cm إلى m
    let spacingM = spacing / 100;

    // عدد القضبان الطولية
    let barsLengthwise =
        Math.ceil(width / spacingM);

    // عدد القضبان العرضية
    let barsWidthwise =
        Math.ceil(length / spacingM);

    // الطول الكلي للحديد
    let totalSteelLength =
        (barsLengthwise * length) +
        (barsWidthwise * width);

    // عدد القضبان (تقريباً)
    let totalBars =
        Math.ceil(totalSteelLength / barLength);

    document.getElementById("steelResult").innerHTML = `

        <h3>Steel Results</h3>

        <p>Bars Lengthwise: ${barsLengthwise}</p>

        <p>Bars Widthwise: ${barsWidthwise}</p>

        <p>Total Steel Length: ${totalSteelLength.toFixed(2)} m</p>

        <p>Estimated Bars Needed: ${totalBars}</p>

        `;
}
function upgradeToPro() {

    isPro = true;

    alert("🎉 You are now PRO user!");

    document.querySelector(".pro-btn").style.display = "none";
}

function downloadPDF() {

    if (!isPro) {
        alert("PDF is PRO feature");
        return;
    }

    // باقي كود PDF
}