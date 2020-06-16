import React, { useContext, useRef } from 'react';

import { DnDContext } from './context';


const Draggable = ({id, children, index}) => {
    const { onSelect } = useContext(DnDContext);
    const div = useRef();

    const onDragStart = e => {
      const sourceId = document.getElementById(id).parentElement.parentElement.id;

      e.dataTransfer.setData('id', id);
      e.dataTransfer.setData('source', sourceId);
      e.dataTransfer.setData('source-index', index);

      onSelect({id})
    }

    const onKeyDown = e => {
      switch (e.keyCode) {
        case 32:
          onSelect({id})
          e.preventDefault();
          e.stopPropagation();
          break;
        default:
      }
    }

    return(<div
      draggable
      id={id}
      onDragStart={onDragStart}
      tabIndex={0}
      className="draggable"
      onKeyDown={onKeyDown}
      ref={div}
    >
      {id}
      {children}
    </div>)
};

export default Draggable;
