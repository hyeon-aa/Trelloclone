import { atom, RecoilEnv } from "recoil";

export interface ITodo {
    id: number;
    text: string
}

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

interface ITodoState {
    [key: string]: string[]
}

export const todoState = atom({
    key: "todo",
    default: {
    }
})

export const boardState = atom({
    key: "board",
    default: [
        // { name: 'plan', id: 1 },
        // { name: 'doing', id: 2 },
        // { name: 'done', id: 3 },
    ]
})

// { id: 1, text: "hello" }