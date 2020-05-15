// Start game on click on start button

document.addEventListener("click", (event) => {
  //Check if start button was clicked
  if (!event.target.classList.contains("start")) return;

  const blocks = document.querySelectorAll(".game-grid__block");
});
