const container = document.getElementById('container');
const cubes = document.querySelectorAll('.cube');

let isDragging = false;
let currentCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
    cube.addEventListener('mousedown', (e) => {
        isDragging = true;
        currentCube = cube;

        // 1. Switch to absolute positioning immediately upon click
        // This removes it from the grid and allows free movement
        currentCube.style.position = 'absolute';

        // 2. Calculate the Offset
        // We find where the mouse is relative to the top-left corner of the cube
        const rect = currentCube.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    });
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging || !currentCube) return;

    // Get dimensions of the container and the cube
    const containerRect = container.getBoundingClientRect();
    const cubeRect = currentCube.getBoundingClientRect();

    // Calculate new position relative to the container's top-left
    let newX = e.clientX - containerRect.left - offsetX;
    let newY = e.clientY - containerRect.top - offsetY;

    // --- BOUNDARY CONSTRAINTS ---
    // Clamp X (Left/Right)
    if (newX < 0) {
        newX = 0;
    } else if (newX > containerRect.width - cubeRect.width) {
        newX = containerRect.width - cubeRect.width;
    }

    // Clamp Y (Top/Bottom)
    if (newY < 0) {
        newY = 0;
    } else if (newY > containerRect.height - cubeRect.height) {
        newY = containerRect.height - cubeRect.height;
    }

    // Apply the coordinates
    currentCube.style.left = `${newX}px`;
    currentCube.style.top = `${newY}px`;
});

window.addEventListener('mouseup', () => {
    // Release the cube
    isDragging = false;
    currentCube = null;
});