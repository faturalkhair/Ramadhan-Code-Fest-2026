const loginPage = document.getElementById("loginPage");
const calculatorPage = document.getElementById("calculatorPage");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginError = document.getElementById("loginError");
const display = document.getElementById("display");

// LOGIN
const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(e) {
  e.preventDefault(); // supaya tidak reload halaman

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (username === "" || password === "") {
    loginError.textContent = "Isi Username & Password dulu boss!";
    return;
  }

  loginError.textContent = "";
  loginPage.classList.remove("active");
  calculatorPage.classList.add("active");
});

// LOG OT
logoutBtn.addEventListener("click", () => {
  display.value = "";
  calculatorPage.classList.remove("active");
  loginPage.classList.add("active");
});

// BUTTON KLIIKK
document.querySelectorAll(".buttons button").forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "C") {
      display.value = "";
    } else if (value === "=") {
      calculate();
    } else {
      display.value += value;
    }
  });
});

// KEYBOARD SUPPORT
document.addEventListener("keydown", (event) => {

  // hanya aktif jika di halaman kalkulator
  if (!calculatorPage.classList.contains("active")) return;

  const key = event.key;

  if (!isNaN(key)) {
    display.value += key;
  }

  if (["+", "-", "*", "/", "."].includes(key)) {
    display.value += key;
  }

  if (key === "Enter") {
    calculate();
  }

  if (key === "Backspace") {
    display.value = display.value.slice(0, -1);
  }

  if (key === "Escape") {
    display.value = "";
  }
});

function calculate() {
  try {
    display.value = eval(display.value);
  } catch {
    display.value = "Error";
  }
}