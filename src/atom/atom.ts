import { atom } from "jotai";
import { todoItemType } from "../components/todoItems/ts/todoItemType";

const todoListAtomDefault: todoItemType = {
    todoID: '',
    todoContent: '',
    edit: false
}

export let todoListAtom = atom([todoListAtomDefault]);

/* 既存の localStorage データを取得して（データがあれば）Atom に代入 */
const getLocalStorageItems: string | null = localStorage.getItem('todoMemos');
if (getLocalStorageItems !== null) {
    const SaveLocalStorageDateItems: todoItemType[] = JSON.parse(getLocalStorageItems);
    todoListAtom = atom([...SaveLocalStorageDateItems]);
}