
var DEBUG_MODE = false;
var NUM_SLIDERS = 4;

let r = 2;
let w;
let waves = []; let num = 15;

const drawHuman = false;// draws human mouth and nose elements 

function setup(){
  angleMode(DEGREES);
  
}

function Face() {
  ellipseMode(CENTER);

  // these are what I use to move "towards" a plainer colour as "vibrance" slider is adjusted
  this.vibrance = 0;    // colour lerp 0-255. 0 is technically the most vibrant
  this.colourBase1 = color(0,0,0);
  this.colourBase2 = color(230,100,100); // lighter sample for takahe beak, stands out against darker feathers
  this.colourBase2 = color(230,100,100);

  this.detailColour = color(28, 156, 77);
  this.mainColour = color(150,130,0);

  this.islandCols = [color(50,50,30), color(210,190,100), color(200,170,30)];
  this.habiCols   = [color(25, 140, 53), color(20, 125, 200), color(210, 65, 255), color(250, 130, 252)];
  
  this.eye_open = 1;      // 0-1
  this.mouth_size = 1;    // range is 0.5 to 2
  this.bird_species = 0;  // 0-4
  this.feather_ruffle = 0;// modifier 0-10
  this.faceAlpha = 200;

  this.chinColour =    color(226, 234, 229);
  this.lipColour =     color(226, 234, 229);
  this.eyebrowColour = color(226, 234, 229);
  this.waves = [];
  
  for (let i=0; i < num; i++){
    this.waves[i] = new Wave(i*32*(1+i*.5));
    }

  this.draw = function(positions) {

    northIslandCol =  lerpColor(this.islandCols[0],this.colourBase1, this.vibrance);
    southIslandCol =  lerpColor(this.islandCols[1],this.colourBase1, this.vibrance);
    bothIslandsCol =  lerpColor(this.islandCols[2],this.colourBase1, this.vibrance);

    dryForestCol =    lerpColor(this.habiCols[0],this.colourBase1, this.vibrance);
    wetForestCol =    lerpColor(this.habiCols[1],this.colourBase1, this.vibrance);
    supalpineCol =    lerpColor(this.habiCols[2],this.colourBase1, this.vibrance);
    allHabitatsCol =  lerpColor(this.habiCols[3],this.colourBase1, this.vibrance);
    
    //  this pallette is pretty disorganised so I didn't convert it into an array. 
    // (initial implementation of a "vibrance" slider)
    neutralCol =      lerpColor(color(226, 234, 229),this.colourBase1, this.vibrance);
    beakColour =      lerpColor(color(220,190,160),this.colourBase1, this.vibrance);
    beakTakahe =      lerpColor(color(240,110,120),this.colourBase2, this.vibrance);
    beakColourAlpha = lerpColor(color(220,190,160, this.faceAlpha),this.colourBase1, this.vibrance);
    strokeCol =       lerpColor(color(95, 52, 8),this.colourBase1, this.vibrance);
    strokeColAlpha =  lerpColor(color(95, 52, 8, this.faceAlpha),this.colourBase1, this.vibrance);

    // the "debug square" only appears if the species slider is all the way to the right - this won't happen in
    // the face recognition process. (Opening the console will show that the default case for all the drawing 
    // stages is being triggered)
    let birdSpecies = Math.floor(this.bird_species);
    // Changed to a function-oriented drawing approach, this gives me a lot of variability options since I don't want as many shared properties as project 2.
    // This also keeps a registry of object-scoped variables and which stage of drawing they're used in.

    let topLipMidY = positions.top_lip[4][1]
    let btmLipMidY = positions.bottom_lip[4][1]
    let diff = topLipMidY - btmLipMidY;

    let left_eye_pos =  segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    let curEyeShift = 0.04 * this.eye_open;

      this.drawHead(birdSpecies, diff, positions);
      this.drawBeak(birdSpecies, positions, topLipMidY,btmLipMidY,diff);
      this.drawEyes(birdSpecies, positions, left_eye_pos,right_eye_pos);
      this.drawJazz(birdSpecies, positions, topLipMidY,btmLipMidY,diff, curEyeShift)

  }

  // DRAWING SUBFUNCTIONS ##################################################################################


  // HEAD SHAPES ###########################################################################################
  this.drawHead = function(birdSpecies, diff, positions){
    push();
        switch(birdSpecies){
        //  HEAD: MOA --------------------------------------------------------------------------------------
          case 0: 

            stroke(strokeCol);
            noFill();

            for (let i=0; i<50; i++){
              strokeWeight(.03);
              ellipse(segment_average(positions.chin)[0], 0, 5- (i*.1), 4-(i*.1));
              push();
                 stroke(this.colourBase1);
                strokeWeight(.01);
                ellipse(segment_average(positions.chin)[0], 0, 5- (i*.1), 4+-(i*.1));
              pop();
            };   
            push();
            //stroke(0,50);
            stroke(lerpColor(this.mainColour, color(50,30,10), .9));
            strokeWeight(.015);
            
            // This is all that needs written in face.js draw loop for the wave animation
            for(let i=0; i< this.ruffle; i++){
            this.waves[i].display();
            this.waves[i].move(positions);
            }

            pop();      
          break;

        //  HEAD: EAGLE -------------------------------------------------------------------------------------
          case 1:
            stroke(strokeCol);
            noFill();

            for(let i = 0; i < 50; i++){
              strokeWeight(.05);
              beginShape();
                curveVertex(-(i/25),-(i/25)); curveVertex(-(i/33.5),-(i/20)); curveVertex((i/33.5),-(i/20)); curveVertex(0,-(i/20)); curveVertex((i/25),-(i/25)); curveVertex((i/33.5),(i/50)); curveVertex(0,(i/20)); curveVertex(-(i/33.5),(i/50));
              endShape(CLOSE);

              push();
                stroke(northIslandCol);
                strokeWeight(.01);
                beginShape();
                  curveVertex(-(i/25),-(i/25)); curveVertex(-(i/33.5),-(i/20)); curveVertex((i/33.5),-(i/20)); curveVertex(0,-(i/20)); curveVertex((i/25),-(i/25)); curveVertex((i/33.5),(i/50));curveVertex(0,(i/20));curveVertex(-(i/33.5),(i/50));  
                endShape(CLOSE);
              pop();
              
            }
          break;

        //  HEAD: Takahe  -----------------------------------------------------------------------------------
          case 2:
          stroke(wetForestCol);
          noFill();
          strokeWeight(.04);
          for(let i = 0; i < 60; i++){
            beginShape();
              curveVertex(0,.02*i); curveVertex(0,.02*i); curveVertex(-.025*i,.025*i); curveVertex(-.0375*i,0); curveVertex(-0.0175*i,-.0375*i); curveVertex(0.0175*i,-.0375*i); curveVertex(.0375*i,0); curveVertex(.025*i,.025*i); curveVertex(0,.02*i);
            endShape(CLOSE);
  
            push();
              stroke(this.detailColour);
              strokeWeight(.01);
              beginShape();
                curveVertex(0,.02*i); curveVertex(0,.02*i); curveVertex(-.025*i,.025*i); curveVertex(-.0375*i,0); curveVertex(-0.0175*i,-.0375*i); curveVertex(0.0175*i,-.0375*i); curveVertex(.0375*i,0); curveVertex(.025*i,.025*i); curveVertex(0,.02*i);
              endShape(CLOSE);
            pop();

          
          }
          push();
          translate(0,-.5);
          scale(0.6);
          strokeWeight(.01);
          for(let i=0; i< this.ruffle; i++){
            this.waves[i].displaySecond();
            this.waves[i].move(positions);
            }
          pop();
          break;

        //  HEAD: TUI  -------------------------------------------------------------------------------------
          case 3:
            let beakMod = diff * .1;
                        // Draws texture animation 
                        push();
                        translate(0,-0.4);
                        scale(.4);
                        noFill();
                        stroke(wetForestCol);
                        strokeWeight(.005);
                        for(let i=0; i< this.ruffle; i++){
                          this.waves[i].displaySecond();
                          this.waves[i].move(positions);
                        }
                      pop();
            stroke(northIslandCol);
            noFill();
            strokeWeight(0.04);
            translate(0,-1.5);
            for(let i = 0; i < 60; i++){
              beginShape();
              // weird idea - storing bezier curve point values in an array, drawing points with a for loop. 
              // would allow shapes to be altered with array transformations. not doing this here. :p
              // This approach was very brute-force shape drawing and ate up a lot of lines of code
              // so I only kept the more readable line-by-line format where more interesting stuff is happening.
              // what would be nice would be able to "collapse" lines of code quickly by their tier of indentation
                curveVertex(0,i*.05); 
                curveVertex(0,i*.05); 
                curveVertex(i*.0075,i*.045); 
                curveVertex(i*.014,i*.045); 
                curveVertex(i*.02,i*.04); 
                curveVertex(i*.035,i*.0325); 
                curveVertex(i*.0225,i*.010); 
                curveVertex(i*.0125,i*.005); 
                curveVertex(i*.008,-i*.007); 
                curveVertex(-i*.008,-i*.007); 
                curveVertex(-i*.0125,i*.005); 
                curveVertex(-i*.0225,i*.010); 
                curveVertex(-i*.035,i*.0325); 
                curveVertex(-i*.02,i*.04); 
                curveVertex(-i*.014,i*.045); 
                curveVertex(-i*.0075,i*.045); 
                curveVertex(0,i*.05);
              endShape(CLOSE);
              push();
              stroke(wetForestCol);
              strokeWeight(0.007);
                beginShape();
                curveVertex(0,i*.05); 
                curveVertex(0,i*.05); 
                curveVertex(i*.0075,i*.045); 
                curveVertex(i*.014,i*.045); 
                curveVertex(i*.02+beakMod,i*.04); 
                curveVertex(i*.035+beakMod,i*.0325); 
                curveVertex(i*.0225+beakMod,i*.010); 
                curveVertex(i*.0125+beakMod,i*.005); 
                curveVertex(i*.008+beakMod,-i*.007); 
                curveVertex(-i*.008-beakMod,-i*.007); 
                curveVertex(-i*.0125-beakMod,i*.005); 
                curveVertex(-i*.0225-beakMod,i*.010); 
                curveVertex(-i*.035-beakMod,i*.0325); 
                curveVertex(-i*.02-beakMod,i*.04); 
                curveVertex(-i*.014,i*.045); 
                curveVertex(-i*.0075,i*.045); 
                curveVertex(0,i*.05);
                endShape(CLOSE);
              pop();

              
            }
            // left shoulder feathers. dont look as nice as the right
            push();
            shearX(340);
            scale(0.72);
              stroke(neutralCol);
              strokeWeight(0.02);
              translate(-1.1,.3);
              rotate(HALF_PI);
              for(let i = 0; i < .4; i+=.1){
                  for (let j=0; j < .8; j+=.1){ 
                  translate(j*.07,j*.1);
                  push();
                    rotate(-TWO_PI);
                    rotate(PI * random(5,20)); 
                      curve(-.5+i,-.5+j,
                            -.15+i,0+j,
                            .15+i,0+j,
                            .5+i,-.5+j
                      );
                  pop();
                }
              }
            pop();
            // right shoulder 
            push();
              shearX(10);
              scale(0.7);
              stroke(neutralCol);
              strokeWeight(0.02);
              translate(1.2,.3);
              rotate(-HALF_PI);
              for(let i = 0; i < .4; i+=.1){
                  for (let j=0; j < .8; j+=.1){ 
                  translate(-j*.07,0);
                  translate(0,j*.14);
                  push();
                  rotate(-TWO_PI);
                  rotate(PI * random(210,230)); 
                    curve(-.5+i,-.5+j,
                          -.15+i,0+j,
                          .15+i,0+j,
                          .5+i,-.5+j
                    );
                    pop();
                }
              }
            pop();

          break;

          default: //debug texture
          debugOut("Head");

        }
    pop();
  }

// BEAKS #################################################################################################
  this.drawBeak = function(birdSpecies, positions,topLipMidY,btmLipMidY,diff){
    let largerMouth = this.mouth_size * 1.7;
    let mouthInner = largerMouth * 0.9;
    push();
        switch(birdSpecies){
        //  BEAK: MOA  ----------------------------------------------------------------------------------
          case 0:
    
            translate(segment_average(positions.top_lip)[0], segment_average(positions.top_lip)[1]);
            translate (-largerMouth *.5, 0);
            
            fill(beakColourAlpha);
            bezier (-1,0,
              largerMouth*.2,-1.5,
              largerMouth*.8,-1.5,
              1+largerMouth,0
            );
            push();
            //noStroke();
              translate(0,-.005); //quick fix/ offset for weird 1 pixel anti alias issue
              bezier (-1,0,
                largerMouth*.2,1.5,
                largerMouth*.8,1.5,
                1+largerMouth,0
              );
            pop();

            fill(strokeCol);
             stroke(this.colourBase1);
            strokeWeight(.05);
            beginShape();
              curveVertex(-1,0);
              curveVertex(-1,0);
              curveVertex(-.5+(largerMouth*.1),-.1);
              curveVertex((largerMouth*.5), .5);
              curveVertex(.5+(largerMouth*.9), -.1);
              curveVertex(1+largerMouth,0);
              curveVertex(1+largerMouth,0);
              curveVertex(.5+(largerMouth*.9), -.3-(diff*.7));
              curveVertex((largerMouth*.5), .3-(diff*.7));
              curveVertex(-.5+(largerMouth*.1),-.3-(diff*.7));
              curveVertex(-1,0);
            endShape(CLOSE);

            translate (0.5*(largerMouth - mouthInner), 0); // centers inner mouth region
            fill(this.detailColour);

            // );
            break;

        //  BEAK: EAGLE --------------------------------------------------------------------------------
          case 1:
          push();
          translate(segment_average(positions.top_lip)[0], segment_average(positions.top_lip)[1]);
          translate (-largerMouth *.5, 0);
          stroke(this.colourBase1);
          fill(southIslandCol);
          bezier (-.5,0,
            largerMouth*.2,-1.5,
            largerMouth*.8,-1.5,
            .5+largerMouth,0
          );
          bezier (-.5,0,
            largerMouth*.2,1.5,
            largerMouth*.8,1.5,
            .5+largerMouth,0
          );
          
          fill(northIslandCol);
          strokeWeight(.05);
          
          beginShape();
            curveVertex(-.45,0);
            curveVertex(-.45,0);
            curveVertex(-.2+(largerMouth*.1),-.1);
            curveVertex((largerMouth*.5), .5);
            curveVertex(.2+(largerMouth*.9), -.1);
            curveVertex(.45+largerMouth,0);
            curveVertex(.45+largerMouth,0);
            curveVertex(.2+(largerMouth*.9), -.3-(diff*.9));
            curveVertex((largerMouth*.5), .3-(diff*.9));
            curveVertex(-.2+(largerMouth*.1),-.3-(diff*.9));
            curveVertex(-.45,0);
          endShape(CLOSE);
          pop();

          fill(northIslandCol);
          beginShape();
            curveVertex(0,1.7);
            curveVertex(0,1.7);
            curveVertex(-.5,1);
            curveVertex(-.5,-.7);
            curveVertex(0,-1);
            curveVertex(.5, -.7);
            curveVertex(.5,1);
          
          endShape(CLOSE);

            break;
          //  BEAK: Takahe  ------------------------------------------------------------------------------
            case 2:
            push();
            translate(segment_average(positions.top_lip)[0], segment_average(positions.top_lip)[1]);
            translate (-largerMouth *.5, 0);
            fill(beakTakahe);
            bezier (-.5,0,
              largerMouth*.2,-3,
              largerMouth*.8,-3,
              .5+largerMouth,0
            );
            bezier (-.5,0,
              largerMouth*.2,.5,
              largerMouth*.8,.5,
              .5+largerMouth,0
            );
            fill(0);
            stroke(lerpColor(beakTakahe, color(0,0,0), 0.2));
            strokeWeight(.05);
            translate(0,-1);
            beginShape();
              curveVertex(-.15,0);
              curveVertex(-.15,0);
              curveVertex(+(largerMouth*.1),-.1);
              curveVertex((largerMouth*.5), 1.5);
              curveVertex(+(largerMouth*.9), -.1);
              curveVertex(.15+largerMouth,0);
              curveVertex(.15+largerMouth,0);
              curveVertex(+(largerMouth*.9), -.3-(diff*.9));
              curveVertex((largerMouth*.5), 1.3-(diff*.9));
              curveVertex(+(largerMouth*.1),-.3-(diff*.9));
              curveVertex(-.15,0);
            endShape(CLOSE);
            pop();
            fill(beakTakahe);
            stroke(northIslandCol);
            translate(0,-.6);
            beginShape();
              curveVertex(0,2); curveVertex(0,2); curveVertex(0.1,1.8); curveVertex(0.3,0.3); curveVertex(1.4,-1.0); curveVertex(1.1,-1.3); curveVertex(0,-1.5); curveVertex(-1.1,-1.3); curveVertex(-1.4,-1.0); curveVertex(-0.3,0.3); curveVertex(-0.1,1.8); curveVertex(0,2);
            endShape(CLOSE);
            break;

          //  BEAK: TUI  --------------------------------------------------------------------------------
            case 3:
            translate(segment_average(positions.top_lip)[0], segment_average(positions.top_lip)[1]);
            translate (0, -1.8);
            fill(southIslandCol);
            let beakMod = this.mouth_size * .1;
            bezier (-.1-beakMod,0,
              -.07,-.5,
              .07,-.5,
              .1+beakMod,0
            );
            bezier (-.1-beakMod,0,
              -.07,.5,
              .07,.5,
              .1+beakMod,0
            );
            fill(beakTakahe);
            bezier (-.1,0,
              -.07,0-(diff*.3),
              .07,0-(diff*.3),
              .1,0
            );
            bezier (-.1,0,
              -.07,0+(diff*.3),
              .07,0+(diff*.3),
              .1,0
            );

          break;
            default: //debug texture
            debugOut("Beak");
        }
    pop();
  }
  // EYES ###############################################################################################
  this.drawEyes = function(birdSpecies,positions,left_eye_pos,right_eye_pos,curEyeShift){
    push();
        switch(birdSpecies){
          //  EYES: MOA  --------------------------------------------------------------------------------
            case 0:

            strokeWeight(0.03);
            noFill();
            stroke
            for(let i = 0; i < 10; i++){
              push();
                stroke(strokeCol);
                strokeWeight(0.15);
                ellipse(left_eye_pos[0]-.8, left_eye_pos[1]+.6, 1-(i*.15), 0.63);
                ellipse(right_eye_pos[0]+.8, right_eye_pos[1]+.6, 1-(i*.15), 0.63);
              pop();  
              push();
                stroke(neutralCol);
                strokeWeight(0.12);
                ellipse(left_eye_pos[0]-.8, left_eye_pos[1]+.6, 0.7-(i*.16), 0.8);
                ellipse(right_eye_pos[0]+.8, right_eye_pos[1]+.6, 0.7-(i*.16), 0.8);
              pop();
              
            }
            break;
            case 1:
          //  EYES: EAGLE -------------------------------------------------------------------------------
          strokeWeight(0.03);
          noFill();
          stroke
          for(let i = 0; i < 10; i++){
            push();
              stroke(strokeCol);
              strokeWeight(0.15);
              ellipse(left_eye_pos[0]-.1, left_eye_pos[1]+.5, .6-(i*.06), 0.3);
              ellipse(right_eye_pos[0]+.1, right_eye_pos[1]+.5, .6-(i*.06), 0.3);
            pop();  
            push();
              stroke(neutralCol);
              strokeWeight(0.03);
              ellipse(left_eye_pos[0]-.1, left_eye_pos[1]+.5, 0.3-(i*.08), 0.4);
              ellipse(right_eye_pos[0]+.1, right_eye_pos[1]+.5, 0.3-(i*.08), 0.4);
            pop();
            
          }
            break;
          //  EYES: Takahe  -----------------------------------------------------------------------------
          case 2:
            strokeWeight(0.03);
            noFill();
            stroke
            for(let i = 0; i < 10; i++){
              push();
                // easter egg: eye colour here changes with mouth size
                stroke(lerpColor(wetForestCol, this.colourBase1, this.mouth_size-0.5));
                strokeWeight(0.15);
                ellipse(left_eye_pos[0]-.3, left_eye_pos[1]+.1, .3-(i*.06), 0.3);
                ellipse(right_eye_pos[0]+.3, right_eye_pos[1]+.1, .3-(i*.06), 0.3);
              pop();  
              push();
                stroke(neutralCol);
                strokeWeight(0.03);
                ellipse(left_eye_pos[0]-.3, left_eye_pos[1]+.1, 0.3-(i*.08), 0.4);
                ellipse(right_eye_pos[0]+.3, right_eye_pos[1]+.1, 0.3-(i*.08), 0.4);
              pop();
              
            }
            break;
          //  EYES: TUI  --------------------------------------------------------------------------------
            case 3:
                strokeWeight(0.03);
                noFill();
                for(let i = 0; i < 10; i++){
                  push();
                     stroke(this.colourBase1);
                    strokeWeight(0.15);
                    ellipse(left_eye_pos[0]+.4, left_eye_pos[1]-.4, .1-(i*.006), 0.1);
                    ellipse(right_eye_pos[0]-.4, right_eye_pos[1]-.4, .1-(i*.006), 0.1);
                  pop();  
                  push();
                    stroke(neutralCol);
                    strokeWeight(0.03);
                    ellipse(left_eye_pos[0]+.45, left_eye_pos[1]-.45, 0.1-(i*.001), 0.02);
                    ellipse(right_eye_pos[0]-.35, right_eye_pos[1]-.45, 0.1-(i*.001), 0.02);
                  pop();
                  
                }

            break;
            default: //debug texture
            debugOut("Eyes");
          }
    pop();
  }

  // STYLIZATION / TOP LAYER ############################################################################
  this.drawJazz = function(birdSpecies,positions,topLipMidY,btmLipMidY,diff){
    push();
    switch(birdSpecies){
      //  JAZZ: MOA  ------------------------------------------------------------------------------------
        case 0:
            // eyebrows
            //fill( this.eyebrowColour);
            stroke(strokeColAlpha);
            strokeWeight(0.01);
      
            this.draw_segment(positions.left_eyebrow, 0.1 + diff*.15);
            this.draw_segment(positions.left_eyebrow, -0.1 + diff*.25);
      
            //positions.right_eyebrow[2][1] += diff*.3;
            this.draw_segment(positions.right_eyebrow, 0.1 + diff*.15);
            this.draw_segment(positions.right_eyebrow, -0.1 + diff*.25);
      
            // draw the chin segment using points
            fill(this.chinColour);
            stroke(this.chinColour);
            if (drawHuman == true){
              this.draw_segment(positions.chin);
            }
            fill(bothIslandsCol);
            stroke(dryForestCol);
            strokeWeight(0.01);
            
      
            if (drawHuman == true){
              this.draw_segment(positions.nose_bridge);
              this.draw_segment(positions.nose_tip);
            }
          break;
          case 1:
        //  JAZZ: EAGLE ---------------------------------------------------------------------------------
          push();
          stroke(southIslandCol);
            strokeWeight(0.02);


            positions.left_eyebrow[1][1] += diff*.3;
            positions.left_eyebrow[3][1] -= diff*.3;
            positions.left_eyebrow[4][1] -= diff*.4;
            positions.right_eyebrow[3][1] += diff*.3;
            positions.right_eyebrow[1][1] -= diff*.3;
            positions.right_eyebrow[0][1] -= diff*.4;
            this.draw_segment(positions.left_eyebrow, .8+0.1 + diff*.15);
            positions.left_eyebrow[3][1] += .05;
            this.draw_segment(positions.left_eyebrow, .8+-0.1 + diff*.25);
            this.draw_segment(positions.right_eyebrow, .8+0.1 + diff*.15);
            positions.right_eyebrow[3][1] += .05;
            this.draw_segment(positions.right_eyebrow, .8+-0.1 + diff*.25);

            fill(northIslandCol);
            beginShape();
              curveVertex(0,1.7);
              curveVertex(0,1.7);
              curveVertex(-.5,1);
              curveVertex(-.5,-.7);
              curveVertex(0,-1);
              curveVertex(.5, -.7);
              curveVertex(.5,1);
            
            endShape(CLOSE);
      
            // draws some human features if drawHuman variable in file head is true
            fill(this.chinColour);
            stroke(this.chinColour);
            if (drawHuman == true){
              this.draw_segment(positions.chin);
            }
            fill(bothIslandsCol);
            stroke(dryForestCol);
            strokeWeight(0.01); 
            if (drawHuman == true){
              this.draw_segment(positions.nose_bridge);
              this.draw_segment(positions.nose_tip);
            }
            pop();
          break;

          //  JAZZ: Takahe  -------------------------------------------------------------------------------
          case 2:
          break;

        //  JAZZ: TUI  ------------------------------------------------------------------------------------
          case 3:
            push();
              scale(.5);
              translate(0,-2.3);
              // microtransformations to make the eyebrows look small-bird-y 
              positions.left_eyebrow[1][1] += diff*.3;
              positions.left_eyebrow[3][1] -= diff*.3;
              positions.left_eyebrow[4][1] += diff*.1;
              positions.right_eyebrow[3][1] += diff*.3;
              positions.right_eyebrow[1][1] -= diff*.3;
              positions.right_eyebrow[0][1] += diff*.1;
              push();
                translate(+.2,0);
                this.draw_segment(positions.left_eyebrow, .8+0.1 + diff*.15);
                positions.left_eyebrow[3][1] += .05;
                this.draw_segment(positions.left_eyebrow, .8+-0.1 + diff*.25);
              pop();
              push();
              translate(-.2,0);
                this.draw_segment(positions.right_eyebrow, .8+0.1 + diff*.15);
                positions.right_eyebrow[3][1] += .05;
                this.draw_segment(positions.right_eyebrow, .8+-0.1 + diff*.25);
              pop();
              push();
              translate(0,3);
              scale(0.4);
              noFill();
              stroke(255);
              strokeWeight(2);
              for(let i=0; i< 2; i++){
                this.waves[i].displayThird();
                //this.waves[i].move(positions);
                }
              pop();
            pop();
          break;
          default: //debug texture
          debugOut("Jazz");
        }
  pop();
}

  // DRAW POSITION FUNCTIONS ###########################################################################

  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, y_mod = 0, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          
          line(px, py+ y_mod, nx, ny + y_mod);
         
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

  // VALUE MAPPING FUNCTIONS ############################################################################

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.vibrance = map(settings[0], 0, 100, 0, 0.3);
    this.ruffle = map(settings[1], 0, 100, 0, num);
    this.mouth_size = map(settings[2], 0, 100, 0.5, 1.5);
    this.bird_species = map(settings[3],0,100,0,4); //changing the 4's to 3.99 will stop the debug 
    this.feather_ruffle = map(settings[4],0,100,0,10);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(4);
    settings[0] = map(this.vibrance, 0, 0.3, 0, 100);
    settings[1] = map(this.ruffle, 0, num, 0, 100);
    settings[2] = map(this.mouth_size, 0.5, 1.5, 0, 100);
    settings[3] = map(this.bird_species, 0, 4, 0, 100);
    settings[4] = map(this.feather_ruffle,0,10,0,100);
    return settings;
  }
}

// RELEVANT GLOBAL FUNCTIONS ############################################################################

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
