const screen = document.getElementById('canva');
const brush = screen.getContext("2d");

let player1 = new Tank(0,0,"img/tank_blue", false);

function draw()
{
    player1.sketch();
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