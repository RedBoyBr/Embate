const screen = document.querySelector('canvas');
const brush = screen.getContext('2d');

let player1 = new Tank(50, (screen.height/2 + 20),"img/tank.png", 180, "blue", false);
let player2 = new Tank((screen.width - 50), (screen.height/2 + 20),"img/tank.png", 0, "red", false);

let hitted = false;

screen.addEventListener('pointerdown', function()
{
    screen.focus();
});

screen.addEventListener('keydown', function(e)
{
    if(document.activeElement == screen && ["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].includes(e.key))
    {
        e.preventDefault();
    }

    if(e.key == "ArrowUp")
    {
        player2.speed = -2;
    }
    if(e.key == "ArrowDown")
    {
        player2.speed = 2;
    }
    if(e.key == "ArrowLeft")
    {
        player2.angle -= 30;
    }
    if(e.key == "ArrowRight")
    {
        player2.angle += 30;
    }
    if(e.key == "Enter")
    {
        player2.shot();
    }



    if(e.key == "w")
    {
        player1.speed = -2;
    }
    if(e.key == "s")
    {
        player1.speed = 2;
    }
    if(e.key == "a")
    {
        player1.angle -= 30;
    }
    if(e.key == "d")
    {
        player1.angle += 30;
    }
    if(e.key == " ")
    {
        player1.shot();
    }
})

screen.addEventListener('keyup', function(e)
{
    if(e.key == "ArrowUp" || e.key == "ArrowDown")
    {
        player2.speed = 0;
    }
    if(e.key == "w" || e.key == "s")
    {
        player1.speed = 0;
    }
})

let tanks = [player1, player2];

function draw()
{
    player1.sketch();
    player2.sketch();
}

function update()
{
    player1.move();
    player2.move();

    player1.bulletMovement();
    player2.bulletMovement();

    player1.bulletCollision(tanks);
    player2.bulletCollision(tanks);
}

function main()
{
    brush.clearRect(0, 0, screen.width, screen.height);
    update();
    draw();
}

setInterval(main, 10);