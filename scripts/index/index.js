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

// generate today's date
let today = new Date();
let dd = today.getDate();
let mm = today.toLocaleString("default", { month: "long" });
let yyyy = today.getFullYear();
today = `${mm} ${dd}, ${yyyy}`;
console.log(today);

// open modal
addNewBtn.onclick = () => {
  modal.style.display = "block";
};

// close modal
closeBtn.onclick = () => {
  modal.style.display = "none";
};

// click outside modal to close
window.onclick = (event) => {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// convert image into a string
uploadImage.addEventListener("change", (event) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    previewImage.src = reader.result;
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
  swal({
    title: "Done!",
    text: "News has been published.",
    icon: "success",
    timer: 2500,
    button: false,
  });
};

// add news
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = event.target.title.value;
  const description = event.target.description.value;

  newsArray.unshift({
    title: title,
    author: "Helcim Team",
    timestamp: today,
    thumbnail: previewImage.src,
    description: description,
  });
  cleanForm();
});
