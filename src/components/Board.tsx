import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { useRef } from "react";
import DragabbleCard from "./DragabbleCard";
import { useForm, SubmitHandler } from "react-hook-form"
import { todoState } from "../atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

// interface IBoardProps {
//     todos: string[],
//     boardId: string
// }

const Board = ({ todos, boardId }) => {
    const { register, handleSubmit, setValue } = useForm()


    const setTodos = useSetRecoilState(todoState)
    const onValid = ({ todo }) => {
        const newTodo = { id: Date.now(), text: todo }
        setTodos((allBoards) => {
            // console.log([...allBoards[boardId]])
            return {
                ...allBoards,
                [boardId]: [
                    newTodo,
                    ...(allBoards[boardId] || [])  //기본값을 빈 배열로 설정

                ]
            }
        }
        )
        setValue("todo", '')
    }


    return (
        <>
            <h2>{boardId}</h2>
            <form onSubmit={handleSubmit(onValid)}>
                <input {...register("todo")}></input>
            </form>
            <Droppable droppableId={boardId}>
                {
                    (provided) => (
                        <>
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                {todos?.map((todo, index) => (
                                    <DragabbleCard todoId={todo.id}
                                        todoText={todo.text}
                                        index={index}
                                        key={todo.id}></DragabbleCard>
                                ))}
                                {provided.placeholder}
                            </div>
                        </>
                    )

                }
            </Droppable>
        </>
    );
};

export default Board;