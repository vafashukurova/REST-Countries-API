const searchInput = document.querySelector(".search-input");
const searchIcon = document.querySelector(".search-icon");
const filtrBtn = document.querySelector(".dropDown");
const drop = document.querySelector(".drop");
const dropDownItem = document.querySelectorAll(".drop-item");
const dataRegionName = document.getElementsByClassName("region-nation");
const dataCountryName = document.getElementsByClassName("country-name");
const regionAbout = document.querySelector(".region-about");
const lightIcon = document.querySelector(".light-icon");
const cardImg = document.querySelectorAll(".back-link");

searchInput.addEventListener("click", function () {
  searchIcon.style.display = "none";
  this.style.paddingLeft = "20px";
});

dropDownItem.forEach((element) => {
  element.addEventListener("click", function () {
    drop.classList.remove("show");
    filtrBtn.innerHTML = `${"Region:" + " " + element.textContent}`;
  });
});

let countryData;

// Get data with fetch rest api
function fetchData() {
  fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((data) => {
      renderCountries(data);
      countryData = data;
      console.log(countryData);
    });
}
fetchData();

dropDownItem.forEach((item) => {
  item.addEventListener("click", (e) => {
    console.log(item.textContent);
    if (item.textContent === "All") {
      fetchData();
    } else {
      fetch(`https://restcountries.com/v3.1/region/${item.textContent}`)
        .then((res) => res.json())
        .then((data) => renderCountries(data));
    }
  });
});

function renderCountries(data) {
  regionAbout.innerHTML = "";
  data.forEach((country) => {
    const showContent = document.createElement("div");
    showContent.innerHTML = `
      <div class="region-card">
                  <div class="card-img">
                  <a href="/countryAbout.html?name=${country.name.common}" class="back-link">
                  <img src="${country.flags.png}" alt="" class="region-img">
                  </a>
                  </div>
                  <div class="card-content">
                  <h3 class="region-name">${country.name.common}</h3>
                  <div class="region-items">
                      <p class="region-population" id="region-item"><b>Population:</b>${country.population}</p>
                      <p class="region-nation" id="region-item"><b>Region:</b>${country.region}</p>
                      <p class="region-capital" id="region-item"><b>Capital:</b>${country.capital}</p>
                  </div>
                  </div>
              </div>
    `;
    regionAbout.append(showContent);
  });
}

searchInput.addEventListener("input", (e) => {
  const filteredCountry = countryData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );
  renderCountries(filteredCountry);
});

// Filter by region menu
filtrBtn.addEventListener("click", function () {
  drop.classList.toggle("show");
});
