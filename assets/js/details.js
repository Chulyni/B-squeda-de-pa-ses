/*Variables */
const title = document.querySelector(".title");
const details = document.querySelector(".details");
const urlParam = new URLSearchParams(window.location.search);
const param = urlParam.get("name");
const nameCountry = param.replace("-", " ");

title.addEventListener("click", () => location.reload());

document.addEventListener("DOMContentLoaded", () => {
  //Default theme
  if (JSON.parse(localStorage.getItem("theme")) == null) {
    localStorage.setItem("theme", JSON.stringify("light"));
  } else {
    JSON.parse(localStorage.getItem("theme"));
  }

  modeDefault();
  initialization();

  async function initialization() {
    const res = await fetchData(); //Consulting data api

    filterData(res);
  }
});

//Filter data
const filterData = (data) => {
  const filterData = data.filter((item) => item.name.common === nameCountry);

  flags(filterData, data);

  alertSuccess();
};
//Update flags
const flags = (data, dataAll) => {
  let html = "";

  data.forEach((pais) => {
    const {
      name,
      flags,
      population,
      region,
      capital,
      languages,
      borders,
      tld,
      subregion,
    } = pais;
    const currencies = Object.values(pais.currencies);
    const allLanguagues = Object.values(languages);
    const nativeName = Object.values(name.nativeName);
    let btnsBorder = "";
    if (borders === undefined) {
      btnsBorder = `<p class="no-result">No results</p>`;
    } else {
      //code
      btnsBorder = findNameBorder(dataAll, borders);
    }

    html +=
      `  <article class="card">
              <img src="${flags.svg}" alt="flag-${name.common}" class="img-fluid">
              <div class="card-content">
                <h2>${name.common}</h2>
                <div class="container-details">
                <div class = "section-1">
                <p class="native-name">
                  <span>Native name: </span>
                  ${nativeName[0].common}
                </p>
                <p class="population">
                  <span>Population:</span>
                  ${population}
                </p>
                <p class="region">
                  <span>Region:</span>
                  ${region}
                </p>
                <p class="sub_region">
                  <span>Sub Region:</span>
                  ${subregion}
                </p>
                <p class="capital">
                  <span>Capital:</span>
                  ${capital}
                </p>
                </div>
                <div class="section-2">
                <p class="domain">
                  <span>Top level domain:</span>
                  ${tld}
                </p>
              
                <p class="currencies">
                  <span>Currencies:</span>
                  ${currencies[0].name}
                </p>
                <p class="languages">
                  <span>Languagues:</span>
                  ${allLanguagues}
                </p>
                </div>
              </div>
              <div class="borders">
              <p>Border Countries:</p>
              <div class="borders__container">
              ` +
      btnsBorder +
      ` 
            </div>
              </div>

              </div>
            </article>`;
  });

  details.innerHTML = html;
};

//Find name border and generate btns
const findNameBorder = (data, borders) => {
  let btnsBorder = "";

  borders.forEach((border) => {
    const res = data.filter(
      (elemento) => elemento.cca3 === border || elemento.cca2 === border
    );

    const nameBorderCountry = res[0].name.common;

    btnsBorder += ` <a class="border" href="details.html?name=${nameBorderCountry}">${border}</a>`;
  });

  return btnsBorder;
};
