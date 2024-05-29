
## Post first big refactor + Variant birds!

I've made the decision to break the code up to set up necessary draw settings and transformations, then execute a switch statement PER EACH DRAWING STAGE for each main feature. This is a change from the plan to basically rewrite the code as a new full instantiation for each bird species. The stages will be head shape, beak, eyes and fancy features (eyebrows, plumage to draw as top layer etc)

After implementing this I began to build out the drawing process for different birds. I have 4 now - Moa, Haasts eagle, Takahe and Tui, and while Ive had lots of ideas for now will focus on variation, refinement and ML capability for now.

The bird species will be decided based on hair colour.

I also implemented the vibrance slider


Okay! Trained on:

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

+ Oscillation! based on this tutorial by Patt Vira<br>> 
https://www.youtube.com/watch?v=atNUa7MdhYs

"Official" bird mask ideas from DoC <br>
https://www.doc.govt.nz/get-involved/conservation-activities/fun-things-to-make/