import React, { useContext, useRef } from 'react';

import { DnDContext } from './context';
import { findIndex, isInsideOfRect } from './helpers';

const Droppable = ({id, children}) => {
    const { onDrop: onDropContext, selectedItem, onSelect } = useContext(DnDContext);
    const div = useRef();

    const onDrop = e => {
        e.preventDefault();
        e.stopPropagation();

        const draggableId = e.dataTransfer.getData('id');
        const sourceId = e.dataTransfer.getData('source');
        const sourceIndex = Number(e.dataTransfer.getData('source-index'));

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

        div.current.classList.remove('dragging-over');

        let newIndex = findIndex(e, childCoords);

        const sameList = id === sourceId;
        const isMovedAboveItself = newIndex === sourceIndex;
        const isMovedBelowItself = newIndex === sourceIndex + 1;

        if(!sameList || (sameList && !isMovedBelowItself && !isMovedAboveItself)) {
            if(sameList && newIndex > sourceIndex + 1) {
                newIndex -= 1; // index in array when the source element is removed
            }

            onDropContext({draggableId, id: sourceId}, {id, index: newIndex})
        } else {
            onSelect({id: null});
        }
    }

    const onDragOver = e => e.preventDefault();

    const onDragEnter = e => {
        if(!div.current.className.includes('dragging-over')) {
            div.current.classList.add('dragging-over');
        }
        e.preventDefault();
    }

    const onDragLeave = e => {
        const coords = div.current.getBoundingClientRect();

        if(div.current.className.includes('dragging-over') && !isInsideOfRect(e, coords)) {
            div.current.classList.remove('dragging-over');
        }
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
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className="droppable"
        tabIndex={0}
        onKeyDown={onKeyDown}
        ref={div}
        >
            {children}
    </div>)
}

export default Droppable;
