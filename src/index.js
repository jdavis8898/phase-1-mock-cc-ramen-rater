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
const commentInput = document.querySelector("form#new-ramen textarea#new-comment")

const editForm = document.querySelector("#edit-ramen")
const updatedRating = document.querySelector("form#edit-ramen input#new-rating")
const updatedComment = document.querySelector("form#edit-ramen textarea#new-comment")

let ramenCopy
let currentRamen

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
                updateRamen()
                deleteRamen()
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
    currentRamen = ramen

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

function updateRamen()
{
    editForm.addEventListener("submit", (e) => 
    {
        e.preventDefault()

        currentRamen.rating = updatedRating.value
        currentRamen.comment = updatedComment.value

        ramenCopy.forEach(ramen => 
            {
                if(currentRamen.name === ramen.name)
                {
                    ramen.rating = updatedRating.value
                    ramen.comment = updatedComment.value
                }
            })

        createNavBar(ramenCopy)
        displayDetails(currentRamen)

        editForm.reset()
    })
}

function deleteRamen()
{
    const deleteButton = document.createElement("input")
    deleteButton.type = "submit"
    deleteButton.value = "Delete Ramen"
    deleteButton.style.background = "#DB1200"
    document.body.appendChild(deleteButton)
    const ramenCopy2 = []


    deleteButton.addEventListener("click", () => 
    {
        for(let i = 0; i < ramenCopy.length(); i++)
        {
            if (ramenCopy[i] === currentRamen)
            {
                
            }
        }
        // ramenCopy.forEach(ramen => 
        // {
        //     if(ramen.name !== currentRamen.name && !ramenCopy2.includes(currentRamen))
        //     {
        //         ramenCopy2.push(ramen)
        //     }

        //     else if (ramen.name === currentRamen.name)
        // })

        createNavBar(ramenCopy2)
        displayDetails(ramenCopy2[0])
    })
}

getRamen()