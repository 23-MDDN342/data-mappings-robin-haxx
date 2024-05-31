
//main draw loop function
function draw_one_frame(cur_frac,unitsOnField,unitSize,spacing) {

	let noiseNumber;
	let darker = 		color("278°, 94%, 8%"); 	// monochrome colour to lerp with white.
	const white = 		color(212, 188, 174);	// fun idea: switch the HEX out with neon pink
	const black = 		color("000000");	// I don't actually think this is used any more!
	const darkerAlpha = 	color(0,100,100,60);
	const darkerLowAlpha = 	color(255,252,200,40);
	const whiteAlpha = 		color(212, 188, 174,220);
	const whiteMidAlpha = 	color(212, 188, 174,180);
	const whiteLowAlpha = 	color(212, 188, 174,30);
	const sunAlpha = 		color(255,252,200,160);

	let phase; // used to alternate between cur_frac and its inverse (zero_to_zero)
	const zero_to_zero = map(cur_frac,0,1,1,0); // uno_reverse_card.jpg
		
	if(cur_frac < 0.5){
	phase = cur_frac;	
	
	} else{
	phase = zero_to_zero;
	
	}
	// new fun cycle colour stuff!
	const colPhase = map(phase, 0,1,0,5);
	darker = lerpColor(color(26,1,40),color(255,255,255),colPhase);




	rectMode(CENTER);
	background(white);
	noStroke();

	// PROJECT 1 CODE EVOLUTION, PHASE 1: EXPOSED NESTED FOR-LOOP
	// draws a "+" grid over the entire canvas
	// uses noise for line thickness and colour interpolation
	// (adapted from week 2 content)

	// this *could* be refactored as an overload function of renderSquares(),
	// but now I've built the class I'll refactor it into that if I have time instead.

	for (let x =0; x <= (width / spacing); x++){
		for (let y =0; y <= height / spacing; y++ ){
		
		noiseDetail(6,.4);
		// absolutely love this sparkly effect from boosting noise x and y so made sure it scales and implemented
		const noiseX = x*(width / spacing);
		const noiseY = y*(height / spacing);
	
		noiseColour = getNoiseValue(noiseX, noiseY, cur_frac, "MyNoise", 0, 1, 50 );

		fill(lerpColor(white, darker, noiseColour));
		// STAR BLEEP-BLOOP THING 
		// if(noiseColour > .5){
		// 	fill(white);
		// }

		rect(spacing*x, spacing*y, phase*unitSize/8, unitSize/2);		//gridlines vertical
		rect(spacing*x, spacing*y, unitSize/2, (phase*unitSize/8));		//gridlines horizontal

			//OLD IDEAS: 
			//rect(spacing*x, spacing*y, unitSize*2, unitSize/8); // very cool horizontal motion lines
			 
			// DRAWING BASED ON MOUSE POSITION 
			// (I left this on. It only affects performance if mouse is on screen.)
			if (
				spacing*x > (mouseX + width * .01) && 
				spacing*x < (mouseX + width*.1) &&
				spacing*y > mouseY &&
				spacing*y < (mouseY + height*.1)&&
				x==x // redundant condition so I can comment and add stuff line-by-line 
			)
			{
			for(let b=0; b< 5; b++){
			rect((spacing*x)-((unitSize*2)),spacing*y-(height*.1), unitSize*.1, unitSize*4);
			rect((spacing*x), (spacing*y)-(unitSize*2), unitSize*4, unitSize*.1);
			}
			}	
			//  CUBE AT MOUSE POS
			// 	if(spacing*x == mouseX*x && spacing*y == mouseY*y){
			// 	//	fill(darker);	
			// 	fill(lerpColor(darker, white, noiseColour));
			// 	rect(mouseX,mouseY,unitSize*2,unitSize*2);
			// 	rect(mouseX,mouseY,unitSize,unitSize);
			// 	}
		}
		// background shape whiteout. 
		// only current scalability issue in the project; alpha strength changes with resolution
		// this is because of how I've overlaid it with the grid loop. 
		// fun fact, commenting this out improves runtime performance by about 30%.
		// another fun fact - the only other way I got this much of a performance boost was commenting out everything post line 105. 
		// I think it's because js doesn't like overlaying a lot of alpha - my phenakistascope had this issue too.
		// I like the subtle gradient it creates in any case, so I'm leaving it as is :)
		 push();
		 fill(whiteLowAlpha);
		 scale(1.1);
		 beginShape();
		 curveVertex(width*.25,0);
		 curveVertex(width - (width*.25),0);
		 curveVertex(width - (width*.25), (height*.5));
		 vertex(width*.5, height-(height*.25));
		 curveVertex(width*.25, (height*.5));
		 endShape(CLOSE);
		 pop();

		// PLACEHOLDER EYE LIVES!!
		// ellipse(width/2,height/2,width/2.4,height/3.5);
		// image(img,width/4,height/4,width/2,height/2);

	}

	//	sun path
	push();
	noFill();
	stroke(darkerLowAlpha);
	strokeWeight(unitSize*.1);
	curve(width*.1,height*6,
		width*.2,height*.7,
		width*.8,height*.6,
		width*.1,height);
	pop();

	// 	sun. no day/night cycle here.
	push();
	stroke(lerpColor(white, darker, noiseColour));
	fill(sunAlpha);
	noStroke();
	//strokeWeight(unitSize*.2);
	circle(
		// here I use an exponential multiplier on cur_frac for curved velocity 
		// (direction and speed changes at a nonlinear rate)
		(width*.1)+(width*(.2**cur_frac*.65)),		// x position
		height*.3 + (height * (.0005 ** phase*.15)),		// y position
		width*.07+(width*phase*.1)); 				// radius
	pop();


	//  PROJECT 1 PHASE 2: renderSquares()
	//	See the function definition below the draw loop for more info

	let modifier = phase; // my favourite variable in this whole project. 
	// 	for multiplying cur_frac by itself (and making sure the multiplication follows the 0-1-0 phase) 
	
		// horizontal skyline, noise detail of 5. 2 looks quite cool too.
		// first, this backing shadow layer is drawn to add depth.
	renderSquares(
		(width*.3)+(unitSize*.5),height*.6,
		width*.56, height*.15,
		5,darker,darker,white,cur_frac* modifier,unitsOnField,unitSize,spacing
		);
	//  this layer is for the sides of the buildings and some of the balconies
	renderSquares(
		width*.3,height*.6,  														// x and y position
		width*.75, height*.15, 														// width and height
		5,white,darker,darker,cur_frac * modifier,unitsOnField,unitSize,spacing		// noise detail level, colours, inherited parameters
		);	
	//  and this one is for the front facade and the rest of the balconies.	
	renderSquares(
		(width*.3)-(unitSize/4),height*.6,
		width*.55, height*.15,
		5,white,white,darker,cur_frac * modifier,unitsOnField,unitSize,spacing
		);
		
	push();
	rectMode(CORNER);
	fill(white);
	rect(0,(height*.72),width,height*.055); 				// skyline: whiteout
	push();
	fill(whiteMidAlpha);
	rect(width*.1,(height*.72),width*.8,height*.3);			// ground: white alpha region
	pop(); 

	// bleepity bloopity traffic region
		modifier = phase * 0.8;
	renderSquares(
		width*.34,height*.75,
		width*.2, height*.25,
		1,darker,white,darker,cur_frac*modifier,unitsOnField,unitSize,spacing
		);
	rect(width*.413, height*.55, width*.017, height*.45); 	// intersection: vertical whiteout, ~half screen height
	rect(0,(height*.975),width,height*.05); 					// crops the bleepity bloopity traffic region *just* before the canvas floor
	pop();
	
	// skyscraper on the left
	    modifier = phase*.4 								//absolutely wild cool animation for skyscraper shadow
	renderSquares(
		width*.15+(unitSize*.25),height*.25,
		width*.125,height,
		10,darker,white,white,
		cur_frac*modifier,unitsOnField,unitSize*2,spacing*1 // I realised I can make changes to these parameters. This made this buiding waay cooler.
		); 	
		modifier = phase * 1.6;
	renderSquares(
		width*.15,height*.25,
		width*.125,height*.7,
		100,white,darker,white,
		cur_frac * modifier,unitsOnField,unitSize,spacing
		);
	push();
	fill(white);
	rect(width*.215,height*.95,width*.148,unitSize*.5); 		// white dividing line at ground level of skyscraper
	pop();


	//where I'm at with the OOP refactor. 
	// let testRegion = new TextureGrid(
	// 	width*.25,height*.25, 	// x and y position
	// 	width*.125, height*.25,				// region width and height
	// 	darker, 5, white, darker		// stroke, noise detail level, primary and secondary colour
	// );

	//testRegion.renderRegion(cur_frac,unitsOnField,unitSize,spacing); 
	// UNCOMMENTING THIS DRAWS IT !! I just had an issue where it wouldn't display, this has me very excited.
	// Holding off on a full conversion for now due to a performance decrease I noticed,
	// and because it will be quite a lot of work.	
	// Basically, this is a proof of concept for things I can do with this project post-handin.

}

	// PROJECT 1 CODE EVOLUTION, PHASE 2: NOISE- RENDERING FUNCTION
	
	// A function that packages up my main means of drawing regions of animated elements,
	// and provides functionality whenever it is deployed.
	// Just look at all those parameters.
	// There are a few ways of writing variants of functions, here I just have one.
	// This was because I wanted to focus on making the final composition, and attempting an OOP refactor.
	
function renderSquares(x,y,rWidth,rHeight,noiseDetail,primary,secondary,strokeClr,cur_frac,unitsOnField,unitSize,spacing, modifier ){

	zero_to_zero = map(cur_frac,0,1,1,0); // minor fumble: a few things, like this, have to be declared in 2 places
	
	push(); 	// very very very necessary to put this all in a push/pop.
	translate(x,y-unitSize*.375);
	stroke(strokeClr);
	strokeWeight(unitSize*0.025);
	for(let i = 0; i < (rWidth/spacing); i++){
		for (let j = 0; j < (rHeight / spacing); j++){

			let noiseGen = getNoiseValue(i,j,cur_frac,"fNoise",0,.8,noiseDetail);
			fill(lerpColor(primary, secondary, noiseGen));

			// "phase" changes when condition is met. phases explained where variable is defined in draw_one_frame.
			if(cur_frac < 0.5){
			phase = cur_frac;	
			} else{
			phase = zero_to_zero;
			}

			push();
			noStroke();
			fill(color(212, 188, 174));
			rect(
				spacing*i,(spacing*j),  
				(unitSize*2*phase)+(unitSize*.5), unitSize*.4*phase
				);
			pop();

			rect(
				spacing*i,spacing*j, 
				unitSize*.5, (unitSize*2*noiseGen)+unitSize
				);

		}
	}
	pop(); // cannot stress enough how necessary this is.
}