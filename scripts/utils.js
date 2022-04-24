"use strict";
// utility to build DOM elements with classes and text content
function createElement(element, className = null, text = null) {
  const newElement = document.createElement(element);
  if (text) newElement.textContent = text;
  if (className) newElement.classList.add(className);
  return newElement;
}

// utility to format date
function formatDate(date) {
  const options = {
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone: "UTC",
  };

  return new Date(Number(date)).toLocaleDateString("en-US", options);
}
