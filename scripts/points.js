// RULES
// Any live cell with fewer than two live neighbours dies, as if caused by under-population.
// Any live cell with two or three live neighbours lives on to the next generation.
// Any live cell with more than three live neighbours dies, as if by overcrowding.
// Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

import { getBounds } from './rect.js'

export const switchPoint = (points, column, row) => {
    const point = points.find(point => point.column === column && point.row === row)
    if (point) {
        points.splice(points.indexOf(point), 1)
    } else {
        points.push({ column, row })
    }
}

export const countNeighbors = (points, column, row) => {
    let count = 0
    points.forEach(point => {
        if (point.column === column && point.row === row) return
        if (
            point.column >= column - 1 &&
            point.column <= column + 1 &&
            point.row >= row - 1 &&
            point.row <= row + 1
        ) {
            count += 1
        }
    })
    return count
}

export const nextGeneration = (points = []) => {
    const newPoints = []
    const { left, right, top, bottom } = getBounds(points)
    for (let column = left; column <= right; column++) {
        for (let row = top; row <= bottom; row++) {
            const neighbors = countNeighbors(points, column, row)
            if (neighbors >= 2 && neighbors <= 3) {
                if (points.find(point => point.column === column && point.row === row) || neighbors === 3) {
                    newPoints.push({ column, row })
                }
            }
        }
    }
    return newPoints
}
