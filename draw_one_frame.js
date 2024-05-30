let noiseColour;
let testRegion;
let noiseGen;
let zero_to_zero;





function draw_one_frame(cur_frac,unitsOnField,unitSize,spacing) {
  let noiseNumber;
	// const darker = 		color("#004237"); 	// monochrome colour to lerp with white.
	const darker = 		color("#ffffff"); 
	const white = 		color("#000000");	// fun idea: switch the HEX out with neon pink
	const black = 		color("ffffff");	// I don't actually think this is used any more!
	const darkerAlpha = 	color(255,100,100,60);
	const darkerLowAlpha = 	color(50,180,100,30);
	const whiteAlpha = 		color(0,0,0,220);
	const whiteMidAlpha = 	color(0,0,0,180);
	const whiteLowAlpha = 	color(0,0,0,30);
	const sunAlpha = 		color(255,252,151,160);


	let phase; // used to alternate between cur_frac and its inverse (zero_to_zero)
	let zero_to_zero = map(cur_frac,0,1,1,0); // uno_reverse_card.jpg
		
	if(cur_frac < 0.5){
	phase = cur_frac;	
	} else{
	phase = zero_to_zero;
	}

	rectMode(CENTER);
	background(white);
	noStroke();

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

		}
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

	let modifier = phase; // my favourite variable in this whole project. 
	// 	for multiplying cur_frac by itself (and making sure the multiplication follows the 0-1-0 phase) 

	push();
	// rectMode(CORNER);
	fill(white);
	rect(0,(height*.72),width,height*.055); 				// skyline: whiteout
	// push();
	// fill(whiteMidAlpha);
	// rect(width*.1,(height*.72),width*.8,height*.3);			// ground: white alpha region
	// pop(); 

	// bleepity bloopity traffic region
		modifier = phase * 0.8;

		// what I need to fix before moving on: why does deleating this break it?
	// renderSquares(
	// 	width*.34,height*.75,
	// 	width*.2, height*.25,
	// 	1,darker,white,darker,cur_frac*modifier,unitsOnField,unitSize,spacing
	// 	);

	// pop();

	//where I'm at with the OOP refactor. 
	let testRegion = new TextureGrid(
		width*.25,height*.25, 	// x and y position
		width*.125, height*.25,				// region width and height
		unitSize, unitSize,
		unitSize*.25,unitSize*.5,
		darker, 5, white, darker		// stroke, noise detail level, primary and secondary colour
	);
  fill(255);
	testRegion.renderRegion(cur_frac,unitsOnField,unitSize,spacing); 

}
function renderSquares(
	x,y,rWidth,rHeight,
	noiseDetail,primary,secondary,strokeClr,cur_frac,unitsOnField,unitSize,spacing, modifier ){

	zero_to_zero = map(cur_frac,0,1,1,0); 
	
	push(); 	
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
			fill(0);
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
	pop(); 
}