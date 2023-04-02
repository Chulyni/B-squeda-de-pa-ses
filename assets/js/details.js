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

    flags(filterData)
    alertaSucess()
   } catch (error) {
    alertaFailed(error)
}
} 

const flags = data =>{
    let html = "";
 
        data.forEach(pais => {
            const {name,flags,population,region,capital,languages,borders} = pais
            const currencies = Object.values(pais.currencies);
            const lenguajesTotales = Object.values(languages)
            console.log(pais)
            html += 
            `  <article class="card">
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
             
              <p class="domain">
                <span>Top level domain:</span>
                ${capital}
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
          </article>`;
          

        });
 
    details.innerHTML = html
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
}