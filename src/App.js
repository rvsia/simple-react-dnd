import React, { useReducer } from 'react';

import DndProvider from './Provider';
import Draggable from './DraggableContainer';
import Droppable from './Droppable';

import './App.css';

const setColumns = (state, {source, destination}) => {
  const removedState = {
    ...state,
    [source.id]: state[source.id].filter(id => id !== source.draggableId)
  }

  let index = destination.index;

  removedState[destination.id].splice(index, 0, source.draggableId);

  return removedState;
}

const reducer = (state, {type, ...payload}) => {
  switch(type) {
    case 'setColumns':
      return {
        ...state,
        ...setColumns(state, payload),
        selectedItem: null
      };
    case 'selectItem':
      return {
        ...state,
        selectedItem: payload.item.id
      }
    default:
      return state;
  }
}

const initialData = {
  dolnilist: ['item3', 'item4'],
  hornilist: ['item1', 'item2'],
  fields: {
    item1: {},
    item2: {},
    item3: {},
    item4: {},
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialData);

  return (
    <div className="App">
        <DndProvider
          selectedItem={state.selectedItem}
          onSelect={(item) => dispatch({type: 'selectItem', item})}
          onDrop={(source, destination) => dispatch({type: 'setColumns', source, destination})}
        >
          <Droppable id="hornilist">
            {state.hornilist.map((id, index) => <Draggable key={id} id={id} index={index} />)}
          </Droppable>
          <Droppable id="dolnilist">
            {state.dolnilist.map((id, index) => <Draggable key={id} id={id} index={index} />)}
          </Droppable>
        </DndProvider>
        <div>
          {JSON.stringify(state, null, 2)}
        </div>
    </div>
  );
}

export default App;
