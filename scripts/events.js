import { setCells, originalCells } from './game.js'
import { nextGeneration } from './points.js'

let intervalId = null

const changeImageInside = (parent, name) => {
    const image = parent.querySelector('img')
    image.src = `assets/icons/${name}.svg`
    image.className = `svg ${name}`
}

const splash = document.getElementById('splash')
const canvases = document.getElementById('canvases')
const buttonStart = document.getElementById('button-start')
const buttonRules = document.getElementById('button-rules')
const buttonPlayPause = document.getElementById('button-play-pause')
const buttonNext = document.getElementById('button-next')
const buttonRestart = document.getElementById('button-restart')

buttonStart.addEventListener('click', () => {
    splash.classList = 'splash hidden'
})

buttonPlayPause.addEventListener('click', () => {
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
        canvases.className = 'canvases pause'
        changeImageInside(buttonPlayPause, 'play')
    } else {
        intervalId = setInterval(() => {
            setCells(cells => nextGeneration(cells))
        }, 500)
        canvases.className = 'canvases play'
        changeImageInside(buttonPlayPause, 'pause')
    }
})

buttonNext.addEventListener('click', () => {
    setCells(cells => nextGeneration(cells))
})

buttonRestart.addEventListener('click', () => {
    if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
    }
    setCells(() => [...originalCells])
    buttonPlayPause
    canvases.style.border = '2px solid var(--color-secondary)'
    canvases.style.boxShadow = '0 0 20px var(--color-secondary-shadow)'
})