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
    if (!destination) return;
    //source.droppableId : todo/doing/done  --> 옮길 보드와 기존 보드가 같을 경우
    if (destination?.droppableId === source.droppableId) {
      setTodos((allBoards) => {
        const newBoard = [...allBoards[source.droppableId]];  //allBoards= {"todo": ['a','b'], "doing": ['c','d'],"done": []} 여기서 allBoards["todo"] 배열안에 있는 값을 펼친다 ->['a','b']
        newBoard.splice(source.index, 1)
        newBoard.splice(destination?.index, 0, draggableId)
        return {
          ...allBoards,
          [source.droppableId]: newBoard
        }
      })
    }
    else {
      setTodos((allBoards) => {
        const Boardwithdeleteitem = [...allBoards[source.droppableId]];
        const Boardwithadditem = [...allBoards[destination?.droppableId]];
        Boardwithdeleteitem.splice(source.index, 1)
        Boardwithadditem.splice(destination?.index, 0, draggableId)
        return {
          ...allBoards,
          [source.droppableId]: Boardwithdeleteitem,
          [destination?.droppableId]: Boardwithadditem
        }
      })
    }
    // setTodos(oldTodos => {
    //   const newTodos = [...oldTodos];
    //   //source.index 삭제에서부터 1개 삭제 , source.index: 기존 위치
    //   newTodos.splice(source.index, 1)
    //   //estination.index로 draggableId(선택 아이템) 옮기기 , destination.index : 옮길 새로운 위치,  draggableId : 내가 선택한 아이템
    //   newTodos.splice(destination?.index, 0, draggableId)
    //   return newTodos
    // })
  };


  //Droppable : 우리가 어떤것을 드롭할 수 있는 영역 Draggable 우리가 드래그핤 수 있는 영역

  //Object.keys(todos) = ["todo","doing", "done"] 
  //Object.keys(todos).map(boardId : boardId가 각각 "todo","doing", "done"]이게 되고 
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
