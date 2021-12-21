const apiUrl = ""
let timeStamp = "hour" // hour / day / month / year

const updateList = async function () {
    // const usersInfo = await fetch(`${apiUrl}/users?by=${timeStamp}`).then(response => response.json())
    const usersInfo = [
        {
            fullName: "Phạm Công",
            username: "PhamCong01",
            repos: [
                {
                    name: "Repo 1",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tellus urna, porta non ligula id, pellentesque iaculis mauris. Aliquam quis nisl eget sem dapibus feugiat nec eget sapien. Nam pellentesque sem augue, in aliquet metus imperdiet a. Mauris sit amet malesuada justo, sed lobortis nunc",
                    url: "https://github.com/PhamCong01/weather-app",
                },
                {
                    name: "Repo 1",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tellus urna, porta non ligula id, pellentesque iaculis mauris. Aliquam quis nisl eget sem dapibus feugiat nec eget sapien. Nam pellentesque sem augue, in aliquet metus imperdiet a. Mauris sit amet malesuada justo, sed lobortis nunc",
                    url: "https://github.com/PhamCong01/weather-app",
                },
                {
                    name: "Repo 1",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tellus urna, porta non ligula id, pellentesque iaculis mauris. Aliquam quis nisl eget sem dapibus feugiat nec eget sapien. Nam pellentesque sem augue, in aliquet metus imperdiet a. Mauris sit amet malesuada justo, sed lobortis nunc",
                    url: "https://github.com/PhamCong01/weather-app",
                },
                {
                    name: "Repo 1",
                    description:
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam tellus urna, porta non ligula id, pellentesque iaculis mauris. Aliquam quis nisl eget sem dapibus feugiat nec eget sapien. Nam pellentesque sem augue, in aliquet metus imperdiet a. Mauris sit amet malesuada justo, sed lobortis nunc",
                    url: "https://github.com/PhamCong01/weather-app",
                },
            ],
            duration: 12,
        },
        {
            fullName: "Phạm Công",
            username: "PhamCong01",
            repos: [
                {
                    name: "Repo 2",
                    description: "Repo2 description is too long",
                    url: "https://github.com/PhamCong01/weather-app",
                },
            ],
            duration: 12,
        },
        {
            fullName: "Phạm Công",
            username: "PhamCong01",
            repos: [
                {
                    name: "Repo 2",
                    description: "Repo2 description is too long",
                    url: "https://github.com/PhamCong01/weather-app",
                },
            ],
            duration: 12,
        },
        {
            fullName: "Phạm Công",
            username: "PhamCong01",
            repos: [
                {
                    name: "Repo 2",
                    description: "Repo2 description is too long",
                    url: "https://github.com/PhamCong01/weather-app",
                },
            ],
            duration: 12,
        },
        {
            fullName: "Phạm Công",
            username: "PhamCong01",
            repos: [
                {
                    name: "Repo 2",
                    description: "Repo2 description is too long",
                    url: "https://github.com/PhamCong01/weather-app",
                },
            ],
            duration: 12,
        },
        {
            fullName: "Phạm Công",
            username: "PhamCong01",
            repos: [
                {
                    name: "Repo 2",
                    description: "Repo2 description is too long",
                    url: "https://github.com/PhamCong01/weather-app",
                },
            ],
            duration: 12,
        },
        {
            fullName: "Phạm Công",
            username: "PhamCong01",
            repos: [
                {
                    name: "Repo 2",
                    description: "Repo2 description is too long",
                    url: "https://github.com/PhamCong01/weather-app",
                },
            ],
            duration: 12,
        },
        {
            fullName: "Phạm Công",
            username: "PhamCong01",
            repos: [
                {
                    name: "Repo 2",
                    description: "Repo2 description is too long",
                    url: "https://github.com/PhamCong01/weather-app",
                },
            ],
            duration: 12,
        },
        {
            fullName: "Phạm Công",
            username: "PhamCong01",
            repos: [
                {
                    name: "Repo 2",
                    description: "Repo2 description is too long",
                    url: "https://github.com/PhamCong01/weather-app",
                },
            ],
            duration: 12,
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
        userNameNode.innerHTML = `<i class="far fa-smile"></i> Name: ${user.fullName}`

        // user url
        const urlNode = document.createElement("li")
        urlNode.className = "item__url"
        urlNode.innerHTML = `<a class="link" target="_blank" href="https://github.com/${user.username}">GitHub: ${user.username}</a>`

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
        timeNode.innerHTML = `${user.duration} hours`

        // create div for button
        const buttonContainer = document.createElement("div")
        buttonContainer.className = "button__container"

        // create see more button
        const buttonMore = document.createElement("button")
        buttonMore.className = "buttonMore"
        buttonMore.innerHTML = "See more"
        buttonMore.onclick = () => renderSeeMoreBtn(user.repos)

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

const renderSeeMoreBtn = function (repos) {
    const buttonContainer = document.querySelectorAll(".button__container")
    const dashboardChildNode = document.querySelector(".dashboard__child")
    const overLayNode = document.querySelector(".dashboard__overlay")
    const exitIconNode = document.querySelector(".times-exit")

    // child dashboard container
    const dashboardContainerNode = document.querySelector(
        ".dashboard__container"
    )
    dashboardContainerNode.innerHTML = ""

    // click button open dashboard
    buttonContainer.forEach((button) => {
        button.onclick = () => {
            dashboardChildNode.classList.add("active")
            overLayNode.classList.add("active")
        }
    })

    // click remove dashboard and overLay
    overLayNode.onclick = () => {
        dashboardChildNode.classList.remove("active")
        overLayNode.classList.remove("active")
    }
    // click remove dashboard and overLay
    exitIconNode.onclick = () => {
        dashboardChildNode.classList.remove("active")
        overLayNode.classList.remove("active")
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
        goToBtnNode.onclick = () => window.open(repo.url)

        // append close btn to clost btn div node
        goToDivNode.appendChild(goToBtnNode)

        // append basic info and go to btn to each repos
        eachReposNode.appendChild(repoInfoNode)
        eachReposNode.appendChild(goToDivNode)

        // append repo to dashboard
        dashboardContainerNode.appendChild(eachReposNode)
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
    const overLayNode = document.querySelector(".dashboard__overlay")
    const exitIconNode = document.querySelector(".times-exit")

    // change timestamp
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
    buttonContainer.forEach((button) => {
        button.onclick = () => {
            dashboardChildNode.classList.add("active")
            overLayNode.classList.add("active")
        }
    })

    // click remove dashboard and overLay
    overLayNode.onclick = () => {
        dashboardChildNode.classList.remove("active")
        overLayNode.classList.remove("active")
    }
    // click remove dashboard and overLay
    exitIconNode.onclick = () => {
        dashboardChildNode.classList.remove("active")
        overLayNode.classList.remove("active")
    }
}

function formLogin () {
    const iconLogin = document.getElementById('login')
    const formLogin = document.querySelector('.form__container')
    const login = document.querySelector('.login__form')
    const createAccount = document.querySelector('.create__form')
    const goToLogin = document.querySelector('.goTo__login')
    const iconExit = document.querySelector('.form__exit')
    const goToCreateAccount = document.querySelector('.create__account')
    // open form login
    iconLogin.onclick = () => {
        formLogin.style.display = "block"
    }

    // close form login
    iconExit.onclick = () => {
        formLogin.style.display = "none"
    }

    // go to create account
    goToCreateAccount.onclick = () => {
        createAccount.classList.add("active")
        login.classList.remove("active")
    }

    // go to login
    goToLogin.onclick = () => {
        createAccount.classList.remove("active")
        login.classList.add("active")
    }
}

formLogin()