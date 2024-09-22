import './App.css'
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import styled from '@emotion/styled'
import { useRecoilState } from 'recoil';
import { todoState } from './atoms';
import DragabbleCard from './components/DragabbleCard';
import Board from './components/Board';


function App() {

  const [todos, setTodos] = useRecoilState(todoState)
  const onDragEnd = (info: DropResult) => {
    const { destination, draggableId, source } = info;
    console.log(info)
    if (!destination) return;
    console.log(destination?.droppableId)
    //source.droppableId : todo/doing/done  --> 옮길 보드와 기존 보드가 같을 경우
    if (destination?.droppableId === source.droppableId) {
      setTodos((allBoards) => {
        const newBoard = [...allBoards[source.droppableId]];  //allBoards= {"todo": ['a','b'], "doing": ['c','d'],"done": []} 여기서 allBoards["todo"] 배열안에 있는 값을 펼친다 ->['a','b']
        const taskObj = newBoard[source.index] //내가 옮기려고 하는 todo object = { id: 1, text: "hello" }
        newBoard.splice(source.index, 1)
        newBoard.splice(destination?.index, 0, taskObj)
        return {
          ...allBoards,
          [source.droppableId]: newBoard
        }
      })
    }
    else {
      setTodos((allBoards) => {
        const Boardwithdeleteitem = [...allBoards[source.droppableId]];
        const taskObj = Boardwithdeleteitem[source.index]
        const Boardwithadditem = [...allBoards[destination?.droppableId]];
        Boardwithdeleteitem.splice(source.index, 1)
        Boardwithadditem.splice(destination?.index, 0, taskObj)
        return {
          ...allBoards,
          [source.droppableId]: Boardwithdeleteitem,
          [destination?.droppableId]: Boardwithadditem
        }
      })
    }
  };


  //Droppable : 우리가 어떤것을 드롭할 수 있는 영역 Draggable 우리가 드래그핤 수 있는 영역

  //Object.keys(todos) = ["plan","doing", "done"] 
  //Object.keys(todos).map(boardId : boardId가 각각 "plan","doing", "done"]이게 되고 
  //todos[boardId] : [[ "a","b","c"],["d","e"],["f"]]
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div>
          {Object.keys(todos).map(boardId =>
            <Board
              boardId={boardId} key={boardId} todos={todos[boardId]}>
            </Board>)}
        </div>
      </DragDropContext>
    </>
  )
}

export default App
