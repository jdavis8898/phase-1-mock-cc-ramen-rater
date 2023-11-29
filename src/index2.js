const url = "http://localhost:3000/ramens"

const navMenu = document.querySelector("#ramen-menu")

const detailImg = document.querySelector("div#ramen-detail img.detail-image")
const detailName = document.querySelector("div#ramen-detail h2.name")
const detailRest = document.querySelector("div#ramen-detail h3.restaurant")
const ratingDisplay = document.querySelector("#rating-display")
const commentDisplay = document.querySelector("#comment-display")

const newRamenForm = document.querySelector("#new-ramen")
const nameInput = document.querySelector("form#new-ramen input#new-name")
const restInput = document.querySelector("form#new-ramen input#new-restaurant")
const imgInput = document.querySelector("form#new-ramen input#new-image")
const ratingInput = document.querySelector("form#new-ramen input#new-rating")
const commentInput = document.querySelector("form#new-ramen input#new-rating")

let ramenCopy

function getRamen()
{
    fetch(url)
        .then(resp => resp.json())
        .then(ramenData => 
            {
                ramenCopy = ramenData
                createNavBar(ramenData)
                displayDetails(ramenData[0])
                addRamen()
            })
}

function createNavBar(ramens)
{
    navMenu.innerText = ""
    ramens.forEach(ramen => 
        {
            displayImg = document.createElement("img")
            displayImg.src = ramen.image
            navMenu.appendChild(displayImg)

            displayImg.addEventListener("click", () => displayDetails(ramen))
        })
}

function displayDetails(ramen)
{
    detailImg.src = ramen.image
    detailName.innerText = ramen.name
    detailRest.innerText = ramen.restaurant
    ratingDisplay.innerText = ramen.rating
    commentDisplay.innerText = ramen.comment
}

function addRamen()
{
    newRamenForm.addEventListener("submit", (e) => 
    {
        e.preventDefault()

        const newRamen = 
        {
            name: nameInput.value,
            restaurant: restInput.value,
            image: imgInput.value,
            rating: ratingInput.value,
            comment: commentInput.value
        }

        ramenCopy.push(newRamen)
        createNavBar(ramenCopy)

        newRamenForm.reset()
    })
}

getRamen()