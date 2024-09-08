import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import React from "react";

// interface IDraggableCardProps {
//     todo: string,
//     index: number
// }


const DragabbleCard = ({ todoId, todoText, index }) => {
    // console.log(todo + "has been rendered")

    return (
        <>
            <Draggable key={todoId} draggableId={todoId + ""} index={index}>
                {(provided) => (
                    <>
                        <div ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>{todoText}</div>
                    </>
                )
                }
            </Draggable>
        </>
    )
}

//e->f로 옮겨도 a~f까지가 전부다 리렌더링됨.
//console.log(todo + "has been rendered")로 확인 가능함
//DragabbleCard의 부모인 Board, Droppable,DragDropcontext 등 부모의 state가 바뀌면 자식도 리렌더링!
//DragabbleCard의이 전달받는 props(todo, index)가 변하지않으면 DragabbleCard 컴포넌트 렌더링하지마! -> react.memo

export default React.memo(DragabbleCard);