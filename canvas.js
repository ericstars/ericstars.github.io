// var canvas = document.querySelector('canvas');
// fitToContainer(canvas);
var canvas = document.getElementById('page1');
var canvas2 = document.getElementById('page2');
fitToContainer(canvas);
fitToContainer(canvas2);

var ctx = canvas.getContext('2d');
var ctx2 = canvas2.getContext('2d');

ctx.fillStyle = "#009578";
ctx.font = "bold 100px sans-serif";
ctx.fillText("Hello World!", 10, 100);

let positionX = canvas.width / 2;
let positionY = canvas.height / 2;
let angle = 0;

function drawFlower()
{
	ctx.fillStyle = 'red';
	ctx.strokeStyle = 'blue';
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.arc(positionX, positionY, 20, 0, Math.PI * 2);
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
}

function animate()
{
	// draw each frame
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	positionX += 5 * Math.sin(angle);
	positionY += 5 * Math.cos(angle);
	angle += 0.1;
	
	drawFlower();
	requestAnimationFrame(animate);
}
animate();

/*
// ctx.fillStyle = "#FF0000";
// ctx.fillRect(-1, -1, 800, 1130);
ctx.fillStyle = "#009578";
ctx.font = "bold 100px sans-serif";
ctx.fillText("Hello World!", 10, 100);

ctx.beginPath();
ctx.moveTo(50, 200);
ctx.lineTo(150, 200);
ctx.closePath();
ctx.stroke();

ctx.beginPath();
ctx.arc(canvas.width / 2, canvas.height / 2, 200, 0, Math.PI * 2);
ctx.stroke();

ctx2.fillRect(-1, -1, 800, 1130);
ctx2.fillStyle = "#009578";
ctx2.font = "bold 100px sans-serif";
ctx2.fillText("Page 2", 10, 100);

console.log(canvas);
*/
function fitToContainer(canvas)
{
  // Make it visually fill the positioned parent
  canvas.style.width ='100%';
  canvas.style.height='100%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}