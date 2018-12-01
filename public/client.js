// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');
const c = document.getElementById("x")

const socket = io('/collage'); 
socket.on('newsrc', function(data , place){
  console.log("socket!",data, place)
  draw(data, place)
})

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const ctx=c.getContext("2d");

const mwidth = 300

const poses = ['lo','mo','ro','lu','mu', 'ru'];

poses.map(p => {
    document.getElementById(p).addEventListener('click', e => draw(src.value, p ))
  }
)

function draw(src, pos) {
  if (pos === "lo"){
    drawImage(
      src,125,125,
      mwidth, -20) 
  }
  if (pos === "mo"){
    drawImage(
      src,375,125,
      mwidth) 
  }
  if (pos === "ro"){
    drawImage(
      src,625,125,
      mwidth, 20) 
  }
  if (pos === "lu"){
    drawImage(
      src,125,375,
      mwidth, -20) 
  }
  if (pos === "mu"){
    drawImage(
      src,375,375,
      mwidth) 
  }
  if (pos === "ru"){
    drawImage(
      src,625,375,
      mwidth ,20) 
  }
  
  
}

const src = document.getElementById('src')



function drawImage (src, x, y , mw , rt = 0){
  
  const base_image = new Image();
  base_image.src = src
  base_image.onload = function(){
    const w = mw + getRandomArbitrary(-30, 30) 
    const ratio = w / base_image.width 
    const h = base_image.height * ratio
    ctx.save()
    ctx.translate(x,y)
    ctx.rotate((getRandomArbitrary(-45, 45) + rt) * Math.PI/180);
    ctx.translate(-w/2 - 30,-h/2 -  30);
    ctx.drawImage(base_image, 0,0 , w, h);
    ctx.restore()
  }
  
}

/*
drawImage(
  "https://www.valuewalk.com/wp-content/uploads/2018/11/donald_trump_1543329853-783x1024.png",
  0,0,
  250)

setTimeout( () => 
drawImage(
  "https://www.valuewalk.com/wp-content/uploads/2018/11/donald_trump_1543329853-783x1024.png",
  50,50,
  100) , 1000)*/