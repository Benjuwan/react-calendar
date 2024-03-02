import { atom } from "jotai";
import { todoItemType } from "../components/todoItems/ts/todoItemType";

const todoMemoItemsDefault: todoItemType = {
    todoID: '',
    todoContent: '',
    edit: false
}

export let todoMemoLocalStorageAtom = atom([todoMemoItemsDefault]);

/* 既存の localStorage データを取得して（データがあれば）Atom に代入 */
const getLocalStorageItems: string | null = localStorage.getItem('todoMemos');
if (getLocalStorageItems !== null) {
    const SaveLocalStorageDateItems: todoItemType[] = JSON.parse(getLocalStorageItems);
    todoMemoLocalStorageAtom = atom([...SaveLocalStorageDateItems]);
}

export const todoMemoAtom = atom([todoMemoItemsDefault]);

export const isDesktopViewAtom = atom<boolean>(false);