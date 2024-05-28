class Wave {
    constructor(){
      this.angle = 0;
    }
    display(){
      for(let i=0; i <= 360; i+=10){
        let x = map(i,0,360,-r,r);
        let amplitude = r * sqrt(1-pow((x/r), 2));
        let y = amplitude*sin(i + this.angle);
        for(let i=0; i<5; i++){
        ellipse(x,y,.08*i,.08*i);
      }
      }
    //  console.log("display");
  
    }
    move(positions){
          // change oscillation direction based on head facing left/right
          if (segment_average(positions.chin)[0] - positions.chin[0][0] > positions.chin[15][0] - segment_average(positions.chin)[0]){
            this.angle-=1;
          }else{
            this.angle+=1;
          }
        // console.log("move");
    }
  }
  