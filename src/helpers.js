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
