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

function renderButtons() {
  $(".favorite-container").hide();
  $(".buttons").empty();
  topics.forEach(item => {
    const button = $(`<button>${item}</button>`).addClass(
      "button rendered-button"
    );
    $(".buttons").prepend(button);
  });
  $(".rendered-button").click(function(e) {
    chosenTopic = $(this).text();
    apiCall();
  });
}

renderButtons();

function apiCall() {
  const searchString = `https://api.giphy.com/v1/gifs/search?api_key=0q2XqKx6Ynz8T8KJYTzu1FMObhUHEv0X&limit=10&rating=PG&lang=en&q=`;
  $.ajax({
    url: searchString + chosenTopic
  }).then(function(response) {
    response.data.forEach(item => {
      stillImage = item.images.fixed_height_still.url;
      animatedImage = item.images.fixed_height.url;
      rating = item.rating;
      renderImages();
    });
  });
}

function renderImages() {
  const image_div = $("<div></div>").addClass("image");
  const ratingDisplay = $(`<p>Rating: ${rating.toUpperCase()}</p>`).addClass(
    "rating"
  );
  const gifImage = $(
    `<img src="${stillImage}" data-gif="${animatedImage}" data-still="${stillImage}" data-state="still"></img>`
  );
  // icon to add gif to favorites
  const favorites = $(`<i></i>`).addClass("favorites far fa-heart");
  image_div.append(gifImage);
  image_div.append(ratingDisplay);
  image_div.append(favorites);
  // display image_div
  $(".image-container")
    .prepend(image_div)
    .hide()
    .fadeIn(500);
  $(".image").on("mouseenter", e => {
    if ($(e.target).attr("data-state") === "still") {
      $(e.target).attr("data-state", "animate");
      $(e.target).attr("src", $(e.target).attr("data-gif"));
    }
  });
  $(".image").on("mouseleave", e => {
    if ($(e.target).attr("data-state") === "animate") {
      $(e.target).attr("data-state", "still");
      $(e.target).attr("src", $(e.target).attr("data-still"));
    }
  });
}
