var snakex=2;
var snakey=2;
var height=20;
var width=20;
var interval=100;
var increement=1;

var tailx=[snakex];
var taily=[snakey];
var fx;
var fy;
var running=false;
var gameover=false;
var direction=-1; //up=0,down=-1,left=1,right=2
var score1=0;
var int;

function run()
{
        init();
        int = setInterval(gameLoop,interval);
}
function init()
{
        
        createMap();
        createSnake();
        createFruit();
}

function createMap()
{
        document.write("<table>");
        for(var y=0;y<height;y++)
        {
                document.write("<tr>");
                for(var x=0;x<width;++x)
                {
                        if(x==0||x==width-1||y==0||y==height-1)
                        {
                        document.write("<td class='wall' id='"+ x +"-"+ y +"'>");
                        }
                        else
                        {
                        document.write("<td class='blank' id='"+ x +"-"+ y +"'>");
                        }
                        
                }
                document.write("</tr>")
        }
        document.write("</table>")
}
function createSnake()
{
        set(snakex,snakey,"snake");
}
function get(x,y)
{
        return document.getElementById(x+"-"+y);
}
function set(x,y,value)
{
        get(x,y).setAttribute("class",value);
}
function rand(min,max)
{
return Math.floor(Math.random()*(max-min)+min);
}
function getType(x,y)
{
        return get(x,y).getAttribute("class");
}
function createFruit()
{
        var found=false;
        while(!found && (length<(width-2)*(height-2)+1))
        {
        var fruitx=rand(1,width-1);
        var fruity=rand(1,height-1);
        if(getType(fruitx,fruity)=="blank")
        found=true;
        }
        set(fruitx,fruity,"fruit");
        fx=fruitx;
        fy=fruity;
}
window.addEventListener("keypress",function key()
{
        var key=event.keyCode;
        if(direction !=-1 && (key ==119 || key==87)) //W=up
                direction=0;
        else if(direction!=0 && (key ==115 || key==83 )) //S=down
                direction=-1;
        else if(direction!=2 && (key==97 || key==65)) //A=left
                 direction=1;
        else if(direction!=1 && (key==100 || key==68)) //D=Right
                        direction=2;
        if(!running)
                running=true;
        else if(key==32)
                running =false; //pause the game
        
                
        
});
function gameLoop()
{
        if(running && !gameover)
        {
                update();
        }
        else if(gameover)
        {
                clearInterval(int);
        }

}
function update()
{
        set(fx,fy,"fruit");
        updateTail();
        set(tailx[length],taily[length],"blank");
        if(direction == 0)
        snakey--;
        else if(direction== -1)
        snakey++;
        else if(direction == 1)
        snakex--;
        else if(direction == 2)
        snakex++;
        set(snakex,snakey,"snake");
        for(var i=tailx.length-1;i>=0;i--)
        {
        if(snakex==tailx[i]&&snakey==taily[i])
        {
        gameover=true;
        break;
        }
        }
         if(snakex==0||snakex==width-1||snakey==0||snakey==height-1)
         gameover=true;
        else if(snakex==fx && snakey==fy)
        {
        score1+=4;
        createFruit();
        length+=increement;
        
        }
        document.getElementById("score").innerHTML="Score : "+score1;
        if(gameover)
        {
       alert("Game over .Your Score is "+score1);
       document.getElementById("over").style.visibility="visible";
      // over();
       }
}
function over()
{

}
function updateTail()
{
        for(var i=length;i>0;i--)
        {
                tailx[i]=tailx[i-1];
                taily[i]=taily[i-1];
        }
        tailx[0]=snakex;
        taily[0]=snakey;
}

run();
