// Match the class name expected by the test
const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.cube');

let isDragging = false;
let currentCube = null;
let offsetX = 0;
let offsetY = 0;

cubes.forEach(cube => {
    cube.addEventListener('mousedown', (e) => {
        isDragging = true;
        currentCube = cube;

        // Change to absolute to allow free movement
        currentCube.style.position = 'absolute';

        const rect = currentCube.getBoundingClientRect();
        
        // Calculate where the user clicked inside the cube to prevent "jumping"
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    });
});

window.addEventListener('mousemove', (e) => {
    if (!isDragging || !currentCube) return;

    const containerRect = container.getBoundingClientRect();
    const cubeRect = currentCube.getBoundingClientRect();

    // Calculate new position relative to the container boundaries
    let newX = e.clientX - containerRect.left - offsetX;
    let newY = e.clientY - containerRect.top - offsetY;

    // --- BOUNDARY CONSTRAINTS ---
    // Left boundary
    if (newX < 0) newX = 0;
    // Right boundary
    if (newX > containerRect.width - cubeRect.width) {
        newX = containerRect.width - cubeRect.width;
    }
    // Top boundary
    if (newY < 0) newY = 0;
    // Bottom boundary
    if (newY > containerRect.height - cubeRect.height) {
        newY = containerRect.height - cubeRect.height;
    }

    // Update the position of the cube
    currentCube.style.left = `${newX}px`;
    currentCube.style.top = `${newY}px`;
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    currentCube = null;
});