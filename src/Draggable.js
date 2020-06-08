import React, { useContext } from 'react';

import { DnDContext } from './context';

const Draggable = ({id, children}) => {
    const { onSelect } = useContext(DnDContext);

    const onDragStart = e => {
      const sourceId = document.getElementById(id).parentElement.id;

      e.dataTransfer.setData('id', id);
      e.dataTransfer.setData('source', sourceId);

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
    >
      {id}
      {children}
    </div>)
};

export default Draggable;
