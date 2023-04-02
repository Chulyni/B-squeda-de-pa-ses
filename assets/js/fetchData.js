//Consult api
const fetchData = async () =>{
    try {
     const url = "https://restcountries.com/v3.1/all";
     const res =  await fetch(url);
     const data = await res.json();
    alertSuccess()
    return data;
    } catch (error) {
     alertFailed(error)
    }
 } 