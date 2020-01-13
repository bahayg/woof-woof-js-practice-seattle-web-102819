document.addEventListener("DOMContentLoaded", function(){
    getPups()
})

const getPups = () => {
    fetch("http://localhost:3000/pups")
    .then(res => res.json())
    .then(data => getEachPup(data))
}

const getEachPup = (data) => {
    data.forEach(pup => {
        spanPup(pup)
    });
}

const spanPup = (pup) => {
    const dogBar = document.getElementById("dog-bar")
    const span = document.createElement("span")
    span.innerText = pup.name
    span.addEventListener("click", function() {
        const dogInfo = document.getElementById("dog-info")
        dogInfo.innerHTML = ""
        dogBar.innerHTML = ""
            getPups()
            showPupDetails(pup)
    })
    dogBar.appendChild(span)
}

const showPupDetails = (pup) => {
    const dogInfo = document.getElementById("dog-info")

    const img = document.createElement("img")
    img.src = pup.image

    const h2 = document.createElement("h2")
    h2.innerText = pup.name

    const button = document.createElement("button")
    if (pup.isGoodDog) {
        button.innerText = "Good Dog!"
    } else {
        button.innerText = "Bad Dog!"
    }
    button.addEventListener("click", function() {
        dogInfo.innerHTML = ""
            patchPup(pup)
    })

    dogInfo.appendChild(img)
    dogInfo.appendChild(h2)
    dogInfo.appendChild(button)
}

const patchPup = (pup) => {
    let dogStatus = pup.isGoodDog
    dogStatus = !dogStatus
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify ({
            isGoodDog: dogStatus
        })
    })
    .then(res => res.json())
    .then(data => showPupDetails(data))
}