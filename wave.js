// Wave oscillation built with this tutorial by Patt Vira:
// https://www.youtube.com/watch?v=atNUa7MdhYs
// Potentially a really great tool for shape distribution and animation
class Wave {
    constructor(shift){
      this.angle = 0;
      this.shift = shift;
      
    }
    display(){
      for(let i=0; i <= 360; i+=16){
        let x = map(i,0,360,-r,r);
        let amplitude = r * sqrt(1-pow((x/r), 2));
        let y = amplitude*sin(i + this.angle + this.shift);
        for(let i=0; i<10; i++){
        ellipse(x,y,.09*i,.05*i);
      }
      }
    //  console.log("display");
  
    }
    displaySecond(){
      for(let i=0; i <= 360; i+=60){
        let x = map(i,0,360,-r,r);
        let amplitude = r * sqrt(1-pow((x/r), 2));
        let y = amplitude*sin(i + this.angle + this.shift);
        for(let i=0; i<30; i++){
        ellipse(x,y,.09*i,.05*i);
      }
      }
    //  console.log("display");
  
    }
    //smaller
    displayThird(){
      for(let i=0; i <= 360; i+=120){
        let x = map(i,0,360,-r*.2,r*.2);
        let amplitude = r * sqrt(1-pow((x/r), 2));
        let y = amplitude*sin(i + this.angle + this.shift)*.1;
        for(let i=0; i<16; i++){
        ellipse(x,y,.04*i,.09*i);
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
  