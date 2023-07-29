const accessKey = "wJmUzaivtejGmUfoO4ujLNN_lFbiYu0KfItXjDlgM_E"

const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more");

let inputData = ""
let page = 1;

async function searchImages(){
    inputData = inputEl.value.trim();
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData.trim()}&client_id=${accessKey}`;
    

    console.log("InputData:", inputData);
    console.log("URL", url);

    const response = await fetch(url);
    const data = await response.json();
    console.log("API Response", data);

    const results = data.results;

    if(page===1){
        searchResults.innerHTML = "";
    }

    results.map((result) =>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");
        const image = document.createElement('img');
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imageLink = document.createElement('a');
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper);
    });

    page++;
    if(page>1){
        showMore.style.display="block";
    }
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault() // prevent form from submitting to server
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    searchImages();
});






/*This code is a JavaScript function that searches for images using the Unsplash API and displays the results on a webpage. Here's a step-by-step explanation of the code:

const accessKey = "wJmUzaivtejGmUfoO4ujLNN_lFbiYu0KfItXjDlgM_E": This line declares a constant variable accessKey that stores an access key required to make requests to the Unsplash API. An access key is typically used to authenticate and authorize the user to access the API.

DOM element selection:

const formEl = document.querySelector("form"): This line selects the first <form> element in the document and stores it in the variable formEl.
const inputEl = document.getElementById("search-input"): This line selects an element with the ID "search-input" (presumably an input field) and stores it in the variable inputEl.
const searchResults = document.querySelector(".search-results"): This line selects the first element with the class "search-results" (probably a container for displaying search results) and stores it in the variable searchResults.
const showMore = document.getElementById("show-more"): This line selects an element with the ID "show-more" (possibly a button to load more search results) and stores it in the variable showMore.
Two variables are declared:

let inputData = "": This variable will store the user input (trimmed) for the search query.
let page = 1: This variable keeps track of the current page of search results. It is initialized to 1.
async function searchImages(): This is an asynchronous function that performs the image search and displays the results.

inputData = inputEl.value.trim(): The user input from the input field is trimmed and stored in the inputData variable.

const url = ...: A URL is constructed using the inputData and accessKey variables to make a request to the Unsplash API for image search. The page variable is also used to fetch results for the specific page.

const response = await fetch(url): The fetch function is used to make a GET request to the specified URL, and the response is awaited.

const data = await response.json(): The response is parsed as JSON data, and the resulting JavaScript object is stored in the data variable.

const results = data.results: The search results array is extracted from the API response data.

If page is equal to 1, the searchResults container's HTML is cleared to remove previous search results.

The results.map((result) => { ... }) loop iterates through each image result and performs the following actions:

It creates a <div> element with the class "search-result" to wrap the image and the link.
It creates an <img> element and sets its src attribute to the URL of the small-sized image.
It sets the alt attribute of the image to the alternative description of the image.
It creates an <a> (anchor) element and sets its href attribute to the URL of the image on Unsplash (result.links.html).
The anchor element is set to open the link in a new tab using target="_blank".
The anchor's text content is set to the alternative description of the image.
The image and anchor elements are appended to the image wrapper, and the image wrapper is appended to the searchResults container.
After displaying the search results, the page variable is incremented.

If page is greater than 1, the "show more" button's display style is set to "block" to make it visible.

Event listeners:

formEl.addEventListener("submit", (event) => { ... }): This event listener is attached to the <form> element and listens for the "submit" event. When the form is submitted, the default form submission behavior is prevented using event.preventDefault(), and page is reset to 1. Then, the searchImages() function is called to perform the search.

showMore.addEventListener("click", () => { ... }): This event listener is attached to the "show more" button (probably a button to load more search results). When the button is clicked, the searchImages() function is called again to fetch and display more results.

In summary, this code allows the user to search for images using a search input field. The search results obtained from the Unsplash API are then displayed on the webpage. The "show more" button is used to load additional search results on demand. */