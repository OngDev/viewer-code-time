const apiUrl = ""
let timeStamp = "hour"

const updateList = async function () {
    // const usersInfo = await fetch(`${apiUrl}/users?by=${timeStamp}`).then(response => response.json())
    const usersInfo = [
        {
            name: "Phạm Công",
            url: "https://github.com/PhamCong01/weather-app",
            publicRepos: ["repo1", "repo2"],
            time: 12,
        },
        {
            name: "Jack Do",
            url: "https://github.com/jackdo1012",
            publicRepos: ["repo1", "repo2"],
            time: 1,
        },
        {
            name: "Jack Do",
            url: "https://github.com/jackdo1012",
            publicRepos: ["repo1", "repo2"],
            time: 1,
        },
        {
            name: "Test",
            url: "https://github.com/test",
            publicRepos: ["repo1", "repo2"],
            time: 1145888,
        },
        {
            name: "Ông Dev",
            url: "https://github.com/ongdev",
            publicRepos: ["repo1", "repo2"],
            time: 1123,
        },
        {
            name: "Phạm Công",
            url: "https://github.com/PhamCong01/weather-app",
            publicRepos: ["repo1", "repo2"],
            time: 12,
        },
        {
            name: "Jack Do",
            url: "https://github.com/jackdo1012",
            publicRepos: ["repo1", "repo2"],
            time: 1,
        },
        {
            name: "Jack Do",
            url: "https://github.com/jackdo1012",
            publicRepos: ["repo1", "repo2"],
            time: 1,
        },
        {
            name: "Test",
            url: "https://github.com/test",
            publicRepos: ["repo1", "repo2"],
            time: 1145888,
        },
        {
            name: "Ông Dev",
            url: "https://github.com/ongdev",
            publicRepos: ["repo1", "repo2"],
            time: 1123,
        },
    ]

    // main ul
    const itemListNode = document.querySelector(".item")
    itemListNode.innerHTML = ""

    usersInfo.forEach((user) => {
        // create item__container
        const itemContainerNode = document.createElement("div")
        itemContainerNode.className = "item__container"

        // userBackInfo div
        const userBasicInfoNode = document.createElement("div")

        // username
        const userNameNode = document.createElement("li")
        userNameNode.className = "item__name"
        userNameNode.innerHTML = `<i class="far fa-smile"></i> Name: ${user.name}`

        // user url
        const urlNode = document.createElement("li")
        urlNode.className = "item__url"
        urlNode.innerHTML = `<a class="link" target="_blank" href="${user.url}">GitHub: ${user.url}</a>`

        // url public repos
        const publicRepos = document.createElement("li")
        publicRepos.className = "repositories"
        publicRepos.innerHTML = `Public repositories: <span>${user.publicRepos.length}</span>`

        //

        // append to userBasicInfo div
        userBasicInfoNode.appendChild(userNameNode)
        userBasicInfoNode.appendChild(urlNode)
        userBasicInfoNode.appendChild(publicRepos)

        // time div
        const timeNode = document.createElement("div")
        timeNode.className = "time__item"
        timeNode.innerHTML = `${user.time} hours`

        // create div for button
        const buttonContainer = document.createElement("div")
        buttonContainer.className = "button__container"

        // create button see more
        const buttonMore = document.createElement("button")
        buttonMore.className = "buttonMore"
        buttonMore.innerHTML = "See more"

        // append button to div
        buttonContainer.appendChild(buttonMore)
        
        // append userBasicInfo and time and buttonMore to item__container
        itemContainerNode.appendChild(userBasicInfoNode)
        itemContainerNode.appendChild(timeNode)
        itemContainerNode.appendChild(buttonContainer)

        // append item__container to main ul
        itemListNode.appendChild(itemContainerNode)
    })

    
     
    }
    
window.onload = () => {
    updateList()
    
    const timeStampHoursNode = document.querySelector(".time.time__hours")
    const timeStampDayNode = document.querySelector(".time.time__day")
    const timeStampMonthNode = document.querySelector(".time__month")
    const timeStampYearNode = document.querySelector(".time__year")
    const buttonContainer = document.querySelectorAll(".button__container")
    const dashboardChildNode = document.querySelector(".dashboard__child")
    const overLay = document.querySelector(".dashboard__overlay")
    const iconExit = document.querySelector(".times-exit")

    timeStampHoursNode.onclick = () => {
        timeStamp = "hour"
        timeStampHoursNode.classList.add("time__selected")
        timeStampDayNode.classList.remove("time__selected")
        timeStampMonthNode.classList.remove("time__selected")
        timeStampYearNode.classList.remove("time__selected")
        updateList()
    }

    timeStampDayNode.onclick = () => {
        timeStamp = "day"
        timeStampHoursNode.classList.remove("time__selected")
        timeStampDayNode.classList.add("time__selected")
        timeStampMonthNode.classList.remove("time__selected")
        timeStampYearNode.classList.remove("time__selected")
        updateList()
    }

    timeStampMonthNode.onclick = () => {
        timeStamp = "month"
        timeStampHoursNode.classList.remove("time__selected")
        timeStampDayNode.classList.remove("time__selected")
        timeStampMonthNode.classList.add("time__selected")
        timeStampYearNode.classList.remove("time__selected")
        updateList()
    }

    timeStampYearNode.onclick = () => {
        timeStamp = "year"
        timeStampHoursNode.classList.remove("time__selected")
        timeStampDayNode.classList.remove("time__selected")
        timeStampMonthNode.classList.remove("time__selected")
        timeStampYearNode.classList.add("time__selected")
        updateList()
    }

    // click button open dashboard
    buttonContainer.forEach(button => {
        button.onclick = () => {
            dashboardChildNode.classList.add("active")
            overLay.classList.add("active")
        }
    })

    // click remove dashboard and overLay
    overLay.onclick = () => {
        dashboardChildNode.classList.remove("active")
        overLay.classList.remove("active")
    }
    // click remove dashboard and overLay
    iconExit.onclick = () => {
        dashboardChildNode.classList.remove("active")
        overLay.classList.remove("active")
    }
}
