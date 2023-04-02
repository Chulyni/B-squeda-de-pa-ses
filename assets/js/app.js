/*Variables */

const form = document.getElementById("formulario");
const inputForm = document.getElementById("inputFormulario");
const container__flags = document.querySelector(".flags");
const title  = document.querySelector(".title");

//Redirect to  index
title.addEventListener("click", () => location.reload());

document.addEventListener("DOMContentLoaded", () => {
  //set theme
  if (JSON.parse(localStorage.getItem("theme")) == null) {
    localStorage.setItem("theme", JSON.stringify("light"));
  } else {
    JSON.parse(localStorage.getItem("theme"));
  }
  modeDefault(); //execute default theme
  initialization(); //Execute default data
});

const initialization = async () => {
  const res = await fetchData();
  flags(res); //Execute function to update flags
  searchForm(res); //Send data to be available
  regionFilter(res); //Filter region and Send data to be available
};

const flags = (data) => {
  let html = "";
  if (data.length <= 0) {
    html = `<div class="no-result">
            <h2>No results available</h2>
        </div>`;
  } else {
    data.forEach((pais) => {
      const { name, flags, population, region, capital } = pais;
      const nameFormatted = name.common.replace(" ", "-");
      html += `  <article class="card">
            <img src="${flags.svg}" alt="flag-${name.common}" class="img-fluid">
            <div class="card-content">
              <h2>${name.common}</h2>
              <p class="population">
                <span>Population:</span>
                ${population}
              </p>
              <p class="region">
                <span>Region:</span>
                ${region}
              </p>
              <p class="capital">
                <span>Capital:</span>
                ${capital}
              </p>
              <div class="center">
              <a class="btn-more" href="details.html?name=${nameFormatted}">More info <i class="fa-solid fa-angles-right"></i> </a>
              </div>
            </div>
          </article>`;
    });
  }

  container__flags.innerHTML = html;
};
