import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useRef } from "react";
import DragabbleCard from "./DragabbleCard";
import { useForm, SubmitHandler } from "react-hook-form"

interface IBoardProps {
    todos: string[],
    boardId: string
}

const Board = ({ todos, boardId }: IBoardProps) => {
    const { register, handleSubmit, watch, formState: { errors }, } = useForm()
    const onValid = (data) => {

    }

    return (
        <>
            <h2>{boardId}</h2>
            <form onSubmit={handleSubmit(onValid)}>
                <input {...register(`${boardId}`)}></input>
                {/* <button onClick={onClick}>clickme</button> */}
            </form>
            <Droppable droppableId={boardId}>
                {
                    (provided) => (
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                            {todos.map((todo, index) => (
                                <DragabbleCard todo={todo} index={index} key={index}></DragabbleCard>
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
        </>
    );
};

export default Board;