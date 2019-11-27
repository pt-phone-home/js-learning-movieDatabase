const header = document.querySelector("header");
// const startModalBtn = header.querySelector("button");
const startModalBtn = document.querySelector("header button");
const movieModal = document.getElementById("add-modal");
const backdrop = document.getElementById("backdrop");
const modalCancelBtn = movieModal.querySelector(
    ".modal__actions .btn--passive"
);
const modalAddBtn = modalCancelBtn.nextElementSibling;
const userInputs = movieModal.querySelectorAll("input");
const movies = [];
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModal = document.getElementById("delete-modal");
// modalAddBtn.textContent = "Lets GO!";
// startModalBtn.addEventListener("click", () => {
//     movieModal.classList.toggle("visible");
// });

const openMovieModal = () => {
    movieModal.classList.add("visible");
    toggleBackdrop();
};

const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

const closeMovieModal = () => {
    movieModal.classList.remove("visible");
};

const cancelAddMovieHandler = () => {
    closeMovieModal();
    clearMovieInputs();
    toggleBackdrop();
};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletionModal();
    clearMovieInputs();
};

const clearMovieInputs = () => {
    for (const input of userInputs) {
        input.value = "";
    }
};

const addMovieHandler = () => {
    const titleValue = userInputs[0].value;
    const imageUrlValue = userInputs[1].value;
    const ratingValue = userInputs[2].value;

    if (
        titleValue.trim() === "" ||
        imageUrlValue.trim() === "" ||
        ratingValue.trim() === "" ||
        parseInt(ratingValue) < 1 ||
        parseInt(ratingValue > 5)
    ) {
        alert("Please enter valid values (rating between 1 and 5).");
    }

    const newMovie = {
        id: Math.random().toString(),
        title: titleValue,
        image: imageUrlValue,
        rating: ratingValue
    };

    movies.push(newMovie);
    console.log(movies);
    closeMovieModal();
    toggleBackdrop();
    clearMovieInputs();
    renderNewMovieElement(
        newMovie.id,
        newMovie.title,
        newMovie.image,
        newMovie.rating
    );
    updateUI();
};

const updateUI = () => {
    if (movies.length === 0) {
        entryTextSection.style.display = "block";
    } else {
        entryTextSection.style.display = "none";
    }
};

const closeMovieDeletionModal = () => {
    toggleBackdrop();
    deleteMovieModal.classList.remove("visible");
};

const deleteMovieHandler = movieId => {
    let movieIndex = 0;
    for (const movie of movies) {
        if (movie.id === movieId) {
            break;
        }

        movieIndex++;
    }

    movies.splice(movieIndex, 1);
    const listRoot = document.getElementById("movie-list");
    listRoot.children[movieIndex].remove();
    closeMovieDeletionModal();
    updateUI();
};

const startDeleteMovieHandler = movieId => {
    deleteMovieModal.classList.add("visible");
    toggleBackdrop();
    const cancelDeletionBtn = deleteMovieModal.querySelector(".btn--passive");
    let confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

    confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));

    confirmDeletionBtn = deleteMovieModal.querySelector(".btn--danger");

    cancelDeletionBtn.removeEventListener("click", closeMovieDeletionModal);
    cancelDeletionBtn.addEventListener("click", closeMovieDeletionModal);
    confirmDeletionBtn.addEventListener(
        "click",
        deleteMovieHandler.bind(null, movieId)
    );
};

const renderNewMovieElement = (id, title, image, rating) => {
    const newMovieElement = document.createElement("li");
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
        <div class="movie-element__image">
            <img src="${image}" alt="${title}">
        </div>
        <div class="movie-element__info">
            <h2> ${title} </h2>
            <p> ${rating} / 5 stars </p>
        </div>
    `;
    newMovieElement.addEventListener(
        "click",
        startDeleteMovieHandler.bind(null, id)
    );
    const listRoot = document.getElementById("movie-list");
    listRoot.append(newMovieElement);
};

startModalBtn.addEventListener("click", openMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
modalCancelBtn.addEventListener("click", cancelAddMovieHandler);
modalAddBtn.addEventListener("click", addMovieHandler);
