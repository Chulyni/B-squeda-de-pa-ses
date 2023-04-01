/*Variables */


const formulario = document.getElementById("formulario");
const inputFormulario = document.getElementById("inputFormulario")
const container__flags = document.querySelector(".flags")

// formulario.addEventListener("keyup", e => fetchData(e))


document.addEventListener("DOMContentLoaded", () =>{
    fetchData();
})

const fetchData = async () =>{
   try {
    const url = "https://restcountries.com/v3.1/all";
    const res = await fetch(url);
    const data = await res.json();
    flags(data)
    alertaSucess()
   } catch (error) {
    alertaFailed(error)
   }
} 

const flags = data =>{
    let html = "";
    console.log(data)
    data.forEach(pais => {
        const {name,flags,population,region,capital} =pais
        html += 
        `  <article class="card">
        <img src="${flags.png}" alt="flag-${name.common}" class="img-fluid">
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

        </div>
      </article>`
    });
    container__flags.innerHTML = html
}

const alertaSucess = () =>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: 'Se ha cargado la lista de paises correctamente!'
      })
}
const alertaFailed = (error) =>{
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
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