const form = document.querySelector("form");

const paragraph = document.querySelectorAll("p");

const username = form.querySelector("#username");
const email = form.querySelector("#email");
const password = form.querySelector("#password");
const confirmpass = form.querySelector("#confirmpass");

const submit = form.querySelector("#submit");


const testEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;

//TEST ZONE



// END TEST ZONE



submit.addEventListener("click", (event) => {
    event.preventDefault();

if (username.value.length < 5 || username.value.length > 10) {
    form.querySelector(".msg1").removeAttribute("hidden");
    form.querySelector(".msg1").innerText ="5-10 characters required";
    form.querySelector(".msg1").classList.add("error");
} else {
    form.querySelector(".msg1").removeAttribute("hidden");
    form.querySelector(".msg1").innerText = "Confirmed";
    form.querySelector(".msg1").classList.add("succes");
    form.querySelector(".msg1").classList.remove("error");
}

if (email.value.match(testEmail) == null) {      /// pourquoi marche pas avec la varRegex
    form.querySelector(".msg2").removeAttribute("hidden");
    form.querySelector(".msg2").innerText = "Enter valid email"
    form.querySelector(".msg2").classList.add("error");
}   else {
    form.querySelector(".msg2").removeAttribute("hidden");
    form.querySelector(".msg2").innerText = "Confirmed";
    form.querySelector(".msg2").classList.remove("error");
    form.querySelector(".msg2").classList.add("succes");
}

if (password.value.length < 5 || password.value.length > 15) {
    form.querySelector(".msg3").removeAttribute("hidden");
    form.querySelector(".msg3").innerText = "5-15 characters required"
    form.querySelector(".msg3").classList.add("error");
}   else {
    form.querySelector(".msg3").removeAttribute("hidden");
    form.querySelector(".msg3").innerText = "Confirmed";
    form.querySelector(".msg3").classList.add("succes");
    form.querySelector(".msg3").classList.remove("error");

}

if (confirmpass.value !== password.value || confirmpass.value == "") {
    form.querySelector(".msg4").removeAttribute("hidden");
    form.querySelector(".msg4").innerText = "Passwords doesn't correspond"
    form.querySelector(".msg4").classList.add("error");
}   else {
    form.querySelector(".msg4").removeAttribute("hidden");
    form.querySelector(".msg4").innerText = "Confirmed";
    form.querySelector(".msg4").classList.add("succes");
    form.querySelector(".msg4").classList.remove("error");

}

if (
    form.querySelector(".msg1").classList.contains("succes") == true
&& form.querySelector(".msg2").classList.contains("succes") == true
&& form.querySelector(".msg3").classList.contains("succes") === true
&& form.querySelector(".msg4").classList.contains("succes") == true
) {
console.log(username.value);
console.log(email.value);
console.log(password.value);
}
});