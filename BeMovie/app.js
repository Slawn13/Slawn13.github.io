// SWIPER -----------------------------------------------------------------------

const swiper = new Swiper(".searchSwip", {
  // Optional parameters
  centeredSlides:true,
  slidesPerView: 1,
  direction: "horizontal",
  loop: true,
  spaceBetween: 10,
  
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".searchButWrap .swiper-button-next",
    prevEl: ".searchButWrap .swiper-button-prev",
  },



});

const swiper2 = new Swiper(".lastSwip", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  
  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".lastButWrap .swiper-button-next",
    prevEl: ".lastButWrap .swiper-button-prev",
  },
});

const swiper3 = new Swiper(".genreSwip", {
  // Optional parameters
  slidesPerView: 1,
  direction: "horizontal",
  loop: true,
  spaceBetween: 10,

  breakpoints: {
    640: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 10,
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".genreButWrap .swiper-button-next",
    prevEl: ".genreButWrap .swiper-button-prev",
  },
});

// API -------------------------------------------------------------------------

//KEY & BASE

let popUpMovie = document.querySelector(".popUpMovie");
let closePopUpMovie = document.querySelector(".closeMovie");
let popUpOverlay = document.querySelector(".popUpOverlay");

let swipSearch = document.querySelector(".sliderSearch");

let swipLast = document.querySelector("#lastestMovie");

let search = document.querySelector("#inputSearch");
let searchValue = search.value;

let searchButton = document.querySelector("#searchButton");

let resultFor = document.querySelector(".resultFor");

let listGenres = document.querySelector(".ulGenres");

const apiKey = "api_key=902e00f0fdf07fe0196f09fcac3dc187";

const baseURL = "https://api.themoviedb.org/3";

let searchURL = baseURL + `/search/movie?query=${searchValue}&` + apiKey;

const lastURL = baseURL + "/discover/movie?sort_by=popularity.desc&" + apiKey;

let genreURL =
  baseURL + "/discover/movie?sort_by=popularity.desc&with_genres=35&" + apiKey;

const idGenreURL = baseURL + "/genre/movie/list?" + apiKey;

const imgURL = "https://image.tmdb.org/t/p/w500";

// MODAL -------------------------------------------------------------

// SIGN & REGISTER

let signUp = document.querySelector(".sign");
let login = document.querySelector(".login");

let notMember = document.querySelector(".notMember");
let alsoSignUp = document.querySelector("#alsoSignUp");

let forgotPass = document.querySelector(".forgotPass");

let loginButton = document.querySelector(".loginButton");

let headMenuList = document.querySelector(".headMenuList");
let footMenuList = document.querySelector(".footMenuList");

let popUpLogReg = document.querySelector(".popContainer");

let headSignIn = document.querySelector(".headSignIn");
let headRegister = document.querySelector(".headRegister");

let footSignIn = document.querySelector(".footSignIn");
let footRegister = document.querySelector(".footRegister");

let closeLogin = document.querySelector(".closeLogin");

function switchSignLog() {
  signUp.style.backgroundColor = "#CC0000";
  signUp.style.border = "none";
  login.style.backgroundColor = "black";
  login.style.border = "1px solid #FFFFFF";
  login.style.borderLeft = "none";
  notMember.setAttribute("id", "hidden");
  forgotPass.setAttribute("id", "hidden");
  loginButton.innerText = "register";
}

function switchBackSignLog() {
  signUp.style.backgroundColor = "black";
  signUp.style.border = "1px solid #FFFFFF";
  signUp.style.borderRight = "none";
  login.style.backgroundColor = "#CC0000";
  login.style.border = "none";
  notMember.setAttribute("id", "");
  forgotPass.setAttribute("id", "");
  loginButton.innerText = "login";
}

login.addEventListener("click", (e) => {
  switchBackSignLog();
});

signUp.addEventListener("click", (e) => {
  switchSignLog();
});

alsoSignUp.addEventListener("click", (e) => {
  switchSignLog();
});

headSignIn.addEventListener("click", (e) => {
  popUpLogReg.setAttribute("id", "");
  popUpOverlay.setAttribute("id", "");
  switchBackSignLog();
});

headRegister.addEventListener("click", (e) => {
  popUpLogReg.setAttribute("id", "");
  popUpOverlay.setAttribute("id", "");
  switchSignLog();
});

footSignIn.addEventListener("click", (e) => {
  popUpLogReg.setAttribute("id", "");
  popUpOverlay.setAttribute("id", "");
  switchBackSignLog();
});

footRegister.addEventListener("click", (e) => {
  popUpLogReg.setAttribute("id", "");
  popUpOverlay.setAttribute("id", "");
  switchSignLog();
});

closeLogin.addEventListener("click", (e) => {
  popUpLogReg.setAttribute("id", "hidden");
  popUpOverlay.setAttribute("id", "hidden");
});

popUpOverlay.addEventListener("click", (e) => {
  popUpLogReg.setAttribute("id", "hidden");
  popUpOverlay.setAttribute("id", "hidden");
});

// FUNCTIONS GET -----------------------------------------------------

async function getCast(idMovie) {
  try {
    let cast = [];

    let response = await fetch(
      `https://api.themoviedb.org/3/movie/${idMovie}?api_key=902e00f0fdf07fe0196f09fcac3dc187&language=en-US&append_to_response=credits`
    );
    let data = await response.json();
    let casting = data.credits.cast;
    for (let i = 0; i < 4; i++) {
      cast.push(casting[i].name);
    }
    return cast.join(", ");
  } catch {
    console.log("oups");
    return [];
  }
}

//------------------------------------------------------------------

async function findGenre(url) {
  //FIND MOVIES ID

  try {
    let response = await fetch(url);
    let data = await response.json();
    let resultsGenres = data.genres;

    return resultsGenres;
  } catch (ex) {
    console.log(ex);
    return [];
  }
}

let idGenres = await findGenre(idGenreURL);

//-----------------------------------------------------------------

async function getSearchMovie(url) {
  // GET SEARCH MOVIE & DISPLAY

  try {
    let response = await fetch(url);
    let data = await response.json();
    let resultsSearch = data.results;

    swiper.removeAllSlides();

    resultsSearch.forEach((movie) => {
      let genreTxt = [];

      movie.genre_ids.forEach((idGenreMovie) => {
        for (let i = 0; i < idGenres.length; i++) {
          if (idGenreMovie == idGenres[i].id) {
            genreTxt.push(idGenres[i].name);
          }
        }
      });

      let texteGenresMovie = genreTxt.join(" / ");

      swiper.appendSlide([
        `<div class="swiper-slide swiper-slide1"><img src="${
          imgURL + movie.poster_path
        }" alt=""><div class="overlay"><p>${
          movie.original_title
        }</p><p>${movie.release_date.slice(
          0,
          -6
        )}</p><p id="genre">${texteGenresMovie}</p><p id="note"><img src="etoile.png" alt="">${movie.vote_average.toFixed(
          1
        )}</p><p class="swiper-slide swiper-slide1 movieCastID" id="hidden">${
          movie.id
        }</p></div></div>`,
      ]);
    });

    let sliders = document.querySelectorAll(".swiper-slide1");
    sliders.forEach((slide) => {
      slide.addEventListener("click", async (e) => {
        popUpMovie.setAttribute("id", "");
        popUpOverlay.setAttribute("id", "");

        let popPic = document.querySelector(".picture");
        let popImg = popPic.firstChild;
        popImg.setAttribute("src", slide.firstChild.getAttribute("src"));

        let popTitle = document.querySelector("#title");
        popTitle.innerText = slide.lastChild.firstChild.innerText;

        let popReleaseYear = document.querySelector("#releaseYear");
        popReleaseYear.innerText =
          slide.lastChild.firstChild.nextSibling.innerText;

        let popNote = document.querySelector("#note");
        popNote.innerHTML = slide.lastChild.lastChild.previousSibling.innerHTML;

        let popGenre = document.querySelector("#popGenre");
        popGenre.innerText =
          slide.lastChild.firstChild.nextSibling.nextSibling.innerText;

        let popOverview = document.querySelector("#synopsis");
        for (let i = 0; i < resultsSearch.length; i++) {
          if (popTitle.innerText === resultsSearch[i].original_title) {
            popOverview.innerText = resultsSearch[i].overview;
            popTitle.innerText = popTitle.innerText.toUpperCase();
          } else {
          }
        }

        let castingMovie = document.querySelector("#castNames");
        let castMovieID = slide.lastChild.lastChild.innerText;
        // console.log(castMovieID);
        let popUpCast = await getCast(castMovieID);
        // console.log(popUpCast);
        castingMovie.innerText = popUpCast;
      });
    });
  } catch (ex) {
    console.log(ex);
  }
}

searchButton.addEventListener("click", (e) => {
  searchValue = search.value;

  if (!searchValue) {
    resultFor.removeAttribute("id");
    resultFor.style.textAlign = "center";
    resultFor.innerText = "Enter element to research";
  } else {
    resultFor.style.textAlign = "left";
    resultFor.innerText = `Results for "${searchValue.toUpperCase()}"`;
    resultFor.removeAttribute("id");
    swipSearch.removeAttribute("id");

    searchURL = baseURL + `/search/movie?query=${searchValue}&` + apiKey;

    getSearchMovie(searchURL);
  }
});

search.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchValue = search.value;

    if (!searchValue) {
      resultFor.removeAttribute("id");
      resultFor.style.textAlign = "center";
      resultFor.innerText = "Enter element to research";
    } else {
      resultFor.style.textAlign = "left";
      resultFor.innerText = `Results for "${searchValue.toUpperCase()}"`;
      resultFor.removeAttribute("id");
      swipSearch.removeAttribute("id");

      searchURL = baseURL + `/search/movie?query=${searchValue}&` + apiKey;

      getSearchMovie(searchURL);
    }
  }
});

//-----------------------------------------------------------------

async function getLastMovie(url) {
  //GET MOVIES TRENDING & DISPLAY

  try {
    let response = await fetch(url);
    let data = await response.json();
    let resultsLast = data.results;

    console.log(resultsLast);

    swiper2.removeAllSlides();

    resultsLast.forEach((movie) => {
      let genreTxt = [];

      movie.genre_ids.forEach((idGenreMovie) => {
        for (let i = 0; i < idGenres.length; i++) {
          if (idGenreMovie == idGenres[i].id) {
            genreTxt.push(idGenres[i].name);
          }
        }
      });

      let texteGenresMovie = genreTxt.join(" / ");

      swiper2.appendSlide([
        `<div class="swiper-slide swiper-slide2"><img src="${
          imgURL + movie.poster_path
        }" alt=""><div class="overlay"><p>${
          movie.original_title
        }</p><p>${movie.release_date.slice(
          0,
          -6
        )}</p><p id="genre">${texteGenresMovie}</p><p id="note"><img src="etoile.png" alt="">${movie.vote_average.toFixed(
          1
        )}</p><p class="swiper-slide swiper-slide2 movieCastID" id="hidden">${
          movie.id
        }</p></div></div>`,
      ]);
    });

    let sliders = document.querySelectorAll(".swiper-slide2");
    sliders.forEach((slide) => {
      slide.addEventListener("click", async (e) => {
        popUpMovie.setAttribute("id", "");
        popUpOverlay.setAttribute("id", "");

        let popPic = document.querySelector(".picture");
        let popImg = popPic.firstChild;
        popImg.setAttribute("src", slide.firstChild.getAttribute("src"));

        let popTitle = document.querySelector("#title");
        popTitle.innerText = slide.lastChild.firstChild.innerText;

        let popReleaseYear = document.querySelector("#releaseYear");
        popReleaseYear.innerText =
          slide.lastChild.firstChild.nextSibling.innerText;

        let popNote = document.querySelector("#note");
        popNote.innerHTML = slide.lastChild.lastChild.previousSibling.innerHTML;

        let popGenre = document.querySelector("#popGenre");
        popGenre.innerText =
          slide.lastChild.firstChild.nextSibling.nextSibling.innerText;

        let popOverview = document.querySelector("#synopsis");
        for (let i = 0; i < resultsLast.length; i++) {
          if (popTitle.innerText === resultsLast[i].original_title) {
            popOverview.innerText = resultsLast[i].overview;
            popTitle.innerText = popTitle.innerText.toUpperCase();
          } else {
          }
        }

        let castingMovie = document.querySelector("#castNames");
        let castMovieID = slide.lastChild.lastChild.innerText;
        // console.log(castMovieID);
        let popUpCast = await getCast(castMovieID);
        // console.log(popUpCast);
        castingMovie.innerText = popUpCast;
      });
    });

    closePopUpMovie.addEventListener("click", (e) => {
      popUpMovie.setAttribute("id", "hidden");
      popUpOverlay.setAttribute("id", "hidden");
    });

    popUpOverlay.addEventListener("click", (e) => {
      popUpMovie.setAttribute("id", "hidden");
      popUpOverlay.setAttribute("id", "hidden");
    });
  } catch (ex) {
    console.log(ex);
  }
}

getLastMovie(lastURL);

//-----------------------------------------------------------------

async function getGenreMovie(url) {
  //GET MOVIES BY GENRE & DISPLAY

  try {
    let response = await fetch(url);
    let data = await response.json();
    let resultsGenre = data.results;

    swiper3.removeAllSlides();

    resultsGenre.forEach((movie) => {
      let genreTxt = [];

      movie.genre_ids.forEach((idGenreMovie) => {
        for (let i = 0; i < idGenres.length; i++) {
          if (idGenreMovie == idGenres[i].id) {
            genreTxt.push(idGenres[i].name);
          }
        }
      });

      let texteGenresMovie = genreTxt.join(" / ");

      swiper3.appendSlide([
        `<div class="swiper-slide swiper-slide3">
        <img src="${
          imgURL + movie.poster_path
        }" alt=""><div class="overlay"><p>${
          movie.original_title
        }</p><p>${movie.release_date.slice(
          0,
          -6
        )}</p><p id="genre">${texteGenresMovie}</p><p id="note"><img src="etoile.png" alt="">${movie.vote_average.toFixed(
          1
        )}</p><p class="swiper-slide swiper-slide2 movieCastID" id="hidden">${
          movie.id
        }</p></div></div>`,
      ]);
    });

    let sliders = document.querySelectorAll(".swiper-slide3");
    sliders.forEach((slide) => {
      slide.addEventListener("click", async (e) => {
        popUpMovie.setAttribute("id", "");
        popUpOverlay.setAttribute("id", "");

        let popPic = document.querySelector(".picture");
        let popImg = popPic.firstChild;
        popImg.setAttribute("src", slide.firstChild.getAttribute("src"));

        let popTitle = document.querySelector("#title");
        popTitle.innerText = slide.lastChild.firstChild.innerText;

        let popReleaseYear = document.querySelector("#releaseYear");
        popReleaseYear.innerText =
          slide.lastChild.firstChild.nextSibling.innerText;

        let popNote = document.querySelector("#note");
        popNote.innerHTML = slide.lastChild.lastChild.innerHTML;

        let popGenre = document.querySelector("#popGenre");
        popGenre.innerText =
          slide.lastChild.firstChild.nextSibling.nextSibling.innerText;

        let popOverview = document.querySelector("#synopsis");
        for (let i = 0; i < resultsGenre.length; i++) {
          if (popTitle.innerText === resultsGenre[i].original_title) {
            popOverview.innerText = resultsGenre[i].overview;
            popTitle.innerText = popTitle.innerText.toUpperCase();
          } else {
          }
        }

        let castingMovie = document.querySelector("#castNames");
        let castMovieID = slide.lastChild.lastChild.innerText;
        // console.log(castMovieID);
        let popUpCast = await getCast(castMovieID);
        // console.log(popUpCast);
        castingMovie.innerText = popUpCast;
      });
    });

    closePopUpMovie.addEventListener("click", (e) => {
      popUpMovie.setAttribute("id", "hidden");
      popUpOverlay.setAttribute("id", "hidden");
    });
  } catch (ex) {
    console.log(ex);
  }
}

getGenreMovie(genreURL);

listGenres.addEventListener("click", (e) => {
  let genreDisplayed;
  genreURL =
    baseURL +
    "/discover/movie?sort_by=popularity.desc&with_genres=35&" +
    apiKey;

  let elGenreList = listGenres.querySelectorAll("li");
  for (let i = 0; i < elGenreList.length; i++) {
    elGenreList[i].firstChild.removeAttribute("id");
  }

  if (e.target.classList == "comedy") {
    e.target.setAttribute("id", "clicked");
    genreDisplayed = 35;
  } else if (e.target.classList == "drama") {
    e.target.setAttribute("id", "clicked");
    genreDisplayed = 18;
  } else if (e.target.classList == "action") {
    e.target.setAttribute("id", "clicked");
    genreDisplayed = 28;
  } else if (e.target.classList == "romance") {
    e.target.setAttribute("id", "clicked");
    genreDisplayed = 10749;
  } else if (e.target.classList == "fantasy") {
    e.target.setAttribute("id", "clicked");
    genreDisplayed = 14;
  } else if (e.target.classList == "animation") {
    e.target.setAttribute("id", "clicked");
    genreDisplayed = 16;
  }

  genreURL =
    baseURL +
    `/discover/movie?sort_by=popularity.desc&with_genres=${genreDisplayed}&` +
    apiKey;
  getGenreMovie(genreURL);
});
