
const form = document.querySelector("form");

const inputs = document.querySelectorAll("input");

// paragraph.forEach((element) => element.);    APPEAR



// form.addEventListener("click", (event) => {
//   event.preventDefault();


  inputs.forEach(element => {
    element.addEventListener("error", (e) => {

      if (e.target.matches("#username")) {
        let precis = element.nextElementSibling;
        precis.innerText="Minimal character required";
        precis.style.color="red"
      }
      
      console.log(e.target);

    })
  });
  

// });




// paragraph.addEventListener("error", (e) => {
//     paragraph.style.display=toggle("none");
// })