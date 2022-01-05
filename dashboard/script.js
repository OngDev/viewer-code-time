const apiUrl = "https://viewerapi.ongdev.com/api"
let timeStamp = "date" // date - week - month - year

function formatTimeFromSec(sec) {
    var sec_num = parseInt(sec, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}
const updateList = async function () {
    const usersInfo = await fetch(`${apiUrl}/users?by=${timeStamp}`).then(
        (response) => response.json()
    )

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
        userNameNode.innerHTML = `<img src="${user.avatarUrl}" class="item__name-avatar" /><div class="item__name-name"> Name: ${user.name}</div>`

        // user url
        const urlNode = document.createElement("li")
        urlNode.className = "item__url"
        urlNode.innerHTML = `<a class="link" target="_blank" href="${user.url}">GitHub: ${user.nickname}</a>`

        // url public repos
        const publicRepos = document.createElement("li")
        publicRepos.className = "repositories"
        publicRepos.innerHTML = `Public repositories: <span>${user.repos.length}</span>`

        // append to userBasicInfo div
        userBasicInfoNode.appendChild(userNameNode)
        userBasicInfoNode.appendChild(urlNode)
        userBasicInfoNode.appendChild(publicRepos)

        // time div
        const timeNode = document.createElement("div")
        timeNode.className = "time__item"
        timeNode.innerHTML = `${formatTimeFromSec(user.totalTime)}`

        // create div for button
        const buttonContainer = document.createElement("div")
        buttonContainer.className = "button__container"

        // create see more button
        const buttonMore = document.createElement("button")
        buttonMore.className = "buttonMore"
        buttonMore.innerHTML = "See more"
        buttonMore.onclick = () => renderChildDashboard(user.repos)

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

const renderChildDashboard = function (repos) {
    const buttonContainer = document.querySelectorAll(".button__container")
    const dashboardChildNode = document.querySelector(".dashboard__child")
    const overlayNode = document.querySelector(".dashboard__overlay")
    const exitIconNode = document.querySelector(".times-exit")

    // click button open dashboard
    buttonContainer.forEach((button) => {
        button.onclick = () => {
            dashboardChildNode.classList.add("active")
            overlayNode.classList.add("active")
        }
    })

    // click remove dashboard and overLay
    overlayNode.onclick = () => {
        dashboardChildNode.classList.remove("active")
        overlayNode.classList.remove("active")
    }
    // click remove dashboard and overLay
    exitIconNode.onclick = () => {
        dashboardChildNode.classList.remove("active")
        overlayNode.classList.remove("active")
    }

    // child dashboard container
    const dashboardContainerNode = document.querySelector(
        ".dashboard__container"
    )
    dashboardContainerNode.innerHTML = ""

    // click button open dashboard
    buttonContainer.forEach((button) => {
        button.onclick = () => {
            dashboardChildNode.classList.add("active")
            overlayNode.classList.add("active")
        }
    })

    // click remove dashboard and overLay
    overlayNode.onclick = () => {
        dashboardChildNode.classList.remove("active")
        overlayNode.classList.remove("active")
    }
    // click remove dashboard and overLay
    exitIconNode.onclick = () => {
        dashboardChildNode.classList.remove("active")
        overlayNode.classList.remove("active")
    }

    repos.forEach((repo) => {
        // each repos
        const eachReposNode = document.createElement("div")
        eachReposNode.className = "dashboard__child-content"

        // repo basic info
        const repoInfoNode = document.createElement("div")

        // repo title
        const repoTitleNode = document.createElement("h5")
        repoTitleNode.innerHTML = repo.name
        repoTitleNode.className = "content__title"

        // repo description
        const repoDescriptionNode = document.createElement("h5")
        repoDescriptionNode.innerHTML = repo.description
        repoDescriptionNode.className = "content__description"

        // appen title and description to basic info
        repoInfoNode.appendChild(repoTitleNode)
        repoInfoNode.appendChild(repoDescriptionNode)

        // go to div
        const goToDivNode = document.createElement("div")
        goToDivNode.className = "child__button"

        // go to btn
        const goToBtnNode = document.createElement("button")
        goToBtnNode.innerHTML = "GO TO"
        goToBtnNode.className = "button_go"
        goToBtnNode.onclick = () => window.open(repo.link)

        // append close btn to clost btn div node
        goToDivNode.appendChild(goToBtnNode)

        // append basic info and go to btn to each repos
        eachReposNode.appendChild(repoInfoNode)
        eachReposNode.appendChild(goToDivNode)

        // append repo to dashboard
        dashboardContainerNode.appendChild(eachReposNode)
    })
}

const loginAction = async function (e) {
    e.preventDefault()
    const email = e.target.nameEmail.value
    const pass = e.target.password.value
    console.log("login")
}

const formLogin = function () {
    const iconLogin = document.querySelector(".login")
    const form = document.querySelector(".form__container")
    const overlay = document.querySelector(".dashboard__overlay")
    const login = document.querySelector(".login__form")
    const exitIcon = document.querySelector(".form__exit")

    // set login submission
    login.onsubmit = (e) => loginAction(e)

    // open form login
    iconLogin.onclick = () => {
        form.style.display = "block"
        overlay.classList.add("active")
    }

    // close form login
    exitIcon.onclick = () => {
        overlay.classList.remove("active")
        form.style.display = "none"
    }
    overlay.onclick = () => {
        overlay.classList.remove("active")
        form.style.display = "none"
    }
}

window.onload = () => {
    updateList()
    //formLogin()

    const timeStampDayNode = document.querySelector(".time.time__day")
    const timeStampWeekNode = document.querySelector(".time.time__week")
    const timeStampMonthNode = document.querySelector(".time__month")
    const timeStampYearNode = document.querySelector(".time__year")

    // change timestamp
    timeStampDayNode.onclick = () => {
        if (timeStamp !== "date") {
            timeStamp = "date"
            timeStampDayNode.classList.add("time__selected")
            timeStampWeekNode.classList.remove("time__selected")
            timeStampMonthNode.classList.remove("time__selected")
            timeStampYearNode.classList.remove("time__selected")
            updateList()
        }
    }

    timeStampWeekNode.onclick = () => {
        if (timeStamp !== "week") {
            timeStamp = "week"
            timeStampDayNode.classList.remove("time__selected")
            timeStampWeekNode.classList.add("time__selected")
            timeStampMonthNode.classList.remove("time__selected")
            timeStampYearNode.classList.remove("time__selected")
            updateList()
        }
    }

    timeStampMonthNode.onclick = () => {
        if (timeStamp !== "month") {
            timeStamp = "month"
            timeStampDayNode.classList.remove("time__selected")
            timeStampWeekNode.classList.remove("time__selected")
            timeStampMonthNode.classList.add("time__selected")
            timeStampYearNode.classList.remove("time__selected")
            updateList()
        }
    }

    timeStampYearNode.onclick = () => {
        if (timeStamp !== "year") {
            timeStamp = "year"
            timeStampDayNode.classList.remove("time__selected")
            timeStampWeekNode.classList.remove("time__selected")
            timeStampMonthNode.classList.remove("time__selected")
            timeStampYearNode.classList.add("time__selected")
            updateList()
        }
    }
}
