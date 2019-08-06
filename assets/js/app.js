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

$("#clear-button").click(() => {
  $(".image-container").fadeOut(500);
});

function renderButtons() {
  // clear existing buttons
  $(".buttons").empty();
  // create buttons from topics array
  topics.forEach((item, index) => {
    const button = $(`<button id="${index}">${item}</button>`).addClass(
      "button"
    );
    $(".buttons").prepend(button);
    // .hide()
    // .fadeIn(500);
    // add event listeners for created buttons
    $(`#${index}`).click(() => {
      let chosenTopic = topics[index];
      // api request
      $.ajax({
        url: searchString + chosenTopic,
        method: "GET"
      }).then(function(response) {
        console.log(response);
        // clear images on new request
        $(".image-container").empty();
        response.data.forEach(element => {
          const image_div = $("<div></div>").addClass("image");
          const ratingDisplay = $(
            `<p>Rating: ${element.rating.toUpperCase()}</p>`
          ).addClass("rating");
          const gifImage = $(
            `<img src="${element.images.fixed_height_still.url}" data-gif="${
              element.images.fixed_height.url
            }" data-still="${element.images.fixed_height_still.url}"></img>`
          );
          image_div.append(gifImage);
          image_div.append(ratingDisplay);
          $(".image-container")
            .prepend(image_div)
            .hide()
            .fadeIn(500);
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
