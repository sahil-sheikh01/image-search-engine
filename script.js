const accessKey = "rJThhJPjEtSUktG0CMay3308O-fNfFkTBoc7OjlgiOg";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMore = document.getElementById("show-more");

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos/?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if(page === 1){
        searchResult.innerHTML = "";
    };

    results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const anchor = document.createElement("a");
        anchor.href = result.links.html;
        anchor.target = "_blank";

        anchor.appendChild(image);
        searchResult.appendChild(anchor);
    });
    showMore.style.display = "block";
};

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMore.addEventListener("click", () => {
    page++;
    searchImages();
});