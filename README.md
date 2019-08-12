# gif-generator

### Created using HTML, CSS, JavaScript, jQuery, AJAX

## Instructions

- click a button to display gifs
- type a topic and click add to add a topic
- click clear, to clear gifs from the page
- hover over a gif to play gif
  - gif will stop playing when gif is no longer hovered
- click heart icon to add gif to favorites
- click X icon to remove gif from favorites

## Code review

this project was created using the Giphy API. jQuery is used to access the API and return the desired data. Image stills, animated gif, and gif rating are added to each image div. Event listeners are used to toggle animation on hover. ~~The app itself is mostly contained all in one function, it could likely be broken out into smaller funtions, and could use some refactoring.~~
refer to app.js file for a best practice on how **_NOT_ TO WRITE CODE.**
I took another stab at the js in logic.js. This version broke each part of the app into smaller pieces, which was a much more readable approach to the application. it also eliminated buggy behavior happened adding gifs to favorites.

## Deployed Project

link to deployed version of this project:
https://gmocore.github.io/gif-generator/
