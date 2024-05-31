
## Final concept: NZ birds photo booth!

I came at this project from a pretty complex starting point, having just been working with a data representation tool and focusing on learning to write object-oriented code, with the actual avian "face" being drawn being pretty simple. I quickly realised how confusing a process it would be to keep these same scientific goals while integrating the project with a machine- learning framework, and decided to keep the modular coding process in mind but really just retain the visual aspects of project 2. (eg. drawing thin lines with a loop for a moire effect)
This also helped me realise some of the potential project 2 has for being applicable to species of birds other than Moa, and because I fleshed out the draw loop code to run through four "layers" of drawing any given bird - head shape, beak, eyes and any other flair - I was able to demonstrate the benefits of a more procedurally- oriented programming approach. 

These are the variables I trained the machine-learning algorithm on:

SLIDER ONE
<---More vibrant    Less vibrant----->
<---Fem                     Masc----->

SLIDER TWO
<---Static feathers    "Ruffled"----->
<---Angular face     Softer face----->

SLIDER THREE
<---small beak    big beak width----->
<---pursed mouth      wide mouth----->

SLIDER FOUR
<--moa-----eagle----takahe----tui---->
<--blond---brown----red-------black-->

I'm very happy with some of the machine- learning aspects here. The training for masc/fem gives a pretty distinct difference in how bright the face is represented, and hair colour is picked up quite well (though different shades of blond are often read as different colours and hat colour basically decides it if headwear is obscuring someone's hair. I also trained it to recognise a lack of hair as blond - I'm sure would be possible to map another value on to the start of the slider for silver hair etc.) It was pretty interesting seeing how it picked up variations in hair colour, e.g. mine is a split dark/light blond right now.

One thing that did really intrigue me about this process was just how prone it was to my personal biases in typecasting people. To make a system that would consistently put a given face in a reliable box, I would take all sorts of small details that others might have a totally different notion of and translate that to a vibe of where to position a slider. A less controversial example would be putting all shades of blond and black hair as far as I could to the left and right side of the hair slider respectively, but "round/ squarish face" is really just my attempt to capture some of the vectors the technology is good at using, and this mix of specific data in highly abstract technical categories (AI) and arbitrary calls for targeted categories (human-trained sliders) produced a lot of unexpected categorization.

Moving into final changes - the code systems I kept mostly within my understanding - I spent a bit of time trying to get things consistent visually. The Tui turned out pretty well, but it takes a lot of thinking to work on the visual style. So the result is very much the result of a lot of tinkering rather than having a plan from the start for how I wanted everything to look. Which for the purposes of this project I'd definitely say is a success.

Other files- 
wave.js class: Oscillation! based on this tutorial by Patt Vira<br>
https://www.youtube.com/watch?v=atNUa7MdhYs
Points that move within an elliptical region based on a sine wave. "feather ruffle" controls how many waves are drawn, and what way the head is facing will be reflected in the oscillation moving left or right. (This is most prominent in the Moa.)

"Official" bird mask ideas from DoC <br>
https://www.doc.govt.nz/get-involved/conservation-activities/fun-things-to-make/