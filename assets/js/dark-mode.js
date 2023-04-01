const dark_mode = document.getElementById("dark-mode")


dark_mode.addEventListener("click", () =>{
   document.body.classList.toggle("dark-mode")

   if(document.body.className === "dark-mode"){
    dark_mode.innerHTML = 
    `
    <i class="fa-regular fa-sun"></i>
    Light Mode
    `
   }else{
    dark_mode.innerHTML=
    `
    <i class="fa-regular fa-moon"></i>
    Dark Mode
    `
   }
})