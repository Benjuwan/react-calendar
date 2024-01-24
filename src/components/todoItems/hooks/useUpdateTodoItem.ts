import { todoItemType } from "../ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom, todoMemoLocalStorageAtom } from "../../../atom/atom";

export const useUpdateTodoItem = () => {
    const [, setLocalstorage] = useAtom(todoMemoLocalStorageAtom); // 更新関数のみ使用
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);
    
    /* ToDo の更新 */
    const updateTodoItem: (todoID: string, todoContent: string, startTime: string, finishTime: string, index: number) => void = (
        todoID: string,
        todoContent: string,
        startTime: string,
        finishTime: string,
        index: number
    ) => {
        const updateTodoList: todoItemType = {
            todoID: todoID,
            todoContent: todoContent,
            edit: false
        };

        if (startTime.length > 0 || finishTime.length > 0) {
            updateTodoList.startTime = startTime;
            updateTodoList.finishTime = finishTime;
        }

        const shallowCopy: todoItemType[] = [...todoMemo];
        shallowCopy.splice(index, 1, updateTodoList); // splice（切取＆置換）した結果ではなく「処理結果の残り分（shallowCopy）を更新関数に渡す」ので「変数への代入」を行わず、shallowCopy を以下の setter 関数に渡している。
        
        if (todoContent.length > 0) {
            setTodoMemo((_prevTodoMemo) => shallowCopy);
            /* ---------------- localStorage 関連の処理（更新）---------------- */
            setLocalstorage((_prevLocalStorage) => shallowCopy);
            localStorage.setItem('todoMemos', JSON.stringify([...shallowCopy]));
        }
    }

    return { updateTodoItem }
}