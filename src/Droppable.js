import React, { useContext } from 'react';

import { DnDContext } from './context';
import { findIndex } from './helpers';

const Droppable = ({id, children}) => {
    const { onDrop: onDropContext, selectedItem } = useContext(DnDContext);

    const onDrop = e => {
        e.preventDefault();
        e.stopPropagation();

        const draggableId = e.dataTransfer.getData('id');
        const sourceId = e.dataTransfer.getData('source');

        const childCoords = Array.from(document.getElementById(id).childNodes).map((el) => {
        const coord = el.getBoundingClientRect();

        return {
            top: coord.top,
            right: coord.right,
            bottom: coord.bottom,
            left: coord.left,
            middleHorizontal: (coord.right + coord.left) / 2,
            middleVertical: (coord.bottom + coord.top) / 2,
        }
        })

        onDropContext({draggableId, id: sourceId}, {id, index: findIndex(e, childCoords)})
    }

    const onDragOver = e => {
        e.preventDefault();
    }

    const onKeyDown = e => {
        switch (e.keyCode) {
        case 13:
            if(selectedItem) {
                onDropContext({id}, {id: selectedItem.id})
                e.preventDefault();
                e.stopPropagation();
            }
            break;
        default:
        }
    }

    return(<div
        id={id}
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="droppable"
        tabIndex={0}
        onKeyDown={onKeyDown}
        >
        {children}
    </div>)
}

export default Droppable;
