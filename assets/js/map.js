/*Variables */
const urlParam = new URLSearchParams(window.location.search);
const country = urlParam.get("name");
const capital = urlParam.get("capital");
const title = document.querySelector(".map-details .title");
const subtitle = document.querySelector(".subtitle");
const btn_Back_details = document.querySelector("#btn-back-details");
const apiKey = config.MY_KEY;
const url = `http://api.positionstack.com/v1/forward?access_key=${apiKey}&query=${capital},${country}`; //api de geocodificacion

document.addEventListener("DOMContentLoaded", () => {
  title.textContent = country;
  subtitle.textContent = capital;
  btn_Back_details.href = `details.html?name=${country}`;
  modeDefault();
  fetchData();
});

const fetchData = async () => {
  try {
    const res = await fetch(url); //
    const respuesta = await res.json();
    const { data } = respuesta;
    const dataInfo = {
      label: "",
      county: "",
      continent: "",
      country_code: "",
      lng: "",
      lng: "",
    };
    console.log(respuesta);
    data.forEach((element) => {
      dataInfo.label = element.label;
      dataInfo.county = element.county;
      dataInfo.continent = element.continent;
      dataInfo.country_code = element.country_code;
      dataInfo.lat = element.latitude;
      dataInfo.lng = element.longitude;
    });
    showMap(dataInfo);
  } catch (error) {
    console.log(error);
  }
};

const showMap = (dataInfo) => {
  let { label, county, continent, country_code, lat, lng } = dataInfo;
  let notSpecific = "Not specific";
  if (continent === null || county === null) {
    continent = notSpecific;
    county = notSpecific;
  }
  var map = L.map("map").setView([lat, lng], 15);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      `<strong> Name:</strong> ${label} <br> 
         <strong> County: </strong> ${county} <br>
         <strong> Continent: </strong> ${continent} <br>
        <strong>   Country Code :</strong> ${country_code} <br> 
          <strong> Latitude : </strong>${lat} <br>
          <strong> Longitude :  </strong> ${lng}`
    )
    .openPopup();
};
