import Calendar from './assets/Calendar.svg'

function component() {
    const element = document.createElement('div')

    element.innerHTML = 'Hello'

    const myIcon = new Image()
    myIcon.src = Calendar

    element.appendChild(myIcon)

    return element
}

document.body.appendChild(component())
