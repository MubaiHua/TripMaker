import React, { useEffect } from "react";
import { ListContainer, ListItem } from "./styles";
import { DragHandle } from "./partials/DragHandle";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const App = (props) => {
  const [list, setList] = React.useState([]);
  const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
  useEffect(() => {
    let newList = []
    let markers = props.markers;
    for(let i=0;i<markers.length;i++){
      newList.push({id: i+1, title: "Marker"+alphabet[i], lat: markers[i].lat, lng:markers[i].lng});
    }
    // console.log(newList)
    setList(newList);
  }, [props]);

  return (
    <div className="App">
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            list.splice(desI, 0, list.splice(srcI, 1)[0]);
            // console.log(list)
            props.resetMarkers(list);
          }
        }}
      >
        <ListContainer className="absolute right-30px">
          <h1>The List</h1>
          <Droppable droppableId="droppable-1">
            {(provided, _) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {list.map((item, i) => (
                  <Draggable
                    key={item.id}
                    draggableId={"draggable-" + item.id}
                    index={i}
                  >
                    {(provided, snapshot) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          boxShadow: snapshot.isDragging
                            ? "0 0 .4rem #666"
                            : "none",
                        }}
                      >
                        <DragHandle {...provided.dragHandleProps} />
                        <span>{item.title}</span>
                      </ListItem>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ListContainer>
      </DragDropContext>
    </div>
  );
};

export default App;