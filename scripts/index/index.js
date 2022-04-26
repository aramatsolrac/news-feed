"use strict";
const header = document.querySelector(".header");
const modal = document.querySelector(".modal");
const newsContainer = document.querySelector(".news__container");
const form = document.getElementById("form");
const title = document.querySelector(".form__title");
const description = document.querySelector(".form__description");
const uploadImage = document.getElementById("upload");
const previewImage = document.getElementById("preview-image");
const closeBtn = document.querySelector(".form__buttons-close");
const publishBtn = document.querySelector(".form__buttons-publish");
const addNewBtn = document.querySelector(".modal__button");
const editIconBtn = document.querySelector(".modal__button-edit");
const addIconBtn = document.querySelector(".modal__button-add");

// display news
const displayNews = () => {
  newsArray.forEach((newsItem) => {
    const newsItemContent = createElement("div", "news__item");
    newsItemContent.innerHTML = `
    <div class="news__thumbnail">
        <img class="news__img" src="${newsItem.thumbnail}" alt="${
      newsItem.title
    }">
    </div>
    <div class="news__content">
      <h2 class="news__title">${newsItem.title}</h2>
      <p class="news__description">${newsItem.description}</p>
      <div class="news__footer">
        <p class="news__author">${newsItem.author}</p>
        <p class="news__date">${formatDate(newsItem.timestamp)}</p>
      </div>
    </div>
`;
    newsContainer.appendChild(newsItemContent);
  });
};

// clean and add news
const cleanAndAddNews = () => {
  newsContainer.textContent = "";
  displayNews();
};

cleanAndAddNews();

// convert image into a string
uploadImage.addEventListener("change", (event) => {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    previewImage.src = reader.result;
    console.log("Image changed");
  });

  reader.readAsDataURL(event.target.files[0]);
});

// clean form after submit
const cleanForm = () => {
  form.reset();
  cleanAndAddNews();
  previewImage.src = "";
  window.scrollTo(0, 0);
  modal.style.display = "none";
  header.style.display = "block";
};

// enable publish button only when all fields are filled
publishBtn.disabled = true;

form.addEventListener("change", (event) => {
  const form =
    event.target.parentElement.parentElement.parentElement.parentElement;

  if (
    form.title.value === "" ||
    form.description.value === "" ||
    form.upload.value === ""
  ) {
    publishBtn.disabled = true;
  } else {
    publishBtn.disabled = false;
  }
});

// add news
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let today = new Date();
  const title = event.target.title.value;
  const description = event.target.description.value;

  newsArray.unshift({
    title: title,
    author: "Helcim Team",
    timestamp: today,
    thumbnail: previewImage.src,
    description: description,
  });

  swal({
    title: "Done!",
    text: "News has been published.",
    icon: "success",
    timer: 2500,
    button: false,
  });

  cleanForm();
});

// *MODAl*

// open modal
addNewBtn.onclick = () => {
  modal.style.display = "block";
  header.style.display = "none";
  modal.classList.add("modal__open");
};

// close modal
closeBtn.onclick = (event) => {
  event.preventDefault();

  if (
    form.title.value === "" &&
    form.description.value === "" &&
    form.upload.value === ""
  ) {
    modal.classList.remove("modal__add");
    modal.classList.add("modal__open");
    modal.style.display = "none";
    header.style.display = "block";
  } else {
    swal({
      title: "Save draft for later?",
      text: "If you don't save, your changes will be lost.",
      buttons: ["Don't Save", "Save"],
      buttons: {
        cancel: true,
        deny: {
          text: "Delete",
          value: "deny",
        },
        confirm: "Save draft",
      },
    }).then((result) => {
      console.log(result);
      if (result === true) {
        swal({
          title: "Done!",
          text: "Changes has been saved.",
          icon: "success",
          timer: 2300,
          button: false,
        });
        modal.style.display = "none";
        header.style.display = "block";
        editIconBtn.style.display = "flex";
        addIconBtn.style.display = "none";
        addNewBtn.style.backgroundColor = "#ffd494";
      } else if (result === "deny") {
        swal({
          title: "Not saved!",
          text: "Changes has not been saved.",
          icon: "info",
          button: false,
          timer: 2300,
        });

        editIconBtn.style.display = "none";
        addIconBtn.style.display = "flex";
        addNewBtn.style.backgroundColor = "#815af0";
        cleanForm();
      }
    });
  }
};
