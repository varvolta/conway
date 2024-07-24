const resize = (parent, canvas, context) => {
    const { offsetWidth, offsetHeight } = parent
    // Change to 1 on retina screens to see blurry canvas.
    const scale = window.devicePixelRatio
    canvas.width = Math.floor(offsetWidth * scale)
    canvas.height = Math.floor(offsetHeight * scale)
    context.scale(scale, scale)
}

let zIndex = 0

export const createFilledCanvas = (parent = document.body) => {
    const canvas = document.createElement('canvas')
    canvas.style.position = 'absolute'
    canvas.style.inset = 0
    canvas.style.zIndex = zIndex
    if (zIndex === 0) canvas.style.backgroundColor = 'black'

    canvas.addEventListener('contextmenu', event => {
        event.preventDefault()
    })

    const context = canvas.getContext('2d', { willReadFrequently: true })

    window.addEventListener('resize', () => resize(parent, canvas, context))

    resize(parent, canvas, context)

    parent.appendChild(canvas)

    zIndex++

    return canvas
}