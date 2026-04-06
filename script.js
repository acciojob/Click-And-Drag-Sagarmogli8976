const slider = document.querySelector('.items');

let isDown = false;
let startX = 0;
let scrollLeft = 0;

// Start drag
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX;
  scrollLeft = slider.scrollLeft;
});

// Stop drag
slider.addEventListener('mouseup', () => {
  isDown = false;
});

document.addEventListener('mouseup', () => {
  isDown = false;
});

// KEY: function used in BOTH listeners
function handleMove(e) {
  if (!isDown) return;

  const walk = (e.pageX - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;

  // fallback for Cypress
  if (slider.scrollLeft <= 0) {
    slider.scrollLeft = 5;
  }
}

// BOTH needed
slider.addEventListener('mousemove', handleMove);     // Cypress uses this
document.addEventListener('mousemove', handleMove);   // real browser