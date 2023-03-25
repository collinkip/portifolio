//Image slider Section
const track = document.getElementById("image-track");
let percentage = 0;
let mouseDownAt = 0;
let currentPosition = 0;

window.onmousedown = (e) => {
  mouseDownAt = e.clientX;
  currentPosition = percentage;
  window.onmousemove = (e) => {
    if (mouseDownAt === 0) return;
    const mouseDelta = parseFloat(mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;
    percentage = ((mouseDelta / maxDelta) * -100) + currentPosition;
    track.style.transform = `translate(${percentage}%, -50%)`;
    console.log(maxDelta + " " + percentage);
    for (const image of track.getElementsByClassName("image-slider")) {
      image.style.objectPosition = `${percentage}% 50%`;
    }
  };
};

window.onmouseup = () => {
  console.log("mouse is up");
  window.onmousemove = null;
  track.dataset.mouseDownAt = 0;
};

track.addEventListener('transitionend', () => {
  track.dataset.prevPercentage = percentage;
});


// Mouse tracking section
const image = document.getElementsByClassName("image");
let globalIndex = 0;
let last = { x: 0, y: 0 };
const activate = (image, x, y) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.dataset.status = "active";
  last = { x, y };
}
const distanceFromLast = (x, y) => {
  return Math.hypot(x - last.x, y - last.y);
}
window.onmousemove = e => {
  if (distanceFromLast(e.clientX, e.clientY) > 100) {
    const lead = image[globalIndex % image.length],
      tail = image[(globalIndex - 5) % image.length];
    activate(lead, e.clientX, e.clientY);
    if (tail) tail.dataset.status = "inactive";
    globalIndex++;
  }
}
