import { atom } from "recoil";

export interface ITodo {
    id: number;
    text: string
}


interface ITodoState {
    [key: string]: string[]
}

export const todoState = atom({
    key: "todo",
    default: {
        plan: [],
        doing: [],
        done: []
    }
})

// { id: 1, text: "hello" }