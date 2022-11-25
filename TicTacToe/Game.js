const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const sizeX = canvas.width / 3;
const sizeY = canvas.height / 3
var grid = []

const player =
    {
        NULL: 0,
        CROSS: 1,
        CIRCLE: 2
    };

var currentPlayer = player.CROSS

var gameWon = false

//always update
//window.setInterval(drawGame)

for(let x = 0; x < 3; x++)
{
    for(let y = 0; y < 3; y++)
    {
        grid[x + "," + y] = player.NULL
    }
}

drawGame()

canvas.addEventListener("mousedown", function (e){onMouseDown(canvas, e)})

function drawGame()
{
    ctx.strokeStyle = "rgb(0, 0, 0)"
    ctx.lineWidth = 2

    for(let i = 1; i < 3; i++)
    {
        ctx.beginPath()
        ctx.moveTo(0, i*sizeY)
        ctx.lineTo(canvas.width, i*sizeY)
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.moveTo(i*sizeX, 0)
        ctx.lineTo(i*sizeX, canvas.height)
        ctx.stroke()
        ctx.closePath()
    }

    for(let x = 0; x < 3; x++)
    {
        for(let y = 0; y < 3; y++)
        {
            if(grid[x + "," + y] === player.CROSS)
            {
                drawCross(x * sizeX, y * sizeY)
            }
            if(grid[x + "," + y] === player.CIRCLE)
            {
                drawCircle(x * sizeX, y * sizeY)
            }
        }
    }
}

function drawCross(x, y)
{
    ctx.strokeStyle = "rgb(255, 0, 0)"
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.moveTo(x + 20, y + 20)
    ctx.lineTo(x + sizeX - 20, y + sizeY - 20)
    ctx.stroke()
    ctx.closePath()

    ctx.beginPath()
    ctx.moveTo(x + sizeX - 20, y + 20)
    ctx.lineTo(x + 20, y + sizeY - 20)
    ctx.stroke()
    ctx.closePath()
}

function drawCircle(x, y)
{
    ctx.strokeStyle = "rgb(0, 0, 255)"
    ctx.lineWidth = 8
    ctx.beginPath()
    ctx.arc(x + sizeX / 2, y + sizeY / 2, sizeX / 2 - 10, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()
}

function checkWin()
{
    var countDiagonal1 = 0
    var countDiagonal2 = 0

    for (let i = 0; i < 3; i++)
    {
        var countX = 0
        var countY = 0

        for(let j = 0; j < 3; j++)
        {
            if(grid[j + "," + i] === currentPlayer)
            {
                countX++
            }
            if(grid[i + "," + j] === currentPlayer)
            {
                countY ++;
            }
        }

        if(countX >= 3 || countY >= 3)
        {
            return true
        }
        else
        {
            countX = 0
            countY = 0
        }

        if(grid[i + "," + i] === currentPlayer)
        {
            countDiagonal1++
        }
        if(grid[(2 - i) + "," + i] === currentPlayer)
        {
            countDiagonal2++
        }
    }
    if(countDiagonal1 >= 3 || countDiagonal2 >= 3)
    {
        return true
    }
}

function onMouseDown(canvas, e)
{
    var x = Math.floor((e.x - canvas.getBoundingClientRect().x) / sizeX)
    var y = Math.floor((e.y - canvas.getBoundingClientRect().y) / sizeY)

    if(grid[x + "," + y] === player.NULL && !gameWon)
    {
        grid[x + "," + y] = currentPlayer
        drawGame()
        if(checkWin())
        {
            gameWon = true
            var div = document.querySelector("#contentArea")
            var p = document.createElement("p")
            p.setAttribute("id", "message")
            p.setAttribute("class", "winText")
            p.innerText = (currentPlayer === player.CROSS ? "Cross" : "Circle") + " won the game!"
            div.append(p)
        }
        currentPlayer = currentPlayer === player.CROSS ? player.CIRCLE : player.CROSS
    }
}

function reloadGame()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for(let x = 0; x < 3; x++)
    {
        for(let y = 0; y < 3; y++)
        {
            grid[x + "," + y] = player.NULL
        }
    }

    drawGame()

    gameWon = false;
    var p = document.querySelector("#message")
    p.remove()
}