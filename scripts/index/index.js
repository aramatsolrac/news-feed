"use strict";

const newsContainer = document.querySelector(".news-container");
const form = document.getElementById("form");
const title = document.querySelector(".add-news__title");
const description = document.querySelector(".add-news__description");
const uploadImage = document.getElementById("upload");
const previewImage = document.getElementById("preview-image");
const modal = document.querySelector(".add-news__modal");
const addNewBtn = document.querySelector(".add-news__button");
const closeBtn = document.querySelector(".add-news__close");
const header = document.querySelector(".header");
const publishBtn = document.querySelector(".add-news__publish");
const editBtn = document.querySelector(".add-news__button-edit");
const addBtn = document.querySelector(".add-news__button-add");

console.log(newsArray);

// display news
const displayNews = () => {
  newsArray.forEach((newsItem) => {
    const newsItemContent = createElement("div", "news-item");
    newsItemContent.innerHTML = `
    <div class="news-item-thumbnail">
        <img src="${newsItem.thumbnail}" alt="${newsItem.title}">
    </div>
    <h2>${newsItem.title}</h2>
    <p>${newsItem.description}</p>
    <p class="news-item-author">${newsItem.author}</p>
    <p>${formatDate(newsItem.timestamp)}</p>
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
};

// close modal
closeBtn.onclick = (event) => {
  console.log(form);
  if (
    form.title.value === "" &&
    form.description.value === "" &&
    form.upload.value === ""
  ) {
    modal.style.display = "none";
    header.style.display = "block";
  } else {
    editBtn.style.display = "flex";
    addBtn.style.display = "none";
    swal({
      title: "Do you want to save your changes and edit them later?",
      text: "If you don't save, your changes will be lost.",
      buttons: ["Don't Save", "Save"],
      buttons: {
        cancel: true,
        deny: {
          text: "Don't save",
          value: "deny",
        },
        confirm: "Save",
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
      } else if (result === "deny") {
        swal({
          title: "Not saved!",
          text: "Changes has not been saved.",
          icon: "info",
          button: false,
          timer: 2300,
        });
        modal.style.display = "none";
        header.style.display = "block";
        editBtn.style.display = "none";
        addBtn.style.display = "flex";
        cleanForm();
      }
    });
  }
};
