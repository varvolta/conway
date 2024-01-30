export const chromaticAberration = (context, camera, intensity, phase) => {
    /* Use canvas to draw the original image, and load pixel data by calling getImageData
    The ImageData.data is an one-dimentional Uint8Array with all the color elements flattened. The array contains data in the sequence of [r,g,b,a,r,g,b,a...]
    Because of the cross-origin issue, remember to run the demo in a localhost server or the getImageData call will throw error
    */
    const imageData = context.getImageData(0, 0, camera.width, camera.height)
    const data = imageData.data

    for (var i = phase % 4; i < data.length; i += 4) {
        // Setting the start of the loop to a different integer will change the aberration color, but a start integer of 4n-1 will not work
        data[i] = data[i + 4 * intensity]
    }
    context.putImageData(imageData, 0, 0)
}
