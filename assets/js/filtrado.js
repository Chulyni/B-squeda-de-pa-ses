
const formularioBusqueda = data =>{
    formulario.addEventListener("keyup", e =>{
        e.preventDefault();

        const letraUsuario = inputFormulario.value.toLowerCase()
        const arrayFiltrado = data.filter(elemento =>{

            const letraApi = elemento.name.common.toLowerCase()
            if(letraApi.indexOf(letraUsuario) !== -1){
                return elemento
            }
        })
        flags(arrayFiltrado)
    })
}

