const apiUrl = ""
let timeStamp = "hour"

const updateList = async function () {
    // const usersInfo = await fetch(`${apiUrl}/users?by=${timeStamp}`).then(response => response.json())
    const usersInfo = [
        {
            name: "Phạm Công",
            url: "https://github.com/PhamCong01/weather-app",
            publicRepos: 100,
            time: 12,
        },
        {
            name: "Jack Do",
            url: "https://github.com/jackdo1012",
            publicRepos: 10,
            time: 1,
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
        urlNode.innerHTML = `<a class="link" target="_blank" href="${user.url}">${user.url}</a>`

        // url public repos
        const publicRepos = document.createElement("li")
        publicRepos.className = "repositories"
        publicRepos.innerHTML = `Public repositories: <span>${user.publicRepos}</span>`

        // append to userBasicInfo div
        userBasicInfoNode.appendChild(userNameNode)
        userBasicInfoNode.appendChild(urlNode)
        userBasicInfoNode.appendChild(publicRepos)

        // time div
        const timeNode = document.createElement("div")
        timeNode.className = "time__item"
        timeNode.innerHTML = `${user.time} hours`

        // append userBasicInfo and time to item__container
        itemContainerNode.appendChild(userBasicInfoNode)
        itemContainerNode.appendChild(timeNode)

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

    timeStampHoursNode.onclick = () => {
        timeStamp = "hour"
        updateList()
    }

    timeStampDayNode.onclick = () => {
        timeStamp = "day"
        updateList()
    }

    timeStampMonthNode.onclick = () => {
        timeStamp = "month"
        updateList()
    }

    timeStampYearNode.onclick = () => {
        timeStamp = "year"
        updateList()
    }
}
