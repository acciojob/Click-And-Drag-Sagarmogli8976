const container = document.querySelector('.items');

let isDown = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
    isDown = true;
    
    // Record the starting X position of the mouse
    startX = e.pageX; 
    
    // Record the current scroll position of the container
    scrollLeft = container.scrollLeft;
});

window.addEventListener('mousemove', (e) => {
    if (!isDown) return;

    // Calculate how far the mouse has moved from the start point
    // If mouse moves left, (e.pageX - startX) is negative
    const walk = e.pageX - startX;
    
    // To scroll right when moving mouse left, we subtract the walk
    // Example: 0 - (-222) = 222 (scrollLeft increases)
    container.scrollLeft = scrollLeft - walk;
});

window.addEventListener('mouseup', () => {
    isDown = false;
});