const dark_mode = document.getElementById("dark-mode");

dark_mode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.className === "dark-mode") {
    localStorage.removeItem("theme");
    localStorage.setItem("theme", JSON.stringify("dark"));
    dark_mode.innerHTML = `
    <i class="fa-regular fa-sun"></i>
    Light Mode
    `;
  } else {
    localStorage.removeItem("theme");
    localStorage.setItem("theme", JSON.stringify("light"));
    dark_mode.innerHTML = `
    <i class="fa-regular fa-moon"></i>
    Dark Mode
    `;
  }
});

const modeDefault = () => {
  const currentTheme = JSON.parse(localStorage.getItem("theme"));

  if (currentTheme == "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
};
