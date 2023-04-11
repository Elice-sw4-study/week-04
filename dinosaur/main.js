var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img1 = new Image();
img1.src = 'dino.png';


//공룡
var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,

    draw() {
        ctx.fillStyle = 'green';
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(img1, this.x, this.y);
    }
}

var img2 = new Image();
img2.src = 'cactus.png';

//장애물
class Cactus {
    constructor(){
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }

    draw(){
        ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height); - 네모 사이즈가 hitbox
        ctx.drawImage(img2, this.x, this.y);
    }
}



var timer = 0;
var cactuses = []; //생성된 장애물 담는 배열
var jump_timer = 0; //공룡 점프 멈출 시간
var animation;

function moveDino(){
    //실행횟수는 모니터 FPS에 따라 다름
    animation = requestAnimationFrame(moveDino);
    timer ++;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //2D게임 장애물들이 다가오게 만들면 앞으로 움직이는 효과
    //120프레임마다 장애물 생성
    if (timer % 180 === 0) {
        var cactus = new Cactus();
        cactuses.push(cactus);
    }
    
    cactuses.forEach((a, i, o) => {
        //화면 밖으로 나간 장애물 제거
        if (a.x < 0) {
            o.splice(i, 1);
        }
        a.x --;

        //충돌 체크
        crash_chk(dino, a);

        a.draw();
    })

    //공룡 점프
    if (jump_button == true) {
        dino.y --;
        jump_timer ++;
    }
    else {
        if(dino.y < 200) {
            dino.y ++;
        }
    }

    //100프레임 지나면 점프 그만하기
    if (jump_timer > 100) {
        jump_button = false;
        jump_timer = 0;
    }

    dino.draw()
}

moveDino();



//충돌 체크
function crash_chk(dino, cactus){
    var x_gap = cactus.x - (dino.x + dino.width); //x축 차이
    var y_gap = cactus.y - (dino.y + dino.height); //y축 차이

    if (x_gap < 0 && y_gap < 0){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animation);
    }

}




var jump_button = false;
document.addEventListener('keydown', function(e){
    if (e.code === 'Space'){
        jump_button = true;
    }
})