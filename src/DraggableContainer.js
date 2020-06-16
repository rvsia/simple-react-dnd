import React, { useContext, useRef, useEffect } from 'react';

import { DnDContext } from './context';
import Draggable from './Draggable';

const returnToPos = (div) => {
  div.current.classList.remove('move-top');
  div.current.classList.remove('move-bottom');
}

const moveInPos = (event, div) => {
  const { clientY } = event;
  const { bottom, top } = div.current.getBoundingClientRect();

  const middleVertical = (bottom + top) / 2;

  if(clientY < middleVertical){
    div.current.classList.remove('move-top');
    div.current.classList.add('move-bottom');
  } else {
    div.current.classList.remove('move-bottom');
    div.current.classList.add('move-top');
  };
}

const DraggableContainer = ({children, id, index}) => {
    const { selectedItem } = useContext(DnDContext);
    const div = useRef();

    const onDragOver = e => {
        if(selectedItem !== id) {
          e.preventDefault();
          e.persist();
          moveInPos(e, div, id);
        }
      }

    useEffect(() => {
      div.current.classList.remove('move-bottom');
      div.current.classList.remove('move-top');
    })

    return(<div
        className="draggable-container"
        ref={div}
        onDragOver={onDragOver}
        onDragLeave={() => returnToPos(div)}
    >
        <Draggable id={id} index={index} >
            {children}
        </Draggable>
    </div>)
}

export default DraggableContainer;

