const countryAboutContent = document.querySelector("#countryAbout");
const countryName = new URLSearchParams(location.search).get("name");

function fetchData() {
  fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([data]) => {
      const aboutContent = document.createElement("div");

      aboutContent.innerHTML = `<div class="container main-items">
      <div class="flag-img">
          <img src="${data.flags.svg}" alt="" class="img">
      </div>
      <div class="about-content">
          <h2 class="country-name">${data.name.common}</h2>
          <div class="country-items">
              <div class="first-item">
                  <p class="name"><b>Native Name:</b>${
                    Object.values(data.name.nativeName)[0].common
                  }</p>
                  <p class="country-population"><b>Population:</b>${
                    data.population
                  }</p>
                  <p class="country-region"><b>Region:</b>${data.region}</p>
                  <p class="country-subregion"><b>Sub Region:</b>${
                    data.subregion
                  }</p>
                  <p class="country-capital"><b>Capital:</b>${data.capital}</p>
              </div>
              <div class="second-item">
                  <p class="level-domain"><b>Top Level Domain:</b>${data.tld.join(
                    ", "
                  )}</p>
                  <p class="currencies"><b>Currencies:</b>${Object.values(
                    data.currencies
                  )
                    .map((currency) => currency.name)
                    .join(",")}
                    </p>
                  <p class="lang"><b>Languages:</b>${Object.values(
                    data.languages
                  ).join(", ")}</p>
              </div>
          </div>
          <div class="border-items">
              <p><b>Border Countries:</b></p>
          </div>
      </div>
  </div>`;

      if (data.borders) {
        data.borders.forEach((border) => {
          fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res) => res.json())
            .then(([borderCountry]) => {
              const borderBtn = document.createElement("a");
              borderBtn.classList.add("border-btn");
              borderBtn.innerText = borderCountry.name.common;
              borderBtn.href = `countryAbout.html?name=${borderCountry.name.common}`;
              document.querySelector(".border-items").append(borderBtn);
            });
        });
      }
      countryAboutContent.append(aboutContent);
    });
}
fetchData();
