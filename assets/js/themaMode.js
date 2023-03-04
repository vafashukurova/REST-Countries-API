const themeArea = document.querySelector(".theme-area");

function darkmode() {
  var SetTheme = document.body;
  SetTheme.classList.toggle("dark");
  var theme;
  if (SetTheme.classList.contains("dark")) {
    console.log("Dark mode");
    theme = "Dark";
    document.body.classList.add("dark");
  } else {
    console.log("Light mode");
    theme = "Light";
    document.body.classList.remove("remove");
  }
  // save to localStorage
  localStorage.setItem("PageTheme", JSON.stringify(theme));
}

themeArea.addEventListener("click", function () {
  darkmode();
});

let GetTheme = JSON.parse(localStorage.getItem("PageTheme"));
console.log(GetTheme);
if (GetTheme === "Dark") {
  document.body.classList = "dark";
} else {
  document.body.classList = "";
}
