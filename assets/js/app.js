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

topics.forEach((item, index) => {
  const button = `<button id="${index}">${item}</button>`;
  $(".buttons").append(button);
  $(`#${index}`).click(function() {
    console.log(topics[index], "clicked");
  });
});
