const container = document.querySelector('.items');

let isDown = false;
let startX;
let scrollLeft;

container.addEventListener('mousedown', (e) => {
    isDown = true;
    container.classList.add('active');
    
    // Get the initial mouse position
    startX = e.pageX - container.offsetLeft;
    // Get the current scroll position
    scrollLeft = container.scrollLeft;
});

window.addEventListener('mousemove', (e) => {
    if (!isDown) return; // Stop function if mouse is not pressed
    
    e.preventDefault();
    
    // Calculate how far the mouse has moved
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 to make scrolling faster
    
    // Update the scrollLeft position
    container.scrollLeft = scrollLeft - walk;
});

window.addEventListener('mouseup', () => {
    isDown = false;
    container.classList.remove('active');
});