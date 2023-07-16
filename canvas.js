// var canvas = document.querySelector('canvas');
// fitToContainer(canvas);
// var canvas = document.getElementById('page1');
// var canvas2 = document.getElementById('page2');
// fitToContainer(canvas);
// fitToContainer(canvas2);

// var ctx = canvas.getContext('2d');
// var ctx2 = canvas2.getContext('2d');

/*
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

const FirstPage = document.getElementById('First_Page');
const ctx = FirstPage.getContext('2d');
fitToContainer(FirstPage);

console.log(ctx);

class Particle
{
	constructor(effect)
	{
		this.effect = effect;
		this.radius = Math.floor(Math.random() * 10 + 1);
		this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
		this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
		this.vx = Math.random() * 1 - 0.5;
		this.vy = Math.random() * 1 - 0.5;
		this.pushX = 0;
		this.pushY = 0;
		this.friction = 0.95;
	}
	
	draw(context)
	{
		const gradient = ctx.createLinearGradient(0, 0, FirstPage.width, FirstPage.height);
		gradient.addColorStop(0, 'white');
		gradient.addColorStop(0.5, 'gold');
		gradient.addColorStop(1, 'orangered');
		ctx.fillStyle = gradient;
		context.beginPath();
		context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		context.fill();
	}
	
	update()
	{
		/*
		if (this.effect.mouse.pressed)
		{
			const dx = this.x - this.effect.mouse.x;
			const dy = this.y - this.effect.mouse.y;
			const distance = Math.hypot(dx, dy);
			const force = (this.effect.mouse.radius / distance);
			if (distance < this.effect.mouse.radius)
			{
				const angle = Math.atan2(dy, dx);
				this.pushX += Math.cos(angle) * force;
				this.pushY += Math.sin(angle) * force;
			}
		}
		*/
		
		this.x += (this.pushX *= this.friction) + this.vx;
		this.y += (this.pushY *= this.friction) + this.vy;
		
		if		(this.x < this.radius)
		{
			this.x = this.radius;
			this.vx *= -1;
		}
		else if (this.x > this.effect.width - this.radius)
		{
			this.x = this.effect.width - this.radius;
			this.vx *= -1;
		}
		
		if		(this.y < this.radius)
		{
			this.y = this.radius;
			this.vy *= -1;
		}
		else if (this.y > this.effect.height - this.radius)
		{
			this.y = this.effect.height - this.radius;
			this.vy *= -1;
		}
	}
	
	reset()
	{
		this.x = this.radius + Math.random() * (this.effect.width - this.radius * 2);
		this.y = this.radius + Math.random() * (this.effect.height - this.radius * 2);
	}
}

class Effect
{
	constructor(canvas, context)
	{
		this.canvas = canvas;
		this.context = context;
		this.width = this.canvas.width;
		this.height = this.canvas.height;
		this.particles = [];
		this.numberOfParticles = 300;
		this.createParticles();
		
		/*
		this.mouse =
		{
			x: 0,
			y: 0,
			pressed: false,
			radius: 200
		}
		
		window.addEventListener('resize', e =>
		{
			this.resize(e.target.window.innerWidth,
						e.target.window.innerHeight)
		});
		
		window.addEventListener('mousemove', e =>
		{
			if (this.mouse.pressed)
			{
				this.mouse.x = e.x;
				this.mouse.y = e.y;
			}
		});
		
		window.addEventListener('mousedown', e =>
		{
			this.mouse.pressed = true;
			this.mouse.x = e.x;
			this.mouse.y = e.y;
		});
		
		window.addEventListener('mouseup', e =>
		{
			this.mouse.pressed = false;
		});
		*/
	}
	
	createParticles()
	{
		for (let i = 0; i < this.numberOfParticles; i++)
		{
			this.particles.push(new Particle(this));
		}
	}
	
	handleParticles(context)
	{
		context.fillStyle = "#000000";
		context.fillRect(0, 0, FirstPage.width, FirstPage.height);
		context.strokeStyle = 'white';
		this.connectParticles(context);
		this.particles.forEach(particle =>
		{
			particle.draw(context);
			particle.update();
		});
	}
	
	connectParticles(context)
	{
		const maxDistance = 80;
		for (let a = 0; a < this.particles.length; a++)
		{
			for (let b = a; b < this.particles.length; b++)
			{
				const dx = this.particles[a].x - this.particles[b].x;
				const dy = this.particles[a].y - this.particles[b].y;
				const distance = Math.hypot(dx, dy);
				if (distance < maxDistance)
				{
					context.save();
					const opacity = 1 - (distance / maxDistance);
					context.globalAlpha = opacity;
					context.beginPath();
					context.moveTo(this.particles[a].x, this.particles[a].y);
					context.lineTo(this.particles[b].x, this.particles[b].y);
					context.stroke();
					context.restore();
				}
			}
		}
	}
	
	/*
	resize(width, height)
	{
		this.canvas.width = width;
		this.canvas.height = height;
		this.width = width;
		this.height = height;
		const gradient = this.context.createLinearGradient(0, 0, width, height);
		gradient.addColorStop(0, 'white');
		gradient.addColorStop(0.5, 'gold');
		gradient.addColorStop(1, 'orangered');
		this.context.fillStyle = gradient;
		this.context.strokeStyle = 'white';
		this.particles.forEach(particle =>
		{
			particle.reset();
		});
	}
	*/
}

const effect = new Effect(FirstPage, ctx);

function animate()
{
	effect.handleParticles(ctx);
	ctx.fillStyle = "#FF00FF";
	ctx.font = "bold 80px sans-serif";
	ctx.fillText("Created by Eric", FirstPage.width / 8, 200);
	const color = ctx.createLinearGradient(0, 0, FirstPage.width, 0);
	color.addColorStop(0, 'red');
	color.addColorStop(1, 'blue');
	ctx.fillStyle = color;
	ctx.font = "bold 50px sans-serif";
	ctx.fillText("What can you do with this tool?", FirstPage.width / 8 - 70, 500);
	ctx.fillStyle = "#FFFFFF";
	ctx.font = "bold 80px sans-serif";
	ctx.fillText("LET's FIND OUT!", FirstPage.width / 10, 700);
	requestAnimationFrame(animate);
}
animate();

function fitToContainer(canvas)
{
  // Make it visually fill the positioned parent
  canvas.style.width ='100%';
  canvas.style.height='100%';
  // ...then set the internal size to match
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
