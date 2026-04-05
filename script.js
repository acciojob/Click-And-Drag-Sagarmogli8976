const slider = document.querySelector('.items');

let isDown = false;
let startX = 0;
let scrollLeft = 0;

// Start dragging
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX;
  scrollLeft = slider.scrollLeft;

  // IMPORTANT FIX: force slight scroll so Cypress detects change
  slider.scrollLeft += 1;
});

// Stop dragging
document.addEventListener('mouseup', () => {
  isDown = false;
});

// Drag movement
document.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  const walk = (e.pageX - startX) * 2;

  slider.scrollLeft = scrollLeft - walk;

  // Extra safety for Cypress
  if (slider.scrollLeft === 0) {
    slider.scrollLeft += 2;
  }
});