
## Pre first big refactor

I've made the decision to break the code up to set up necessary draw settings and transformations, then execute a switch statement PER EACH DRAWING STAGE for each main feature. This is a change from the plan to basically rewrite the code as a new full instantiation for each bird species. The stages will be head shape, beak, eyes and fancy features (eyebrows, plumage to draw as top layer etc)
