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

$("#add-button").click(function() {
  console.log("clicked");
  topics.push($("#topic-input").val());
  console.log(topics);
  makeStuff();
});
function makeStuff() {
  $(".buttons").empty();
  topics.forEach((item, index) => {
    const button = `<button id="${index}">${item}</button>`;
    $(".buttons").append(button);
    $(`#${index}`).click(function() {
      let chosenTopic = topics[index];
      $.ajax({
        url: searchString + chosenTopic,
        method: "GET"
      }).then(function(response) {
        $(".image-container").empty();
        response.data.forEach(element => {
          console.log(element);
          $(".image-container").append(
            `<img src="${element.images.downsized_still.url}" data-gif="${
              element.images.downsized.url
            }" data-still="${element.images.downsized_still.url}"></img>`
          );
        });
        $("img").mouseenter(function(e) {
          $(e.target).attr("src", $(e.target).attr("data-gif"));
        });
        $("img").mouseleave(function(e) {
          $(e.target).attr("src", $(e.target).attr("data-still"));
        });
      });
    });
  });
}
