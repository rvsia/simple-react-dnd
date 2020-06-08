import React from 'react';

import { DnDContext } from "./context";

const DndProvider = ({children, onDrop: onDropProp, selectedItem, onSelect}) => {
    const onDrop = (source, destination) => onDropProp(source, destination);

    return (
        <DnDContext.Provider
            value={{
                onDrop,
                onSelect,
                selectedItem
            }}
        >
            {children}
        </DnDContext.Provider>
    )
}

export default DndProvider;
