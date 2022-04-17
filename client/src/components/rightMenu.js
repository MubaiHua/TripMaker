import React from "react";
import './App.css';
import React, { Component, useState } from 'react';

import { List, arrayMove, arrayRemove } from "react-movable";



const DragDropList = () => {
  const [items, setItems] = React.useState(['Item 1', 'Item 2']);
  return (
    <List

      // Allow items to be removed by dragging far outside of bounding box.
      removableByMove={true}

      // Set member var 'values' to pre-defined list 'items'.
      values={items}

      // When the item is dropped to a new location: insert item at newIndex
      onChange={({ oldIndex, newIndex }) => {
        setItems(arrayMove(items, oldIndex, newIndex));

      } }

      // Render an unordered list where 'children' is the content of the list.
      renderList={ ({ children, props }) =>  ( <ul id='list' class='space-y-0' {...props}> {children} </ul> )}
      
      // Renders a React component
      renderItem={ ({ value, props, index }) => <li class='list-none' {...props}>
        <div class='grid grid-cols-8 h-12 items-center box-content gap-0'> 

          {/* Drag and drop handle */}
          <div class='px-3 pt-0.5 justify-self-center text-3xl text-black cursor-grab w-fit'>
            ≡</div>

          {/* Descriptor button */}
          <button class='pt-1 px-2 justify-self-start col-span-5 text-2xl cursor-pointer rounded lg hover:bg-neutral-200' id='this_button'
                onClick={ () => { 
                  //document.getElementById(`delete_button_${items[index]}`).className += " hidden";
                }}
              >{value}</button>
          
          {/* Delete button */}
          <button class='h-2/3 justify-self-center col-span-2 px-2 py-0 rounded-lg bg-indigo-200 hover:bg-indigo-300'
               id={`delete_button_${items[index]}`}
              onClick={() => {
                if (typeof index !== "undefined") {
                  setItems(arrayRemove(items, index));
                } else {
                  setItems(items);
                }
              }}>
            <div class='text-xs text-black cursor-pointer pt-2'
                
              >Delete</div>
          </button>

        </div>
      </li>}
    />
  );
};


function RightMenu() {

  // create an empty array 'items'
  const [items, setItems] = useState([]);

  // { itemName: 'item 1', itemID: 1, isSelected: false }
  
  // Add a new state object 'inputValue', and initialise it to an empty string:
  const [inputValue, setInputValue] = useState('');

  const handleAddButtonClick = () => {
    // create a new object called newItem, and assign default ID and boolean
    const newItem = {
      itemName: inputValue,
      itemID: 1,
      isSelected: false,
    };
  
    // copies the existing array and appends newItem to the end
    const newItems = [...items, newItem];
  
    // pushes the new array back into state
    setItems(newItems);

    // resets the inputValue to empty string so that the user can type and add more stuff
    setInputValue('');
  };

  const toggleComplete = (index) => {
    const newItems = [...items];
  
    newItems[index].isSelected = !newItems[index].isSelected;
  
    setItems(newItems);
  };

  return (
    <div class="overflow-clip grid grid-cols-1 p-2 bg-neutral-100">

        <div class='py-1 pl-3 text-4xl font-bold rounded-lg bg-indigo-400 max-h-16'>Existing Stops:</div>

        <div class='pt-1 font-bold h-max-8'>This is the right panel.</div>

        <div className='item-list'>
          {items.map((item, index) => (
            <div className='item-container'>
              <div className='item-name'>
                {item.isSelected ? (
                  <>
                    <p>selected.</p>
                    <span className='completed'>{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className='item-name' onClick={() => toggleComplete(index)}>
                item.
              </div>
            </div>
          ))}
        </div>       

        <div class='pt-2 overflow-auto relative min-h-screen max-h-screen'>
          <DragDropList/>
        </div>




      </div>
  );
}

export default RightMenu;

