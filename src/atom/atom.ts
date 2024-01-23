import { atom } from "jotai";
import { todoItemType } from "../components/todoItems/ts/todoItemType";

const todoListAtomDefault: todoItemType = {
    todoID: '',
    todoContent: '',
    edit: false
}

export const todoListAtom = atom([todoListAtomDefault]);