import { Camera } from './camera.js'
import { createFilledCanvas } from './canvas.js'
import { getPointFromCoordinates } from './rect.js'
import {
    COLOR_ACCENT,
    COLOR_SHADOW,
    COLOR_WIREFRAME,
    CELL_OUTRENDER_COUNT,
    CELL_PADDING,
    CELL_RADIUS,
    CELL_SIZE,
    SIZE_SHADOW_BLUR
} from './constants.js'
import { switchPoint } from './points.js'

export const originalCells = [
    { column: 10, row: 10 },
    { column: 11, row: 11 },
    { column: 11, row: 12 },
    { column: 10, row: 12 },
    { column: 9, row: 12 },
]

let cells = [...originalCells]

export const setCells = (callback) => {
    cells = callback?.(cells)
}

const canvases = document.querySelector('.canvases')

const canvasWireframe = createFilledCanvas(canvases)
const contextWireframe = canvasWireframe.getContext('2d')

const canvasCells = createFilledCanvas(canvases)
const contextCells = canvasCells.getContext('2d')

const camera = new Camera(canvasCells, {
    onClick: (x, y) => {
        const { column, row } = getPointFromCoordinates(x, y, CELL_SIZE)
        switchPoint(cells, column, row)
    }
})

const drawWireframe = () => {
    contextWireframe.clearRect(0, 0, camera.width, camera.height)

    const { x, y, width, height } = camera
    const columns = Math.ceil(width / CELL_SIZE) + CELL_OUTRENDER_COUNT
    const rows = Math.ceil(height / CELL_SIZE) + CELL_OUTRENDER_COUNT
    const diffX = x % CELL_SIZE
    const diffY = y % CELL_SIZE

    contextWireframe.strokeStyle = COLOR_WIREFRAME
    contextWireframe.lineWidth = 1

    contextWireframe.beginPath()

    for (let column = 0; column < columns; column++) {
        contextWireframe.moveTo(diffX + column * CELL_SIZE, 0)
        contextWireframe.lineTo(diffX + column * CELL_SIZE, height)
    }

    for (let row = 0; row < rows; row++) {
        contextWireframe.moveTo(0, diffY + row * CELL_SIZE)
        contextWireframe.lineTo(width, diffY + row * CELL_SIZE)
    }

    contextWireframe.stroke()
}

const drawCells = () => {
    contextCells.clearRect(0, 0, camera.width, camera.height)

    contextCells.fillStyle = COLOR_ACCENT
    contextCells.shadowBlur = SIZE_SHADOW_BLUR
    contextCells.shadowColor = COLOR_SHADOW

    contextCells.beginPath()

    cells.forEach(cell => {
        contextCells.roundRect(
            camera.x + cell.column * CELL_SIZE + CELL_PADDING,
            camera.y + cell.row * CELL_SIZE + CELL_PADDING,
            CELL_SIZE - 2 * CELL_PADDING,
            CELL_SIZE - 2 * CELL_PADDING,
            CELL_RADIUS
        )
    })

    contextCells.fill()
}

const draw = () => {
    drawWireframe()
    drawCells()
    // chromaticAberration(contextWireframe, camera, 50, 0)
}

const update = () => {
    draw()
    requestAnimationFrame(update)
}

export const start = () => {
    update()
}