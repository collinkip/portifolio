const image=document.getElementsByClassName("image");

let globalIndex=0;
let last={x:0,y:0};
const activate=(image,x,y)=>{
 image.style.left=`${x}px`;
 image.style.top=`${y}px`;
 image.dataset.status="active";
 last={x,y};
 console.log(x,y);
}
const distanceFromLast=(x,y)=>{
 return Math.hypot(x-last.x,y-last.y);
}
window.onmousemove=e=>{
 if (distanceFromLast(e.clientX,e.clientY)>100){
  const lead=image[globalIndex % image.length],
      tail=image[(globalIndex-5) % image.length];
  activate(lead,e.clientX,e.clientY);
  if (tail)tail.dataset.status="inactive";
  globalIndex++;
 }
}

