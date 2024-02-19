interface sketcheInterface {
    "id": string | number,
    "active": boolean,
    "image": string | undefined,
    "preview": string | undefined,
}

const getActiveSketch = (sketches: sketcheInterface[]): sketcheInterface => {
    const filtered = sketches.filter(
        sketch => sketch.active === true
    )
    return filtered[0]
}

export default getActiveSketch
