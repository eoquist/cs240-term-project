const Snakecanvas = document.createElement("canvas")
Snakecanvas.width = 500;
Snakecanvas.height = 500;
document.querySelector("body").appendChild(Snakecanvas);

//Snake object class for keeping track of vars
class Snake {
    constructor(){
        //Snake length
        this.size = 1;

        this.backG = Snakecanvas;

        this.head = [250 , 250]
        this.body = [this.head]
        // the direction being moved, held in an array where the first element is x and second is Y
        this.direction = [0,0]


    }
}

function main (){
    Snakecanvas
}