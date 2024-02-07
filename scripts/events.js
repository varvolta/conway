import { setCells, originalCells } from './game.js'
import { nextGeneration } from './points.js'

let intervalId = null

const reset = () => {
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
    setCells(() => [...originalCells])
    canvases.style.border = '2px solid var(--color-secondary)'
    canvases.style.boxShadow = '0 0 20px var(--color-secondary-shadow)'
}

const pause = () => {
    clearInterval(intervalId)
    intervalId = null
    canvases.className = 'canvases pause'
    changeImageInside(buttonPlayPause, 'play')
}

const play = () => {
    intervalId = setInterval(() => {
        setCells(cells => nextGeneration(cells))
    }, 500)
    canvases.className = 'canvases play'
    changeImageInside(buttonPlayPause, 'pause')
}

const changeImageInside = (parent, name) => {
    const image = parent.querySelector('img')
    image.src = `assets/icons/${name}.svg`
    image.className = `svg ${name}`
}

const splash = document.getElementById('splash')
const rules = document.getElementById('rules')
const canvases = document.getElementById('canvases')
const slider = document.getElementById('slider')
const buttonStart = document.getElementById('button-start')
const buttonRules = document.getElementById('button-rules')
const buttonCloseRules = document.getElementById('button-close-rules')
const buttonMenu = document.getElementById('button-menu')
const buttonPlayPause = document.getElementById('button-play-pause')
const buttonNext = document.getElementById('button-next')
const buttonRestart = document.getElementById('button-restart')

buttonStart.addEventListener('click', () => {
    splash.classList = 'splash hidden'
})

buttonPlayPause.addEventListener('click', () => {
    intervalId ? pause() : play()
})

buttonNext.addEventListener('click', () => {
    setCells(cells => nextGeneration(cells))
})

buttonRestart.addEventListener('click', () => {
    reset()
})

buttonMenu.addEventListener('click', () => {
    intervalId && pause()
    buttonStart.innerText = 'Resume'
    splash.classList = 'splash'
})

buttonRules.addEventListener('click', () => {
    rules.classList.remove('hidden')
})

buttonCloseRules.addEventListener('click', () => {
    rules.classList.add('hidden')
})

slider.addEventListener('mousemove', event => {
    console.log(event.button)
    if (event.button === 0) {
        console.log(123)
    }
})