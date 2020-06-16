// calculates new index of dragged element
export const findIndex = (event, coords) => {
    const { clientY } = event;

    let index = 0;

    coords.forEach(({middleVertical}) => {
        if(clientY >= middleVertical) {
            ++index;
        }
    })

    return index;
};

export const isInsideOfRect = (event, coords) => {
    const { clientY, clientX } = event;
    const { left, right, top, bottom} = coords;

    return !(clientX < left || clientX > right || clientY < top || clientY > bottom);
};
