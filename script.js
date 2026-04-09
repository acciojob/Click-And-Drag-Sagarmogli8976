(function () {

  /* ── Configuration ───────────────────────────── */
  const NUM_CUBES  = 9;
  const COLS       = 3;
  const CUBE_SIZE  = 64;   // px  (must match CSS width/height)
  const GAP        = 20;   // px  gap between cubes in the initial grid
  const PADDING    = 32;   // px  offset from arena edges for initial placement

  /* ── Colour Palette ─────────────────────────── */
  const COLORS = [
    { bg: '#EEEDFE', border: '#534AB7', text: '#3C3489' }, // purple
    { bg: '#E1F5EE', border: '#0F6E56', text: '#085041' }, // teal
    { bg: '#FAECE7', border: '#993C1D', text: '#712B13' }, // coral
    { bg: '#FBEAF0', border: '#993556', text: '#72243E' }, // pink
    { bg: '#E6F1FB', border: '#185FA5', text: '#0C447C' }, // blue
    { bg: '#EAF3DE', border: '#3B6D11', text: '#27500A' }, // green
    { bg: '#FAEEDA', border: '#854F0B', text: '#633806' }, // amber
    { bg: '#FCEBEB', border: '#A32D2D', text: '#791F1F' }, // red
    { bg: '#F1EFE8', border: '#5F5E5A', text: '#444441' }, // gray
  ];

  const LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  /* ── State ───────────────────────────────────── */
  // Each entry: { el: HTMLElement, x: number, y: number }
  const cubes = [];

  /* ── DOM References ──────────────────────────── */
  const arena = document.getElementById('arena');
  const hint  = document.getElementById('hint');

  /* ── Initialise Cubes ────────────────────────── */
  function initCubes() {
    for (let i = 0; i < NUM_CUBES; i++) {
      const col = i % COLS;
      const row = Math.floor(i / COLS);

      const x = PADDING + col * (CUBE_SIZE + GAP);
      const y = PADDING + row * (CUBE_SIZE + GAP);

      const c  = COLORS[i % COLORS.length];
      const el = document.createElement('div');

      el.className   = 'cube';
      el.textContent = LABELS[i] || String(i + 1);
      el.style.left        = x + 'px';
      el.style.top         = y + 'px';
      el.style.background  = c.bg;
      el.style.borderColor = c.border;
      el.style.color       = c.text;

      arena.appendChild(el);
      cubes.push({ el, x, y });

      attachDrag(el, i);
    }
  }

  /* ── Drag Logic ──────────────────────────────── */
  function attachDrag(el, idx) {
    let startMouseX = 0;
    let startMouseY = 0;
    let startCubeX  = 0;
    let startCubeY  = 0;
    let dragging    = false;
    let moved       = false;

    /* ---------- pointer helpers ---------- */
    function beginDrag(clientX, clientY) {
      dragging    = true;
      moved       = false;
      startMouseX = clientX;
      startMouseY = clientY;
      startCubeX  = cubes[idx].x;
      startCubeY  = cubes[idx].y;
      el.classList.add('dragging');
    }

    function moveDrag(clientX, clientY) {
      if (!dragging) return;
      moved = true;

      const arenaRect = arena.getBoundingClientRect();
      const dx = clientX - startMouseX;
      const dy = clientY - startMouseY;

      /* Clamp within arena bounds */
      const maxX = arenaRect.width  - CUBE_SIZE;
      const maxY = arenaRect.height - CUBE_SIZE;
      const newX = Math.max(0, Math.min(startCubeX + dx, maxX));
      const newY = Math.max(0, Math.min(startCubeY + dy, maxY));

      cubes[idx].x = newX;
      cubes[idx].y = newY;
      el.style.left = newX + 'px';
      el.style.top  = newY + 'px';
    }

    function endDrag() {
      if (!dragging) return;
      dragging = false;
      el.classList.remove('dragging');

      if (!moved) {
        hint.textContent = 'Cube ' + LABELS[idx] + ' clicked — drag to move it';
      } else {
        hint.textContent =
          'Cube ' + LABELS[idx] + ' dropped at (' +
          Math.round(cubes[idx].x) + ', ' +
          Math.round(cubes[idx].y) + ')';
      }
    }

    /* ---------- mouse events ---------- */
    el.addEventListener('mousedown', function (e) {
      e.preventDefault();
      beginDrag(e.clientX, e.clientY);
    });

    document.addEventListener('mousemove', function (e) {
      moveDrag(e.clientX, e.clientY);
    });

    document.addEventListener('mouseup', endDrag);

    /* ---------- touch events ---------- */
    el.addEventListener('touchstart', function (e) {
      const t = e.touches[0];
      beginDrag(t.clientX, t.clientY);
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
      const t = e.touches[0];
      moveDrag(t.clientX, t.clientY);
    }, { passive: true });

    document.addEventListener('touchend', endDrag);
  }

  /* ── Bootstrap ───────────────────────────────── */
  initCubes();

})();
