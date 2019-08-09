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

// let chosenTopic;

const searchString = `https://api.giphy.com/v1/gifs/search?api_key=0q2XqKx6Ynz8T8KJYTzu1FMObhUHEv0X&limit=10&rating=PG&lang=en&q=`;

renderButtons();

$("#add-button").click(() => {
  // ensures a value is entered into input
  if ($("#topic-input").val() !== "") {
    // add new topic to topics array for rendering
    topics.push($("#topic-input").val());
    renderButtons();
  }
});
// clear displayed gifs
$("#clear-button").click(() => {
  $(".image-container").fadeOut(500);
});

// this function is pretty much the whole app

function renderButtons() {
  // clear existing buttons
  $(".buttons").empty();
  $(".favorite-container").hide();

  // create buttons from topics array
  topics.forEach((item, index) => {
    const button = $(`<button id="${index}">${item}</button>`).addClass(
      "button"
    );
    // add buttons to page
    $(".buttons").prepend(button);
    // add event listeners for created buttons
    $(`#${index}`).click(() => {



      let chosenTopic = topics[index];
      $(".image-container").fadeOut(1000);
      // api request
      $.ajax({
        url: searchString + chosenTopic,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        // clear images on new request
        $(".image-container")
          .fadeOut(1000)
          .empty();
        response.data.forEach(element => {
          // variables for creating image_div
          const image_div = $("<div></div>").addClass("image");
          const ratingDisplay = $(
            `<p>Rating: ${element.rating.toUpperCase()}</p>`
          ).addClass("rating");
          const gifImage = $(
            `<img src="${element.images.fixed_height_still.url}" data-gif="${
              element.images.fixed_height.url
            }" data-still="${element.images.fixed_height_still.url}"></img>`
          );
          // icon to add gif to favorites
          const favorites = $(`<i></i>`).addClass("favorites far fa-heart");
          // add items to create image_div
          image_div.append(gifImage);
          image_div.append(ratingDisplay);
          image_div.append(favorites);
          // display image_div
          $(".image-container")
            .prepend(image_div)
            .hide()
            .fadeIn(500);
        });
        // click listener for favorites icon
        $(".favorites").click(e => {
          // variable for user to remove gif from favorites
          const removeIcon = $(`<i></i>`).addClass("fas fa-times");
          console.log(e);
          // display favoirites container
          $(".favorite-container").fadeIn();
          // append parent div to favorites
          $(".favorite-container").append(e.target.parentNode);
          // remove heart icon when gif is appended to favorites
          $(e.target).remove(".favorites");
          // add x icon for removal from favorites
          $(`.favorite-container > .image`).append(removeIcon);
          // remove gif container when removeIcon is clicked
          removeIcon.click(e => {
            console.log(this);
            $(e.target.parentNode).fadeOut(700);
          });
        });
        // on hover, gif plays
        $("img").mouseenter(function() {
          $(this).attr("src", $(this).attr("data-gif"));
        });
        // on mouseout, gif stops playing
        $("img").mouseleave(function() {
          $(this).attr("src", $(this).attr("data-still"));
        });
      });
    });
  });
}
