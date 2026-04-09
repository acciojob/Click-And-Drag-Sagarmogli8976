/* =========================
   CUBE DRAG LOGIC
========================= */

const cubes = document.querySelectorAll('.cube');
const arena = document.getElementById('arena');
const hint = document.getElementById('hint');

const CUBE_SIZE = 64;

cubes.forEach((cube, index) => {
  cube.style.left = (index % 3) * 80 + "px";
  cube.style.top  = Math.floor(index / 3) * 80 + "px";

  let offsetX, offsetY, isDragging = false;

  cube.addEventListener('mousedown', (e) => {
    cube.classList.add('dragging');

    offsetX = e.clientX - cube.offsetLeft;
    offsetY = e.clientY - cube.offsetTop;
    isDragging = false;

    function onMouseMove(e) {
      isDragging = true;

      let x = e.clientX - offsetX;
      let y = e.clientY - offsetY;

      // Clamp inside arena
      x = Math.max(0, Math.min(x, arena.clientWidth - CUBE_SIZE));
      y = Math.max(0, Math.min(y, arena.clientHeight - CUBE_SIZE));

      cube.style.left = x + "px";
      cube.style.top  = y + "px";
    }

    function onMouseUp() {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      cube.classList.remove('dragging');

      if (isDragging) {
        hint.textContent = `dropped at (${cube.offsetLeft}, ${cube.offsetTop})`;
      } else {
        hint.textContent = `clicked`;
      }
    }

    // ✅ Important for Cypress
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });
});


/* =========================
   SCROLL DRAG (.items)
========================= */

const slider = document.querySelector('.items');

if (slider) {
  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;

    e.preventDefault();

    const x = e.pageX - slider.offsetLeft;
    const walk = x - startX;

    slider.scrollLeft = scrollLeft - walk;
  });
}