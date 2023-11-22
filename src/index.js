const url = "http://localhost:3000/ramens"

const ramenMenuElement = document.querySelector("#ramen-menu")

const detailImageElement = document.querySelector("div#ramen-detail img.detail-image")
const nameElement = document.querySelector("div#ramen-detail h2.name")
const restaurantElement = document.querySelector("div#ramen-detail h3.restaurant")
const ratingDisplayElement = document.querySelector("#rating-display")
const commentDisplayElement = document.querySelector("#comment-display")

const newRamenFormElement = document.querySelector("#new-ramen")
const formNameElement = document.querySelector("form#new-ramen input#new-name")
const formRestaurantElement = document.querySelector("form#new-ramen input#new-restaurant")
const formImageElement = document.querySelector("form#new-ramen input#new-image")
const formRatingElement = document.querySelector("form#new-ramen input#new-rating")
const formCommentElement = document.querySelector("form#new-ramen input#new-rating")

let ramenList

function menu(url)
{
    fetch(url)
        .then (resp => resp.json())
        .then (ramenData => {
            displayRamenMenu(ramenData)

            displayRamenDetails(ramenData[0])

            createNewRamen()
        })
}

function displayRamenMenu(ramens)
{
    if (Array.isArray(ramens))
    {
        ramens.forEach(ramen => {
            const ramenMenuImageElement = document.createElement("img")
            ramenMenuImageElement.src = ramen.image
            ramenMenuElement.appendChild(ramenMenuImageElement)
    
            ramenMenuImageElement.addEventListener("click", () => displayRamenDetails(ramen))
            })
    }
    
    else
    {
        const ramenMenuImageElement = document.createElement("img")
        ramenMenuImageElement.src = ramens.image
        ramenMenuElement.appendChild(ramenMenuImageElement)

        ramenMenuImageElement.addEventListener("click", () => displayRamenDetails(ramens))
    }
}

function displayRamenDetails(ramen)
{
    detailImageElement.src = ramen.image
    nameElement.innerText = ramen.name
    restaurantElement.innerText = ramen.restaurant
    ratingDisplayElement.innerText = ramen.rating
    commentDisplayElement.innerText = ramen.comment
}

function createNewRamen()
{
    newRamenFormElement.addEventListener("submit", event => {
        event.preventDefault()

        const newRamen = {
            name: formNameElement.value,
            restaurant: formRestaurantElement.value,
            image: formImageElement.value,
            rating: formRatingElement.value,
            comment: formCommentElement.value
        }

        displayRamenMenu(newRamen)
        newRamenFormElement.reset()
    })
}

menu(url)