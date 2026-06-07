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

    let currency =
        document.getElementById("currency").value;

    let projectName =
        document.getElementById("projectName").value || "Untitled";

    let total =
        tileCost +
        paintCost +
        concreteCost;

    document.getElementById("summary").innerHTML = `

        <h3>${projectName}</h3>

        <p>Tile Cost: ${tileCost.toFixed(2)} ${currency}</p>

        <p>Paint Cost: ${paintCost.toFixed(2)} ${currency}</p>

        <p>Concrete Cost: ${concreteCost.toFixed(2)} ${currency}</p>

        <h2>Total Cost: ${total.toFixed(2)} ${currency}</h2>

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
document.addEventListener("DOMContentLoaded", () => {

    const inputs = document.querySelectorAll("input");

    inputs.forEach((input, index) => {

        input.addEventListener("keydown", function (e) {

            // ENTER
            if (e.key === "Enter") {

                e.preventDefault();

                const nextInput = inputs[index + 1];

                if (nextInput) {
                    nextInput.focus();
                }
            }

            // ARROW DOWN
            if (e.key === "ArrowDown") {

                e.preventDefault();

                const nextInput = inputs[index + 1];

                if (nextInput) {
                    nextInput.focus();
                }
            }

            // ARROW UP
            if (e.key === "ArrowUp") {

                e.preventDefault();

                const prevInput = inputs[index - 1];

                if (prevInput) {
                    prevInput.focus();
                }
            }

        });

    });

});
document.querySelectorAll(".calculator-card").forEach(card => {

    const inputs = card.querySelectorAll("input");

    const button = card.querySelector("button");

    inputs.forEach((input, index) => {

        input.addEventListener("keydown", function (e) {

            if (e.key === "Enter") {

                e.preventDefault();

                if (index === inputs.length - 1) {

                    if (button) {
                        button.click();
                    }

                }

            }

        });

    });

});
// =====================
// AUTO SAVE
// =====================

document.addEventListener("DOMContentLoaded", () => {

    const inputs = document.querySelectorAll("input, select");

    // تحميل البيانات المحفوظة
    inputs.forEach(input => {

        const savedValue = localStorage.getItem(input.id);

        if (savedValue !== null) {
            input.value = savedValue;
        }

    });

    // حفظ تلقائي عند التغيير
    inputs.forEach(input => {

        input.addEventListener("input", () => {

            localStorage.setItem(
                input.id,
                input.value
            );

        });

    });

});
function clearAllData() {

    if (confirm("Delete all saved data?")) {

        localStorage.clear();

        location.reload();

    }

}
const currencySelect =
    document.getElementById("currency");

if (currencySelect) {

    currencySelect.addEventListener(
        "change",
        updateSummary
    );

}
function calculateBattery() {

    let load =
        parseFloat(
            document.getElementById(
                "batteryLoad"
            ).value
        );

    let voltage =
        parseFloat(
            document.getElementById(
                "batteryVoltage"
            ).value
        );

    let days =
        parseFloat(
            document.getElementById(
                "backupDays"
            ).value
        );

    if (
        isNaN(load) ||
        isNaN(voltage) ||
        isNaN(days)
    ) {
        alert("Please fill all battery fields");
        return;
    }

    let totalEnergy =
        load * days;

    let capacityAh =
        totalEnergy / voltage;

    let batteries =
        Math.ceil(capacityAh / 200);

    document.getElementById(
        "batteryResult"
    ).innerHTML = ` 

        <h3>Battery Results</h3>

        <p>
        Required Capacity:
        ${capacityAh.toFixed(2)} Ah
        </p>

        <p>
        Estimated Batteries:
        ${batteries}
        </p>

    `;
}
function calculateThreePhase() {

    let voltage =
        parseFloat(
            document.getElementById(
                "tpVoltage"
            ).value
        );

    let current =
        parseFloat(
            document.getElementById(
                "tpCurrent"
            ).value
        );

    let pf =
        parseFloat(
            document.getElementById(
                "tpPF"
            ).value
        );

    if (
        isNaN(voltage) ||
        isNaN(current) ||
        isNaN(pf)
    ) {
        alert(
            "Please fill all fields"
        );
        return;
    }

    let powerKW =
        (1.732 *
            voltage *
            current *
            pf) / 1000;

    document.getElementById(
        "threePhaseResult"
    ).innerHTML = `

        <h3>Three Phase Results</h3>

        <p>
        Voltage:
        ${voltage.toFixed(2)} V
        </p>

        <p>
        Current:
        ${current.toFixed(2)} A
        </p>

        <p>
        Power Factor:
        ${pf}
        </p>

        <p>
        Power:
        ${powerKW.toFixed(2)} kW
        </p>

    `;
}
function calculateMotor() {

    let power =
        parseFloat(
            document.getElementById(
                "motorPower"
            ).value
        );

    let voltage =
        parseFloat(
            document.getElementById(
                "motorVoltage"
            ).value
        );

    let pf =
        parseFloat(
            document.getElementById(
                "motorPF"
            ).value
        );

    let eff =
        parseFloat(
            document.getElementById(
                "motorEff"
            ).value
        );

    if (
        isNaN(power) ||
        isNaN(voltage) ||
        isNaN(pf) ||
        isNaN(eff)
    ) {
        alert(
            "Please fill all fields"
        );
        return;
    }

    let current =

        (power * 1000) /

        (
            1.732 *
            voltage *
            pf *
            (eff / 100)
        );

    document.getElementById(
        "motorResult"
    ).innerHTML = `

        <h3>Motor Results</h3>

        <p>
        Motor Current:
        ${current.toFixed(2)} A
        </p>

        `;
}
function copyTileResult() {

    let text =
        document.getElementById(
            "tileResult"
        ).innerText;

    navigator.clipboard.writeText(text);

    alert(
        "Result Copied ✔️"
    );

}
async function shareProject() {

    let text =
        document.getElementById(
            "summary"
        ).innerText;

    if (navigator.share) {

        await navigator.share({

            title: "BuildCalc",

            text: text

        });

    }

}
function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );

    let isLight =
        document.body.classList.contains(
            "light-mode"
        );

    localStorage.setItem(
        "theme",
        isLight ? "light" : "dark"
    );

}
window.addEventListener(
    "load",
    function () {

        let theme =
            localStorage.getItem(
                "theme"
            );

        if (theme === "light") {

            document.body.classList.add(
                "light-mode"
            );

        }

    }
);
function exportExcel() {

    let data = [

        {
            Project:
                document.getElementById(
                    "projectName"
                ).value,

            TileCost:
                tileCost,

            PaintCost:
                paintCost,

            ConcreteCost:
                concreteCost,

            Total:
                tileCost +
                paintCost +
                concreteCost
        }

    ];

    let worksheet =
        XLSX.utils.json_to_sheet(
            data
        );

    let workbook =
        XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "BuildCalc"
    );

    XLSX.writeFile(
        workbook,
        "BuildCalc_Report.xlsx"
    );

}
document
    .querySelectorAll("input")
    .forEach(input => {

        input.addEventListener(
            "input",
            function () {

                document
                    .querySelectorAll(
                        ".result-box"
                    )
                    .forEach(box => {

                        box.innerHTML =
                            "Press Calculate";

                    });

            }
        );

    });
function toggleMenu() {

    document
        .getElementById(
            "navLinks"
        )
        .classList.toggle(
            "show"
        );

}


let currentLanguage = "en";

function toggleLanguage() {

    if (currentLanguage === "en") {

        currentLanguage = "ar";

        document.body.dir = "rtl";

        document.documentElement.lang = "ar";

        document.getElementById(
            "langBtn"
        ).innerText =
            "🌐 English";

        document.title =
            "حاسبة البناء";
        localStorage.setItem(
            "language",
            "ar"
        );
        localStorage.setItem(
            "language",
            "en"
        );

    }

    else {

        currentLanguage = "en";

        document.body.dir = "ltr";

        document.documentElement.lang = "en";

        document.getElementById(
            "langBtn"
        ).innerText =
            "🌐 العربية";

        document.title =
            "BuildCalc";

        localStorage.setItem(
            "language",
            "ar"
        );
        localStorage.setItem(
            "language",
            "en"
        );

    }

}
window.addEventListener(
    "load",
    function () {

        let savedLanguage =
            localStorage.getItem(
                "language"
            );

        if (savedLanguage === "ar") {

            toggleLanguage();

        }

    }
);