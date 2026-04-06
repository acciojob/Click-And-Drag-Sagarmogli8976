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

        // 1. Change position to absolute so it can move freely outside the grid
        currentCube.style.position = 'absolute';

        // 2. Get the current position of the cube relative to the container
        const rect = currentCube.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        // 3. Calculate the offset (where exactly inside the cube the user clicked)
        // This prevents the cube from "jumping" to the top-left corner
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;
    });
});

// We attach mousemove and mouseup to the window/document 
// so the drag doesn't break if the mouse moves faster than the element
window.addEventListener('mousemove', (e) => {
    if (!isDragging || !currentCube) return;

    const containerRect = container.getBoundingClientRect();
    const cubeRect = currentCube.getBoundingClientRect();

    // Calculate new position relative to the container
    let newX = e.clientX - containerRect.left - offsetX;
    let newY = e.clientY - containerRect.top - offsetY;

    // --- BOUNDARY CONSTRAINTS ---
    // Prevent moving left of 0
    if (newX < 0) newX = 0;
    // Prevent moving right of container width minus cube width
    if (newX > containerRect.width - cubeRect.width) {
        newX = containerRect.width - cubeRect.width;
    }
    // Prevent moving top of 0
    if (newY < 0) newY = 0;
    // Prevent moving bottom of container height minus cube height
    if (newY > containerRect.height - cubeRect.height) {
        newY = containerRect.height - cubeRect.height;
    }

    // Apply the calculated position
    currentCube.style.left = `${newX}px`;
    currentCube.style.top = `${newY}px`;
});

window.addEventListener('mouseup', () => {
    isDragging = false;
    currentCube = null;
});