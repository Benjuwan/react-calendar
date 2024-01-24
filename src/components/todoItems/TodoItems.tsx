import { FC, SyntheticEvent } from "react";
import todoStyle from "./css/todoStyle.module.css";
import { todoItemType } from "./ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom, todoMemoLocalStorageAtom } from "../../atom/atom";
import { TodoForm } from "./TodoForm";

type TodoItemsType = {
    todoItem: todoItemType;
    todoID: string;
    index: number;
}

export const TodoItems: FC<TodoItemsType> = (props) => {
    const { todoItem, todoID, index } = props;

    const [, setLocalstorage] = useAtom(todoMemoLocalStorageAtom); // 更新関数のみ使用
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);

    const changeMode: (todiItem: todoItemType, index: number, editMode: boolean) => void = (todiItem: todoItemType, index: number, editMode: boolean) => {
        let editState: boolean | null = null;
        if (editMode === false) editState = true;
        else editState = false;

        const updateTodoList: todoItemType = {
            todoID: todoID,
            todoContent: todiItem.todoContent,
            edit: editState
        }

        if (todiItem.startTime || todiItem.finishTime) {
            updateTodoList.startTime = todiItem.startTime;
            updateTodoList.finishTime = todiItem.finishTime;
        }

        const shallowCopy: todoItemType[] = [...todoMemo];
        shallowCopy.splice(index, 1, updateTodoList); // splice（切取＆置換）した結果ではなく「処理結果の残り分（shallowCopy）を更新関数に渡す」ので「変数への代入」を行わず、shallowCopy を以下の setter 関数に渡している。
        setTodoMemo((_prevTodoList) => shallowCopy);
    }

    const removeTodoItem: (index: number) => void = (index: number) => {
        const shallowCopy: todoItemType[] = [...todoMemo];
        shallowCopy.splice(index, 1);
        setTodoMemo((_prevTodoList) => shallowCopy);
        /* ---------------- localStorage 関連の処理（更新）---------------- */
        setLocalstorage((_prevLocalStorage) => shallowCopy);
        localStorage.setItem('todoMemos', JSON.stringify([...shallowCopy]));
    }

    const closeModalWindow: (btnElm: HTMLButtonElement) => void = (btnElm: HTMLButtonElement) => {
        const viewerParentElm: HTMLLIElement | null = btnElm.closest('li');
        viewerParentElm?.querySelector(`.${todoStyle.modalWindow}`)?.classList.remove(`${todoStyle.modalWindowOnView}`);
    }

    return (
        <div className={todoStyle.modalWindow}>
            <div className={todoStyle.modalWindowChild}>
                {todoItem.edit === true ?
                    <>
                        <div className={todoStyle.editTargetContent}>
                            <p>--- 編集前 ---</p>
                            <p>ToDo：{todoItem.todoContent}</p>
                            {todoItem.startTime && <p>開始時刻：{todoItem.startTime}</p>}
                            {todoItem.finishTime && <p>終了時刻：{todoItem.finishTime}</p>}
                        </div>
                        <TodoForm
                            todoID={todoID}
                            index={index}
                            edit={todoItem.edit}
                        />
                        <button id={todoStyle["deleteBtn"]} className={todoStyle.formBtns} type="button" onClick={(deleteBtn: SyntheticEvent<HTMLButtonElement>) => {
                            deleteBtn.stopPropagation(); // 親要素のクリックイベント（OnViewModalWindow）発生を防止
                            closeModalWindow(deleteBtn.currentTarget);
                            removeTodoItem(index);
                        }}>削除</button>
                    </> :
                    <p>{todoItem.todoContent}</p>
                }
                <button id={todoStyle["editBtn"]} className={todoStyle.formBtns} type="button" onClick={() => {
                    changeMode(todoItem, index, todoItem.edit);
                }}>{todoItem.edit === true ? '戻る' : '編集'}</button>
            </div>
            <button id={todoStyle["closeBtn"]} type="button" className={todoStyle.formBtns} onClick={(closeBtnEl: SyntheticEvent<HTMLButtonElement>) => {
                closeBtnEl.stopPropagation(); // 親要素のクリックイベント（OnViewModalWindow）発生を防止
                closeModalWindow(closeBtnEl.currentTarget);
            }}>詳細画面を閉じる</button>
        </div>
    );
}