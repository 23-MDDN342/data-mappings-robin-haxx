// these can be customized
const debugViewText = "#ff0000";
const debugZoomBackground = "#555588"
const debugZoomScale = 0.5;

// this can be modified after we discuss in lecture
const buffersPerFrame = 1;

// probably best not to modify anything below this line
const frameMax = 24;
let recording = false;
let gifRecorder = null;
let debugZoom = false;
let debugView = false;
let stickFrame = 0;

// *note: canvasWidth and canvasHeight will be defined before this script runs)

function setup () {
  let main_canvas = createCanvas(canvasWidth,canvasHeight);
  let r = random(100);
  main_canvas.parent('canvasContainer');
  frameRate(24 * buffersPerFrame);
  
}

function mousePressed(){
}

function draw () {
  let animation_max_frames = frameMax * buffersPerFrame;
  let sticky_max_frames = animation_max_frames + stickFrame;
  let cur_frame = frameCount % sticky_max_frames;
  if (cur_frame >= animation_max_frames) {
    cur_frame = 0;
  }
  let cur_frac = map(cur_frame, 0, animation_max_frames, 0, 1);

  const unitsOnField = 65;
  const unitSize = width/unitsOnField;
  const spacing = width / unitsOnField ;

  background(debugZoomBackground);

  push();

  if(debugZoom) {
    translate(0.5 * width, 0.5 * height);
    scale(debugZoomScale);
    translate(0.5 * -width, 0.5 * -height);    
  }

  draw_one_frame(cur_frac);

  pop();

  if(debugView) {
    textSize(28);
    fill(debugViewText);
    text("" + (cur_frame/buffersPerFrame).toFixed(2) + " / " + 
      (animation_max_frames/buffersPerFrame).toFixed(2) + " = " + 
      cur_frac.toFixed(2), 50, 50);
  }

  if(recording) {
    textSize(24);
    gifRecorder.addBuffer();
  }
}

function keyTyped() {
  if (key == '!') {
    saveBlocksImages();
  }
  if (key == ' ') {
    debugZoom = !debugZoom;
  }
  if (key == 'd') {
    debugView = !debugView;
  }
  if (key == '1') {
    frameRate(1);
    stickFrame = 0;
  }
  if (key == '2') {
    frameRate(5);
    stickFrame = 5;
  }
  if (key == '3') {
    frameRate(30);
    stickFrame = 0;
  }
  if (key == 'r') {
    if (recording==false){
      recording = true;
      gifRecorder = new p5recorder (frameMax, 'wallpaper.gif', buffersPerFrame);
    }    
  }
}


class TextureGrid {
  constructor(x,y,w,h,
    lowerSqW,lowerSqH,higherSqW,higherSqH,
    strokeClr,noiseDetail,primary,secondary,
    cur_frac,unitsOnField,unitSize,spacing) {

      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.lowerSqW = lowerSqW;
      this.lowerSqH = lowerSqH;
      this.higherSqW = higherSqW;
      this.higherSqH = higherSqH;
      this.strokeClr = strokeClr;
      this.noiseDetail = noiseDetail;
      this.primary = primary;
      this.secondary = secondary;
      
  }

  noise(cur_frac){
  
      this.primaryNoise = getNoiseValue(this.x,this.y,cur_frac,"pNoise",0,1,pNoiseDetail);
      this.secondaryNoise = getNoiseValue(this.x,this.y,cur_frac,"sNoise",0,1,sNoiseDetail);

  // potentially able to change on the fly with code such as:
  // let chaoticNoise = getNoiseValue(this.x,this.y,cur_frac,"cNoise",0,1,2);
  // shapeOne.noise.secondaryNoise = chaoticNoise

  }

  renderRegion(cur_frac,unitsOnField,unitSize,spacing){

      zero_to_zero = map(cur_frac,0,1,1,0);

      translate(this.x,this.y);
      stroke(this.strokeClr);
      strokeWeight(unitSize/40);

      for(let i = 0; i < (this.w/spacing); i++)
      {
          for (let j = 0; j < (this.h / spacing); j++)
          {

              noiseGen = getNoiseValue(i,j,cur_frac,"fNoise",0,1,this.noiseDetail);
              fill(lerpColor(this.primary, this.secondary, noiseGen));

               if(cur_frac < 0.5)
              {
                  push();
                  noStroke();
                  fill(255);
                  rect(spacing*i,(spacing*j)-(unitSize/4),  cur_frac*this.lowerSqW, cur_frac*this.lowerSqH);
                  pop();
                  rect(spacing*i,spacing*j,  cur_frac*this.higherSqW, cur_frac*this.higherSqH);
              }
              else
              {
                  push();
                  noStroke();
                  fill(255);
                  rect(spacing*i,(spacing*j)-(unitSize/4), zero_to_zero*this.sqW, zero_to_zero*this.sqH);
                  pop();
                  push();
                  
                  rect(spacing*i,spacing*j, zero_to_zero*this.sqW, zero_to_zero*this.sqH);
                  pop();   
              }
          
          }
      }
      

  }


}
