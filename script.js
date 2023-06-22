const inputDayElement = document.querySelector(".input-day");
const inputMonthElement = document.querySelector(".input-month");
const inputYearElement = document.querySelector(".input-year");
const resultDay = document.querySelector("#days");
const resultMonth = document.querySelector("#months");
const resultYear = document.querySelector("#years");
const items = document.querySelector(".items");
const labelDay = document.querySelector(".text-label-day");
const labelMonth = document.querySelector(".text-labels-month");
const labelYear = document.querySelector(".text-labels-year");
const messageEmptyFieldDay = document.querySelector(".message-empty-field-day");
const messageEmptyFieldMonth = document.querySelector(
    ".message-empty-field-month"
);
const messageEmptyFieldYear = document.querySelector(
    ".message-empty-field-year"
);
const messageErrorDay = document.querySelector(".message-error-day");
const messageErrorMonth = document.querySelector(".message-error-month");
const messageErrorYear = document.querySelector(".message-error-year");
const btnCalculate = document.querySelector("#btn-calculate");
let valid = false;

// FUNÇÕES PARA BLOQUEAR LETRAS E CARACTERES ESPECIAIS
inputDayElement.addEventListener("keypress", function (e) {
    if (!checkChar(e)) {
        e.preventDefault();
    }
});

inputMonthElement.addEventListener("keypress", function (e) {
    if (!checkChar(e)) {
        e.preventDefault();
    }
});

inputYearElement.addEventListener("keypress", function (e) {
    if (!checkChar(e)) {
        e.preventDefault();
    }
});

document.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        btnCalculate.click();
    }
});

// FUNÇÃO PARA VERIFICAR OS CARACTERES
function checkChar(e) {
    var char = String.fromCharCode(e.keyCode);
    var pattern = "[0-9]";
    if (char.match(pattern)) {
        return true;
    }
}

function emptyInput(value) {
    return value === "" || value === null;
}
function incorrectInput(value, maxValue) {
    return value > maxValue;
}

function handleFieldValidation(
    inputValue,
    maxValue,
    labelElement,
    inputElement,
    messageEmptyFieldElement,
    messageErrorElement,
    resultElement,
    valueIfInvalid,
    ageInDate
) {
    if (emptyInput(inputValue)) {
        labelElement.classList.add("error");
        inputElement.style.borderColor = "red";
        messageEmptyFieldElement.classList.remove("hide");
        messageErrorElement.classList.toggle("hide", emptyInput(inputValue));
        resultElement.innerHTML = valueIfInvalid;
    } else if (incorrectInput(inputValue, maxValue)) {
        labelElement.classList.add("error");
        inputElement.style.borderColor = "red";
        messageEmptyFieldElement.classList.add("hide");
        messageErrorElement.classList.remove("hide");
        resultElement.innerHTML = valueIfInvalid;
    } else {
        labelElement.classList.remove("error");
        inputElement.style.borderColor = "rgba(0, 0, 0, 0.12)";
        messageEmptyFieldElement.classList.add("hide");
        messageErrorElement.classList.add("hide");
        resultElement.innerHTML = ageInDate;
    }
}

function calculateAge() {
    const date = new Date();
    const currentDay = date.getDate();
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    const valueInputDays = inputDayElement.value;
    const valueInputMonths = inputMonthElement.value;
    const valueInputYears = inputYearElement.value;

    const userDate = new Date(
        valueInputYears,
        valueInputMonths - 1,
        valueInputDays
    );

    // CONDIÇÕES TERNARIAS PARA OS NÚMEROS NÃO SAIREM NEGATIVOS
    let ageInYears = date.getFullYear() - userDate.getFullYear();
    let ageInDay = date.getDate() - userDate.getDate();
    let ageInMonth = date.getMonth() - userDate.getMonth();

    let newDate = date - userDate;
    let novadata = new Date(newDate);

    if (ageInMonth < 0 || (ageInMonth === 0 && ageInDay < 0)) {
        ageInYears--;
        ageInMonth += 12;

        if (valueInputDays > currentDay) {
            ageInDay = userDate.getDate() - date.getDate();
        }
    }

    handleFieldValidation(
        valueInputDays,
        31,
        labelDay,
        inputDayElement,
        messageEmptyFieldDay,
        messageErrorDay,
        resultDay,
        "--",
        ageInDay
    );
    handleFieldValidation(
        valueInputMonths,
        12,
        labelMonth,
        inputMonthElement,
        messageEmptyFieldMonth,
        messageErrorMonth,
        resultMonth,
        "--",
        ageInMonth
    );
    handleFieldValidation(
        valueInputYears,
        currentYear,
        labelYear,
        inputYearElement,
        messageEmptyFieldYear,
        messageErrorYear,
        resultYear,
        "--",
        ageInYears
    );

    function checkDays() {
        if (parseInt(valueInputDays) != userDate.getDate()) {
            return true;
        } else {
            return false;
        }
    }

    if (
        parseInt(valueInputDays) === 31 ||
        parseInt(valueInputDays) === 30 ||
        parseInt(valueInputDays) === 28
    ) {
        if (checkDays(valueInputDays, userDate)) {
            labelDay.classList.add("error");
            inputDayElement.style.borderColor = "red";
            messageErrorDay.classList.remove("hide");
            messageEmptyFieldDay.classList.add("hide");
            resultDay.innerHTML = "--";
        } else {
            labelDay.classList.remove("error");
            inputDayElement.style.borderColor = "rgba(0, 0, 0, 0.12)";
            messageErrorDay.classList.add("hide");
            messageEmptyFieldDay.classList.add("hide");
            resultDay.innerHTML = ageInDay;
        }
    }
}
