const infectedNumber = document.querySelector('.infected'),
    recoveredNumber  = document.querySelector('.recovered'),
    diedNumber       = document.querySelector('.died'),
    resultsBox       = document.querySelector('.results-box-list'),
    form             = document.querySelector('.search-form'),
    searchInput      = document.querySelector('#searchInput'),
    imagesNumber     = document.querySelector('#imagesNumber'),
    closeButton      = document.querySelector('.close-btn')

;(async function () {
    let response = await fetch("https://covid-19-tracking.p.rapidapi.com/v1", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0540c2b4a1mshfafba11fd229e45p1b9796jsn33b70550180e",
            "x-rapidapi-host": "covid-19-tracking.p.rapidapi.com"
        }
    })
    let data = await response.json()
    infectedNumber.textContent  = data[96]['Total Cases_text']
    recoveredNumber.textContent = data[96]['Total Recovered_text']
    diedNumber.textContent      = data[96]['Total Deaths_text']
})()

form.onsubmit = (e) => {
    e.preventDefault()
    ;(async function () {
        let response = await fetch(`https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI?q=${searchInput.value}&pageNumber=1&pageSize=${imagesNumber.value}&autoCorrect=true`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "0540c2b4a1mshfafba11fd229e45p1b9796jsn33b70550180e",
                "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
            }
        })
        let data = await response.json()
        imagesRenderer(data.value)
    })()
}

searchInput.onkeyup = () => {
    closeButton.style.display = 'block'
    closeButton.onclick = () => {
        searchInput.value = null
        closeButton.style.display = 'none'
    }
    if (searchInput.value == '') {
        closeButton.style.display = 'none'
        
    }
}

function imagesRenderer (array) {
    resultsBox.innerHTML = null
    for (let element of array) {
        let li  = document.createElement('li')
        let img = document.createElement('img')

        img.src = `${element.url}`

        li.appendChild(img)
        resultsBox.appendChild(li)
    }
}