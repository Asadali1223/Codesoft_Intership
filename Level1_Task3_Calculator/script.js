let display = document.getElementById("display");
let currentOperator = null;

/* ================= DISPLAY ANIMATION ================= */
function animateDisplay() {
    display.style.animation = "none";
    display.offsetHeight; // reflow
    display.style.animation = "pop 0.15s ease-in-out";
}

/* ================= BASIC INPUT ================= */
function appendNumber(num) {
    if (display.innerText === "0") {
        display.innerText = num;
    } else {
        display.innerText += num;
    }
    animateDisplay();
}

function clearDisplay() {
    display.innerText = "0";
    currentOperator = null;
    removeActive();
    animateDisplay();
}

/* ================= OPERATORS ================= */
function setOperator(op) {
    removeActive();

    // Prevent double operators
    let lastChar = display.innerText.slice(-1);
    if (["+", "-", "*", "/"].includes(lastChar)) {
        display.innerText = display.innerText.slice(0, -1);
    }

    display.innerText += op;
    currentOperator = op;
    event.target.classList.add("active");
    animateDisplay();
}

function removeActive() {
    document.querySelectorAll(".operator").forEach(btn => {
        btn.classList.remove("active");
    });
}

/* ================= CALCULATIONS ================= */
function calculate() {
    try {
        let result = eval(display.innerText);
        display.innerText = result;
        removeActive();
        animateDisplay();
    } catch {
        display.innerText = "Error";
    }
}

function percentage() {
    try {
        display.innerText = eval(display.innerText) / 100;
        animateDisplay();
    } catch {
        display.innerText = "Error";
    }
}

function toggleSign() {
    try {
        display.innerText = eval(display.innerText) * -1;
        animateDisplay();
    } catch {
        display.innerText = "Error";
    }
}

/* ================= SCIENTIFIC FUNCTIONS ================= */
function scientific(func) {
    try {
        let value = eval(display.innerText);

        if (func === "Math.pow") {
            display.innerText = Math.pow(value, 2);
        } else {
            display.innerText = eval(func + "(" + value + ")");
        }

        animateDisplay();
    } catch {
        display.innerText = "Error";
    }
}

/* ================= SWIPE TO DELETE (MOBILE) ================= */
let startX = 0;

display.addEventListener("touchstart", e => {
    startX = e.touches[0].clientX;
});

display.addEventListener("touchend", e => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
        display.innerText = display.innerText.slice(0, -1) || "0";
        animateDisplay();
    }
});