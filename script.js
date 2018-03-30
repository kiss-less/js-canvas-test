//Declaring variables
var hardcore = false;
var GameMode = "Normal";
var score = 0;
var canvas = document.getElementById("field");
var ctx = canvas.getContext("2d");
var ballRadius=10;
var ballColor="#0033FF";
var x=canvas.width/2;
var y=canvas.height-30;
var lives=3;
var dx=2;
var dy=-2;
var paddleHeight=10;
var paddleWidth=65;
var paddleX=(canvas.width-paddleWidth)/2;
var paddleColor = "#000000";
var rightPressed= false;
var leftPressed=false;
var brickRowCount = 3;
var brickColumnCount = 6;
var brickWidth = 62;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
//Controls setup
document.addEventListener("keydown",keyDownHandler,false);
document.addEventListener("keyup",keyUpHandler,false);
document.addEventListener("mousemove", mouseMoveHandler, false);
//Functions
function mouseMoveHandler(e){
	var relativeX = e.clientX - canvas.offsetLeft;
	if(relativeX-paddleWidth/2 > 0 && relativeX+paddleWidth/2 < canvas.width) {
		paddleX = relativeX - paddleWidth/2;
	}
}
//Bricks array
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
         bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
//Returns a string with hex of a randomly generated color
function randomColor(){
	var rnd = 0;
	var color = '';
	for (var x = 0; x < 6; x++){
		rnd = Math.floor(Math.random() * 15);
		color += rnd.toString(16);
	}	
	return "#"+color;
}

function keyDownHandler(e){
	if(e.keyCode==39){
		
		rightPressed=true;
		
		}
		else if(e.keyCode==37){
		
		leftPressed=true;
		
		}
		
	}
	
function keyUpHandler(e){
	
	if(e.keyCode==39){
		
		rightPressed=false;
	}
	else if(e.keyCode==37){
		
		leftPressed=false;
		
		}
	}
//Draw functions
function drawBall(){
	ctx.beginPath();
	ctx.arc(x,y,ballRadius,0,2*Math.PI);
	ctx.fillStyle=ballColor;
	ctx.fillStroke=ballColor;
	ctx.Stroke="10"
	ctx.fill();
	ctx.closePath();
	}

function drawPaddle(){
	ctx.beginPath();
	ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight);
	ctx.fillStyle=paddleColor;
	ctx.fill();
	ctx.closePath();
	}
	
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
//Detects collisions, changes a ball's direction and counting score
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1) {
                if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                    dy = -dy;
					ballColor = randomColor();
                    b.status = 0;
					if (hardcore == true){
					score = score + 3;
					} else {
					score++;	
					}
					if(hardcore == false && score == brickRowCount*brickColumnCount) {
                        alert("You win! Your score is "+score+". But it was a piece of cake, right? Try out a hardcore mode!");
                        document.location.reload();
					} else if(hardcore == true && score >= brickRowCount*brickColumnCount*3){
						alert("You win! Your score is "+score+" pure hardcore points! Nice one mate!");
                        document.location.reload();
					}
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score+"                         Mode: "+GameMode, 8, 20);
}

function drawLives() {
	ctx.font = "16px Arial";
	ctx.fillStyle = "#0095DD";
	ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw(){
	ctx.clearRect(0,0,canvas.width,canvas.height);
	drawBricks();
	drawBall();
	drawPaddle();
	drawScore();
	drawLives();
	collisionDetection();
 if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
		ballColor = randomColor();
    }
    if(y + dy < ballRadius) {
        dy = -dy;
		ballColor = randomColor();
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
			 if(y= y-paddleHeight){
				 if (hardcore == true){
						dy++;	 
				 }
            dy = -dy  ;
			ballColor = randomColor();
			 }
        }
        else {
            lives--;
			if(!lives) {
				alert("Game Over!");
				document.location.reload();
			}
			else {
				x = canvas.width/2;
				y = canvas.height-30;
				dx = 2;
				dy = -2;
				paddleX = (canvas.width-paddleWidth)/2;
			}
        }
    }
	if(rightPressed && paddleX<canvas.width-paddleWidth){
		
		paddleX+=7;
		}
	 else if(leftPressed && paddleX>0 ){
		 paddleX-=7;
		 
		 }
		 
		 x=x+dx;
	     y=y+dy;
		 requestAnimationFrame(draw);
	}
function start(mode){
	if (mode == "Hard")
	{
		GameMode = "Hardcore!";
		hardcore = true;
		paddleWidth=50;
		lives=1;
	} else {
		GameMode = "Normal";
		hardcore = false;
	}
	var elem1 = document.getElementById("beginN");
	var elem2 = document.getElementById("beginH");
	elem1.parentNode.removeChild(elem1);
	elem2.parentNode.removeChild(elem2);
	draw();
}
drawPaddle();
drawBall();
drawBricks();