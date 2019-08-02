const topics = [
  "goodfellas",
  "dogs",
  "mind+blown",
  "timelapse",
  "work",
  "american+psycho",
  "fight+club",
  "space",
  "assassins+creed+odyssey",
  "gta v"
];

let chosenTopic;

const searchString = `https://api.giphy.com/v1/gifs/search?api_key=0q2XqKx6Ynz8T8KJYTzu1FMObhUHEv0X&limit=10&rating=PG&lang=en&q=`;

topics.forEach((item, index) => {
  const button = `<button id="${index}">${item}</button>`;
  $(".buttons").append(button);
  $(`#${index}`).click(function() {
    chosenTopic = topics[index];
    console.log(searchString + chosenTopic);
    searchString + chosenTopic;
    $.ajax({
      url: searchString + chosenTopic,
      method: "GET"
    }).then(function(response) {
      console.log(response.data);
      $(".image-container").append(
        `<img src="${response.data[3].images.downsized.url}"></img>`
      );
      //   $(".image-container").append(`<p>oh hey</p>`);
    });
  });
});
