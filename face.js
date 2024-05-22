/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

var DEBUG_MODE = false;
var NUM_SLIDERS = 4;

const northIslandCol = [60,60,40];
const southIslandCol = [140,100,70];
const bothIslandsCol = [150,130,0];

const dryForestCol =   [28, 156, 77];
const wetForestCol =   [28, 109, 156];
const supalpineCol =   [178, 46, 255];
const allHabitatsCol = [250, 96, 252];

const neutralCol =     [226, 234, 229];
const beakColour = [200,180,140,200];
const stroke_color = [95, 52, 8];

const drawHuman = false;// draws human mouth and nose elements 

ellipseMode(CENTER);

// This where you define your own face object
function Face() {
  // these are state variables for a face
  // (your variables should be different!)
  this.detailColour = dryForestCol;
  this.mainColour = bothIslandsCol;
  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8
  this.bird_species = 0;

  this.chinColour =    neutralCol;
  this.lipColour =     neutralCol;
  this.eyebrowColour = neutralCol;

  this.draw = function(positions) {

    let birdSpecies = Math.floor(this.bird_species);
    // Changed to a function-oriented drawing approach, this gives me a lot of variability options since I don't want as many shared properties as project 2.
    // This also keeps a registry of object-scoped variables and which stage of drawing they're used in.

    let topLipMidY = positions.top_lip[4][1]
    let btmLipMidY = positions.bottom_lip[4][1]
    let diff = topLipMidY - btmLipMidY;

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    let curEyeShift = 0.04 * this.eye_shift;

      this.drawHead(birdSpecies, positions);
      this.drawBeak(birdSpecies, positions, topLipMidY,btmLipMidY,diff);
      this.drawEyes(birdSpecies, positions,left_eye_pos,right_eye_pos);
      this.drawJazz(birdSpecies, positions,topLipMidY,btmLipMidY,diff, curEyeShift)

  }

  // DRAWING SUBFUNCTIONS

  this.drawHead = function(birdSpecies, positions){
    switch(birdSpecies){
      case 0:
      
      // HEAD SHAPE
      stroke(stroke_color);
      strokeWeight(.01);
      noFill();
      for (let i=0; i<50; i++){
        strokeWeight(.1);
        ellipse(segment_average(positions.chin)[0], 0, 5- (i*.1), 4-(i*.1));
        push();
        stroke(this.detailColour);
        strokeWeight(.01);
        ellipse(segment_average(positions.chin)[0], 0, 5- (i*.1), 4+-(i*.1));
        pop();
      };
      
      break;
      default: //debug texture
      debugOut("Head");

    }
  }




  this.drawBeak = function(birdSpecies, positions,topLipMidY,btmLipMidY,diff){
          // BEAK
          switch(birdSpecies){
            case 0:
          let largerMouth = this.mouth_size * 1.7;
          let mouthInner = largerMouth * 0.9;
    
          push();
            translate(segment_average(positions.top_lip)[0], segment_average(positions.top_lip)[1]);
            translate (-largerMouth *.5, 0);
    
            noStroke();
            fill(beakColour);
            // Outer "beak"
            bezier (-1,0,
              largerMouth*.2,-1.5,
              largerMouth*.8,-1.5,
              1+largerMouth,0
            );
            bezier (-1,0,
              largerMouth*.2,1.5,
              largerMouth*.8,1.5,
              1+largerMouth,0
            );
            translate (0.5*(largerMouth - mouthInner), 0); // centers inner mouth region
            fill(this.detailColour);
            // Inner "mouth"
            bezier
                  ( -1,0,
                    mouthInner*.3,topLipMidY + (1.5*diff),
                    mouthInner*.7,topLipMidY + (1.5*diff),
                    1+mouthInner,0
                  );
            bezier
                  ( -1,0,
                    mouthInner*.3,0 - (diff),
                    mouthInner*.7,0 - (diff),
                    1+mouthInner,0
                  );
    
          pop();

          break;
          default: //debug texture

          debugOut("Beak");
  }
}

this.drawEyes = function(birdSpecies,positions,left_eye_pos,right_eye_pos,curEyeShift){
  push();
    strokeWeight(0.03);
      noFill();
      stroke
      for(let i = 0; i < 10; i++){
        push();
          stroke(stroke_color);
          strokeWeight(0.15);
          ellipse(left_eye_pos[0], left_eye_pos[1], 1-(i*.1), 0.33);
          ellipse(right_eye_pos[0], right_eye_pos[1], 1-(i*.1), 0.33);
        pop();  
        push();
          stroke(neutralCol);
          strokeWeight(0.06);
          ellipse(left_eye_pos[0], left_eye_pos[1], 0.4-(i*.15), 0.5);
          ellipse(right_eye_pos[0], right_eye_pos[1], 0.4-(i*.15), 0.5);
        pop();
        
      }


  pop();
}


this.drawJazz = function(birdSpecies,positions,topLipMidY,btmLipMidY,diff){
        // eyebrows
        fill( this.eyebrowColour);
        stroke( this.eyebrowColour);
        strokeWeight(0.04);
  
        this.draw_segment(positions.left_eyebrow, 0.1 + diff*.15);
        this.draw_segment(positions.left_eyebrow, -0.1 + diff*.25);
  
        positions.right_eyebrow[2][1] += diff*.3;
        this.draw_segment(positions.right_eyebrow, 0.1);
        this.draw_segment(positions.right_eyebrow, -0.1);
  
        // draw the chin segment using points
        fill(this.chinColour);
        stroke(this.chinColour);
        if (drawHuman == true){
          this.draw_segment(positions.chin);
        }
        fill(bothIslandsCol);
        stroke(dryForestCol);
        strokeWeight(0.01);
        this.draw_segment(positions.nose_bridge);
  
        if (drawHuman == true){
          
          this.draw_segment(positions.nose_tip);
      }
}

  // DRAW POSITION FUNCTIONS

  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, y_mod = 0, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        
        //ellipse(px, py, 0.1);
        //ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          
          line(px, py+ y_mod, nx, ny + y_mod);
          console.log(px)
         
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  this.draw_around = function(segment, mod = 0, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        //ellipse(px, py, 0.1);

        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px+.1, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  // VALUE MAPPING FUNCTIONS

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.num_eyes = int(map(settings[0], 0, 100, 1, 2));
    this.eye_shift = map(settings[1], 0, 100, -2, 2);
    this.mouth_size = map(settings[2], 0, 100, 0.5, 8);
    this.bird_species = map(settings[3],0,100,0,4);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(4);
    settings[0] = map(this.num_eyes, 1, 2, 0, 100);
    settings[1] = map(this.eye_shift, -2, 2, 0, 100);
    settings[2] = map(this.mouth_size, 0.5, 8, 0, 100);
    settings[3] = map(this.bird_species, 0, 4, 0, 100);
    return settings;
  }
}

// RELEVANT GLOBAL FUNCTIONS

// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// DEBUG: this draws a "missing texture" grid and prints a debug message for the draw sub-function call that failed 
// (called only in the default case for each draw stage with the relevant stage name passed in as string)
function debugOut(drawStage){
  fill(0)
  //ellipse(0,0, 0.5,0.5);
  rect(-2,-2,4,4); 
  fill (255,0,255);
  for (let i = -4; i < 4; i++){
    for (let j = -4; j < 4; j++){
      rect(i/2,j/2, 0.25);
      rect(i/2+(.25),j/2+(.25), 0.25);
    }
  }
console.log("OUTPUT: " + drawStage + " debug'");
}
