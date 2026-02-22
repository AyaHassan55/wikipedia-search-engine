let resultsContainer = document.getElementsByClassName("container")[0]

// const validateInput = (el) => {
//     if(el.value === ""){
//         resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
//     }else{
//         debouncedGenerateResults(el.value, el)
//     }
// }
// debounce function to limit the number of API calls while typing
const debounce =(func, delay)=>{
    let currentTimeout
    return function(...args) {
        clearTimeout(currentTimeout)
        currentTimeout = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}


const generateResults = (searchValue, inputField) => {
    fetch(
        "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch="
        + searchValue
    )
    .then(response => response.json())
    .then(data => {
        let results = data.query.search
        let numberOfResults = data.query.search.length
        resultsContainer.innerHTML = ""
        for(let i=0; i<numberOfResults; i++) {
            let result = document.createElement("div")
            result.classList.add("results")
            result.innerHTML = `
            <div>
                <h3>${results[i].title}</h3>
                <p>${results[i].snippet}</p>
            </div>
            <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
            `
            resultsContainer.appendChild(result)
        }
        if(inputField.value === ""){
            resultsContainer.innerHTML = "<p>Type something in the above search input</p>"
        }
    })
}

// 
const input = document.getElementById("searchInput");

input.addEventListener(
    "input",
    debounce(function (e) {
        const value = e.target.value;

        if (value.trim() === "") {
            resultsContainer.innerHTML =
                "<p>Type something in the above search input</p>";
            return;
        }

        generateResults(value, e.target);
    }, 500)
);
