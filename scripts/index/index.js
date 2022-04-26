"use strict";
const newsContainer = document.querySelector(".news__container");
const header = document.querySelector(".header");

const modal = document.querySelector(".modal");
const addNewBtn = document.querySelector(".modal__button");
const editIconBtn = document.querySelector(".modal__button-edit");
const addIconBtn = document.querySelector(".modal__button-add");

const form = document.getElementById("form");
const description = document.querySelector(".form__description");
const closeBtn = document.querySelector(".form__buttons-close");
const publishBtn = document.querySelector(".form__buttons-publish");

const uploadImage = document.getElementById("upload");
const previewImage = document.getElementById("preview-image");
const closeImageIcon = document.querySelector(".form__preview-close");

newsArray.sort((a, b) => {
  return b.timestamp - a.timestamp;
});

// display news
const displayNews = () => {
  newsArray.forEach((newsItem) => {
    const newsItemContent = createElement("div", "news__item");
    newsItemContent.innerHTML = `
    <div class="news__thumbnail">
      ${
        newsItem.thumbnail
          ? `<img
        class="news__img"
        src="${newsItem.thumbnail}"
        alt=""
      />`
          : ""
      }
    </div>
    <div class="news__content">
      <div class="news__footer">
        <p class="news__author">${newsItem.author}</p>
        <p class="news__date">${formatDate(newsItem.timestamp)}</p>
      </div>
      <p class="news__description">${newsItem.description}</p>
      <div class="news__like">
        <button class="news__like-btn" type="button">
          <i class="fas fa-heart news__like-icon" aria-hidden="true"></i>
        </button>
        <p class="news__like-number">${newsItem.likes}</p>
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
  previewImage.style.visibility = "visible";
  closeImageIcon.style.visibility = "visible";
});

// close image
const closeImage = () => {
  previewImage.style.visibility = "hidden";
  closeImageIcon.style.visibility = "hidden";
  publishBtn.disabled = true;
  form.upload.value = "";
};

closeImageIcon.addEventListener("click", closeImage);

// clean form after submit
const cleanForm = () => {
  form.reset();
  cleanAndAddNews();
  closeImage();
  form.upload.value = "";
  window.scrollTo(0, 0);
  modal.style.display = "none";
  header.style.display = "block";
};

// enable publish button only when some data is entered
publishBtn.disabled = true;

form.addEventListener("keyup", (event) => {
  const form =
    event.target.parentElement.parentElement.parentElement.parentElement;

  if (form.description.value !== "") {
    publishBtn.disabled = false;
  } else {
    publishBtn.disabled = true;
  }
});

form.addEventListener("change", (event) => {
  const form =
    event.target.parentElement.parentElement.parentElement.parentElement;

  if (form.description.value !== "" || form.upload.value !== "") {
    publishBtn.disabled = false;
  } else {
    publishBtn.disabled = true;
  }
});

// add and remove like
const likeCounter = () => {
  const likeIcon = document.querySelectorAll(".news__like-icon");
  const likeNumber = document.querySelectorAll(".news__like-number");
  likeIcon.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      console.log("clicked");
      event.target.classList.toggle("liked");
      let isLiked = event.target.classList.contains("liked");
      if (!isLiked) {
        likeNumber.forEach((number) => {
          number.textContent = parseInt(number.textContent) - 1;
        });
      } else {
        likeNumber.forEach((number) => {
          number.textContent = parseInt(number.textContent) + 1;
        });
      }
    });
  });
};

likeCounter();

// add news
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let today = new Date();
  const description = event.target.description.value;

  newsArray.unshift({
    author: "Helcim Team",
    timestamp: today,
    thumbnail: previewImage.src,
    description: description,
    likes: 0,
  });

  swal({
    title: "Done!",
    text: "News has been published.",
    icon: "success",
    timer: 2500,
    button: false,
  });

  cleanForm();
  likeCounter();
});

// *MODAl*

// open modal
addNewBtn.onclick = () => {
  modal.style.display = "block";
  header.style.display = "none";
  modal.classList.add("modal__open");
  closeImage();
};

// close modal
closeBtn.onclick = (event) => {
  event.preventDefault();

  if (form.description.value === "" && form.upload.value === "") {
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
        confirm: "Save Draft",
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
        cleanForm();
        publishBtn.disabled = true;
      }
    });
  }
};
