export class Camera {
    constructor(target, { x = 0, y = 0, onMove, onResize, onClick } = {}) {
        if (!target) throw new Error('Target object is required')

        this.target = target
        this.x = x
        this.y = y
        this.onMoveCallback = onMove
        this.onResizeCallback = onResize
        this.onClickCallback = onClick

        target.addEventListener('mousemove', event => {
            // Right mouse button = 2
            if (event.buttons === 2) {
                this.x += event.movementX
                this.y += event.movementY
                this.onMoveCallback?.(this.x, this.y, event.movementX, event.movementY)
            }
        })

        target.addEventListener('click', event => {
            const rect = target.getBoundingClientRect()
            this.onClickCallback?.(event.pageX - this.x - rect.left, event.pageY - this.y - rect.top)
        })

        const resize = () => {
            const { offsetWidth, offsetHeight } = target
            this.width = offsetWidth
            this.height = offsetHeight
            this.onResizeCallback?.(offsetWidth, offsetHeight)
        }

        window.addEventListener('resize', resize)

        resize()
    }

    onMove(callback) {
        this.onMoveCallback = callback
    }

    onResize(callback) {
        this.onResizeCallback = callback
    }

    onClick(callback) {
        this.onClickCallback = callback
    }
}