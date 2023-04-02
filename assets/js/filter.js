const searchForm = (data) => {
  formulario.addEventListener("keyup", (e) => {
    e.preventDefault();
    //search and filter the data and posterior, return the element
    const letterUser = inputForm.value.toLowerCase();
    const arrayFilter = data.filter((element) => {
      const letterApi = element.name.common.toLowerCase();
      if (letterApi.indexOf(letterUser) !== -1) {
        //search in real time
        return element;
      }
    });
    flags(arrayFilter);
  });
};
