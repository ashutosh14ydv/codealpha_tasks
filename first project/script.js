const display = document.getElementById("display");
const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
    button.addEventListener("click", () => handleInput(button.innerText));
});

function handleInput(value) {
    if (value === "C") {
        display.value = "";
    } 
    else if (value === "DEL") {
        display.value = display.value.slice(0, -1);
    } 
    else if (value === "=") {
        calculate();
    } 
    else {
        display.value += value;
    }
}

function calculate() {
    try {
        display.value = eval(display.value);
    } catch {
        display.value = "Error";
    }
}

/* Keyboard Support */
document.addEventListener("keydown", (e) => {
    if (
        (e.key >= 0 && e.key <= 9) ||
        ["+", "-", "*", "/", "."].includes(e.key)
    ) {
        display.value += e.key;
    }

    if (e.key === "Enter") {
        calculate();
    }

    if (e.key === "Backspace") {
        display.value = display.value.slice(0, -1);
    }

    if (e.key === "Escape") {
        display.value = "";
    }
});
