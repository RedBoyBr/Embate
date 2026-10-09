const screen = document.getElementById('canva');
const brush = screen.getContext("2d");

function draw()
{

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