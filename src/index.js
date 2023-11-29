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

        // Replaced the 2 lines below with the POST request so this persists through refreshes
        // ramenCopy.push(newRamen)
        // createNavBar(ramenCopy)

        fetch(url, 
        {
            method: "POST",
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newRamen)
        })
        .then(resp => 
            {
                if(resp.ok === true)
                {
                    resp.json().then(newRamen => 
                        {
                            ramenCopy.push(newRamen)
                            createNavBar(ramenCopy)
                            displayDetails(newRamen)
                        })
                }

                else 
                {
                    alert("Error: Unable to add new ramen!")
                }
            })

        newRamenForm.reset()
    })
}

function updateRamen()
{
    editForm.addEventListener("submit", (e) => 
    {
        e.preventDefault()

        // Patch code replaces lines 120-133 which makes it persist through refreshes
        // currentRamen.rating = updatedRating.value
        // currentRamen.comment = updatedComment.value

        // ramenCopy.forEach(ramen => 
        //     {
        //         if(currentRamen.name === ramen.name)
        //         {
        //             ramen.rating = updatedRating.value
        //             ramen.comment = updatedComment.value
        //         }
        //     })

        // createNavBar(ramenCopy)
        // displayDetails(currentRamen)

        fetch(`${url}/${currentRamen.id}`,
        {
            method: "PATCH",
            headers: 
            {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
            {
                rating: updatedRating.value,
                comment: updatedComment.value
            })
        })
        .then(resp => resp.json())
        .then(updatedRamen => 
            {
                ramenCopy = ramenCopy.map(ramen =>
                    {
                        if(ramen.name === updatedRamen.name)
                        {
                            return updatedRamen
                        }

                        else
                        {
                            return ramen
                        }
                    })

                displayDetails(updatedRamen)
                createNavBar(ramenCopy)
            })

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
        fetch(`${url}/${currentRamen.id}`, 
        {
            method: "DELETE"
        })
        .then(resp => 
            {
                if(resp.ok)
                {
                    ramenCopy = ramenCopy.filter(ramen => 
                        {
                            return currentRamen.id !== ramen.id
                        })
                    displayDetails(ramenCopy[0])
                    createNavBar(ramenCopy)
                    alert("Ramen deleted!")
                }

                else
                {
                    alert("Error: Unable to delete ramen!")
                }
            })
    })
}

getRamen()