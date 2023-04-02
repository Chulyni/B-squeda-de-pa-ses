const title = document.querySelector(".title");
const details = document.querySelector(".details")
const urlParam = new URLSearchParams(window.location.search);
const param = urlParam.get("name");

console.log(param)



title.addEventListener("click", () => location.reload())

document.addEventListener("DOMContentLoaded", () =>{
  if(JSON.parse(localStorage.getItem("theme")) == null){
    localStorage.setItem("theme",JSON.stringify("light"))
}else{
    JSON.parse(localStorage.getItem("theme"))
}
modeDefault()
fetchData();
})

const fetchData = async () =>{
   try {
    const url = "https://restcountries.com/v3.1/all";
    const res = await fetch(url);
    const data = await res.json();

    const filterData = data.filter(item => item.name.common === param)

    flags(filterData,data)
    alertaSucess()
   } catch (error) {
    alertaFailed(error)
}
} 

const flags = (data,dataAll) =>{
  console.log(dataAll)
    let html = "";
 
        data.forEach(pais => {
          console.log(pais)
            const {name,flags,population,region,capital,languages,borders,tld,subregion} = pais
            const currencies = Object.values(pais.currencies);
            const lenguajesTotales = Object.values(languages)
            const nativeName = Object.values(name.nativeName)
            let btnsBorder = "";
            if(borders === undefined){
              btnsBorder = `<p class="no-result">No results</p>`;
            }else{
              //code
              btnsBorder = encontrarNameBorder(dataAll,borders)
            
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
              <a class="btn-map" href="mapa.html?name=${name.common}&capital=${capital}">Ver mapa <i class="fa-solid fa-map-location-dot"></i></a>
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
                ${lenguajesTotales}
              </p>
              </div>
            </div>
            <div class="borders">
            <p>Border Countries:</p>
            <div class="borders__container">
            ` 
            +
            btnsBorder
            +
            ` 
           </div>
            </div>

            </div>
          </article>`;
          

        });
 
    details.innerHTML = html
}
const encontrarNameBorder = (data,borders) =>{
  let btnsBorder = "";
  borders.forEach( border =>{
    const res = data.filter( elemento => elemento.cca3 === border || elemento.cca2 === border)
    const nameBorderCountry = res[0].name.common;
    btnsBorder+= ` <a class="border" href="details.html?name=${nameBorderCountry}">${border}</a>`

    })
    return btnsBorder;
 
}

const alertaSucess = () =>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Se ha cargado el pais seleccionado correctamente!'
      })
}
const alertaFailed = (error) =>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'error',
        title: `¡Hubo un error inesperado! : ${error}`
      })
      console.log(error)
}