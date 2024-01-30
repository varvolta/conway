export const isInRect = (point, rect) => {
    return point.x >= rect.x &&
        point.y >= rect.y &&
        point.x <= rect.x + rect.width &&
        point.y <= rect.y + rect.height
}

export const getBounds = (points, skip = 1) => {
    let left = points[0].column,
        top = points[0].row,
        right = points[0].column,
        bottom = points[0].row

    points.forEach(({ column, row }) => {
        if (column < left) left = column
        if (column > right) right = column
        if (row < top) top = row
        if (row > bottom) bottom = row
    })

    left -= skip
    right += skip
    top -= skip
    bottom += skip

    return { left, right, top, bottom }
}

export const getPointFromCoordinates = (x, y, size) => {
    return {
        column: Math.ceil(x / size) - 1,
        row: Math.ceil(y / size) - 1
    }
}