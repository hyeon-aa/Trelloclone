import Board from "./Board";
import { useForm, SubmitHandler } from "react-hook-form"
import { useSetRecoilState, useRecoilState } from "recoil";
import { boardState } from "../atoms";


const Page = ({ todos }) => {

    const { register, handleSubmit, setValue, formState: { errors }, } = useForm()


    const [boards, setBoards] = useRecoilState(boardState)
    const onValidBoard = ({ board }) => {
        const newBoard = { id: Date.now(), name: board }
        setValue('board', '')
        setBoards((prevBoards) => {
            return (
                [...prevBoards, newBoard]
            )
        })
    }
    return (
        <>
            <form onSubmit={handleSubmit(onValidBoard)}>
                <input placeholder="board입력" {...register("board")}></input>
            </form>
            <div>
                {/* {Object.keys(todos).map(boardId =>
                    <Board
                        boardId={boardId} key={boardId} todos={todos[boardId]}>
                    </Board>)} */}
                {boards.map(board =>
                    <Board
                        boardId={board.name} key={board.name} todos={todos[board.name]}>
                    </Board>)}
            </div>
        </>
    );
};

export default Page;