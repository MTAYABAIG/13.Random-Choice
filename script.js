const tagsEl = document.getElementById("tags");
const textarea = document.getElementById("textarea");

textarea.focus();

textarea.addEventListener("keyup", (e) => {
  createTags(e.target.value);

  if (e.key == "Enter") {
    // Clear the textarea value after a short delay
    setTimeout(() => {
      e.target.value = "";
    }, 10);
    randomSelect();
  }
});

function createTags(input) {
  // Split the input value by commas, filter out empty or whitespace-only tags, and trim the remaining tags
  const tags = input
    .split(",")
    .filter((tag) => tag.trim() !== "")
    .map((tag) => tag.trim());

  // Clear the existing tags in the tagsEl element
  tagsEl.innerHTML = "";

  // Create HTML elements for each tag and append them to the tagsEl element
  tags.forEach((element) => {
    const tagEl = document.createElement("span");
    tagEl.classList.add("tag");
    tagEl.innerText = element;
    tagsEl.appendChild(tagEl);
  });
}

function randomSelect() {
  const times = 30;

  // Set an interval to repeat every 100 milliseconds
  const interval = setInterval(() => {
    const randomTag = pickRandomTag();

    // Highlight the selected random tag
    highlightTag(randomTag);

    // After a 100 milliseconds delay, remove the highlight from the tag
    setTimeout(() => {
      unhighlightTag(randomTag);
    }, 100);
  }, 100);

  // After a specified number of iterations, clear the interval and highlight a random tag
  setTimeout(() => {
    clearInterval(interval);

    setTimeout(() => {
      const randomTags = pickRandomTag();
      highlightTag(randomTags);
    }, 100);
  }, times * 100);
}

function pickRandomTag() {
  // Select all HTML elements with the class "tag"
  const tags = document.querySelectorAll(".tag");

  // Return a randomly chosen tag from the selected elements
  return tags[Math.floor(Math.random() * tags.length)];
}

function highlightTag(tag) {
  // Add the "highlight" class to the specified tag element
  tag.classList.add("highlight");
}

function unhighlightTag(tag) {
  // Remove the "highlight" class from the specified tag element
  tag.classList.remove("highlight");
}
