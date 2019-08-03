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

const searchString = `https://api.giphy.com/v1/gifs/search?api_key=0q2XqKx6Ynz8T8KJYTzu1FMObhUHEv0X&limit=10&rating=PG&lang=en&q=`;
let image;
topics.forEach((item, index) => {
  const button = `<button id="${index}">${item}</button>`;
  $(".buttons").append(button);
  $(`#${index}`).click(function() {
    chosenTopic = topics[index];
    $.ajax({
      url: searchString + chosenTopic,
      method: "GET"
    }).then(function(response) {
      response.data.forEach(element => {
        console.log(element)
        image = element
        $(".image-container").append(
          `<img src="${element.images.downsized_still.url}"></img>`);
      
      
      })
      $('img').mouseover(e => {
        console.log(e);
        $(e.target).attr('src', image.images.downsized.url)
      })
    });
  });
});
