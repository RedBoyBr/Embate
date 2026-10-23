const screen = document.querySelector('canvas');
const brush = screen.getContext('2d');

let player1 = new Tank(50, (screen.height/2 + 20),"img/tank.png", 180, "blue", false);
let player2 = new Tank((screen.width - 50), (screen.height/2 + 20),"img/tank.png", 0, "red", false);

function draw()
{
    player1.sketch();
    player2.sketch();
}

function update()
{

}

function main()
{
    brush.clearRect(0, 0, screen.width, screen.height);
    update();
    draw();
}

setInterval(main, 10);