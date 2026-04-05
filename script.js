const slider = document.querySelector('.items');

let isDown = false;
let startX = 0;
let scrollLeft = 0;

// Mouse down → start dragging
slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX;
  scrollLeft = slider.scrollLeft;
});

// Mouse up → stop dragging
document.addEventListener('mouseup', () => {
  isDown = false;
});

// Mouse move → drag (IMPORTANT: use document)
document.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  const walk = (e.pageX - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});