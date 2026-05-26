const text = "ONE OF THE LARGEST ASTRONOMY INITIATIVES IN SRI LANKA";
const textContainer = document.getElementById("text");
const logo = document.getElementById("logo");

const words = text.split(" ");

let delay = 0;

// Word by word animation
words.forEach((word, index) => {
  const span = document.createElement("span");
  span.classList.add("word");
  span.textContent = word;

  span.style.animationDelay = `${index * 0.3}s`;

  textContainer.appendChild(span);
});

// Show logo after text animation
setTimeout(() => {
  logo.style.opacity = "1";
  logo.style.transform = "translateY(0)";
}, words.length * 300 + 800);

// Redirect to home page after full animation
setTimeout(() => {
  window.location.href = "home.html";
}, words.length * 300 + 2500);