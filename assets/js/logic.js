//  VARIABLES

const topics = [
  "goodfellas",
  "dogs",
  "mind blown",
  "timelapse",
  "work",
  "american psycho",
  "fight club",
  "space",
  "assassins creed odyssey",
  "gta v"
];

let chosenTopic;
let apiData;
let stillImage;
let animatedImage;
let rating;

//  EVENT LISTENERS

$("#topic-input").on("keyup", function(e) {
  if (e.keyCode === 13) {
    $("#add-button").click();
  }
});

$("#add-button").click(() => {
  // ensures a value is entered into input
  if ($("#topic-input").val() !== "") {
    // add new topic to topics array for rendering
    topics.push($("#topic-input").val());
    renderButtons();
    $("#topic-input").val("");
  }
});
// clear displayed gifs
$("#clear-button").click(() => {
  $(".image-container").fadeOut(500);
});

// FUNCTIONS

function renderButtons() {
  // initially hide favorites
  $(".favorite-container").hide();
  // remove all buttons prior to re-rendering
  $(".buttons").empty();
  // render button for each topic present in topics array
  topics.forEach(item => {
    const button = $(`<button>${item}</button>`).addClass(
      "button rendered-button"
    );
    // add new buttons to top of button list
    $(".buttons").prepend(button);
  });
  $(".rendered-button").click(function(e) {
    // listen for button click to set topic searched by apiCall
    chosenTopic = $(this).text();
    apiCall();
  });
}

// render inital topic buttons to page
renderButtons();

// query api to generate content
function apiCall() {
  // api key and search string
  const searchString = `https://api.giphy.com/v1/gifs/search?api_key=0q2XqKx6Ynz8T8KJYTzu1FMObhUHEv0X&limit=10&rating=PG&lang=en&q=`;
  $.ajax({
    // add chosen topic to search string to return disred content
    url: searchString + chosenTopic
  })
    .then(function(response) {
      // iterate through response array
      response.data.forEach(item => {
        // set variables to store image data as data-attributes
        stillImage = item.images.fixed_height_still.url;
        animatedImage = item.images.fixed_height.url;
        rating = item.rating;
        // render content on fulfilled promise
        renderImages();
      });
    })
    // error handling on unfulfilled promise
    .catch(function(err) {
      console.log(err);
    });
}

function renderImages() {
  // variables for creating content
  const image_div = $("<div></div>").addClass("image");
  const ratingDisplay = $(`<p>Rating: ${rating.toUpperCase()}</p>`).addClass(
    "rating"
  );
  // set data attributes for each image using the values set in the api response
  const gifImage = $(
    `<img src="${stillImage}" data-gif="${animatedImage}" data-still="${stillImage}" data-state="still"></img>`
  );
  // icon to add gif to favorites
  const favorites = $(`<i></i>`).addClass("favorites far fa-heart");
  // add elements to image div
  image_div.append(gifImage);
  image_div.append(ratingDisplay);
  image_div.append(favorites);
  // pass down favorites to add to favorites function. eliminates the need for a favorites variable.
  addToFavorites(favorites);
  // display image_div
  $(".image-container")
    .prepend(image_div)
    .hide()
    .fadeIn(500);
  // event listener to play gif on hover
  $(".image").on("mouseenter", e => {
    if ($(e.target).attr("data-state") === "still") {
      $(e.target).attr("data-state", "animate");
      $(e.target).attr("src", $(e.target).attr("data-gif"));
    }
  });
  // event listener to stop playback on hover
  $(".image").on("mouseleave", e => {
    if ($(e.target).attr("data-state") === "animate") {
      $(e.target).attr("data-state", "still");
      $(e.target).attr("src", $(e.target).attr("data-still"));
    }
  });
}

// add gif to favorites section on click of heart icon
function addToFavorites(favorites) {
  favorites.click(function(e) {
    if (e.target.className.includes("favorites")) {
      // display favorites div once item is added
      $(".favorite-container").show();
      // add favorites to top of favorites div
      $(".favorite-container").append(e.target.parentNode);
      // remove heart icon upon adding to favorites
      $(e.target).removeClass("favorites far fa-heart");
      // add x icon for removal from favorites
      $(e.target).addClass("fas fa-times");
    } else if (e.target.className.includes("fa-times")) {
      // pass down parent to remove from favorites function to remove entire image div from favorites
      removeFromFavorites(e.target.parentNode);
    }
  });
}

// remove item from favorites
function removeFromFavorites(parent) {
  $(parent).fadeOut();
}
