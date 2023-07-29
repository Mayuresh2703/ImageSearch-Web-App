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


