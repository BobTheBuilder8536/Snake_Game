class Snake{
    constructor(x,y){
        this.Arr = [];
        this.x = [];
        this.y = [];
        this.Arr[0] = createSprite(x,y,20,20);
        this.Arr[0].shapeColor = "black";
    }

    grow(){
        size += 1;
        this.Arr.push(createSprite(0,0,10,10));
        this.x.push(0);
        this.y.push(0);
    }

    drawTail(){
        this.x[0] = this.Arr[0].x;
        this.y[0] = this.Arr[0].y;
        for(var i = 1; i < this.x.length; i++){
            this.x[i] = this.Arr[i].x;
            this.y[i] = this.Arr[i].y;
        }
        for(var i = 1; i < this.Arr.length; i++){
            this.Arr[i].x = this.x[i-1];
            this.Arr[i].y = this.y[i-1];
            if(i % 2 ==0){
                this.Arr[i].shapeColor = "black";
            } else{
                this.Arr[i].shapeColor = "green";
            }
        }
    }

    update(){
        this.Arr[0].x +=  speed * dirX;
        this.Arr[0].y +=  speed * dirY;
    }
}