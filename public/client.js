// client-side js
// run by the browser each time your view template is loaded

console.log('hello world :o');
const c = document.getElementById("x")
const src = document.getElementById('src')

const socket = io('/collage'); 
socket.on('newsrc', function(data , x, y){
  console.log("socket!",data, x, y)
  draw2(data, x, y)
})

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

const ctx=c.getContext("2d");

const mwidth = 300
const gridwidth = 250

const poses = ['lo','mo','ro','lu','mu', 'ru'];

const places = Array(2).fill().map(()=>Array(3).fill());



places.map((py,iy) => {
    py.map((px,ix) => {
      const id = `${ix},${iy}`
      console.log(id)
      document.getElementById(id).addEventListener('click', e => {draw2(src.value, ix, iy ); console.log("drawing2")})
    })
  }
)

const center = places[0].length-1 / 2
let placesIdx = places[0].map((x,i) => i).sort((a,b) => { 
  // sort so that center is drawn in the end (center index at end of array)
  return a >= center-0.5 && a <= center+0.5 ? -99 : b >= center-0.5 && b <= center+0.5 ? 99 : 99 
})


function draw2(src, ix, iy ,w = 1, h = 1){
  places[iy][ix] = {src, ix, iy,w, h}
  drawAll()
}

function drawAll(){
  ctx.clearRect(0, 0, c.width, c.height);
  
  places.map((py,iy) => {
    placesIdx.map(i => {if (py[i]) drawIt(py[i])} )
  })
}

function drawIt(item) {
  console.log(item.ix,item.iy)
  item.x = gridwidth/2 + (item.ix * gridwidth)
  item.y = gridwidth/2 + (item.iy * gridwidth)
  const totalgridw = places.length * gridwidth
  if (!item.rt ) {
    item.rt = -(totalgridw - item.x) / 10  + getRandomArbitrary(-45, 45)
  }
  if(!item.mw){
    item.mw = mwidth + getRandomArbitrary(-30, 30)
  }
  console.log("drawIt item", item)
  
  drawImage2(item) 
}

function draw1(src, pos) {
  console.log("draw?",src, pos)
  
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


function drawImage (src, x, y , mw , rt = 0){
  drawImage2({src, x, y , mw , rt })
}
  
function drawImage2 (item){
  
  
  const base_image = new Image();
  base_image.src = item.src
  base_image.onload = function(){
    const l = item.mw 
    const ratioside = base_image.height < base_image.width ? base_image.height : base_image.width
    const ratio = l / ratioside 
    const h = ratioside === base_image.height ? l : base_image.height * ratio
    const w = ratioside === base_image.width ? l : base_image.width * ratio
    console.log("sides",base_image.height,base_image.width, ratioside,w,h,src)
    ctx.save()
    ctx.translate(item.x,item.y)
    ctx.rotate((item.rt) * Math.PI/180);
    ctx.translate(-w/2 - 30,-h/2 -  30);
    ctx.drawImage(base_image, 0,0 , w, h);
    ctx.restore()
  }
  
}

