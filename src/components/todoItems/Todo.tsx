import { useEffect, useState, Fragment } from "react";
import todoStyle from "./css/todoStyle.module.css";
import { todoItemType } from "./ts/todoItemType";
import { useAtom } from "jotai";
import { todoListAtom } from "../../atom/atom";
import { TodoForm } from "./TodoForm";

export const Todo = ({ todoID }: { todoID: string }) => {
    const [todoContent, setTodoContent] = useState<string>('');
    const [todoList, setTodoList] = useState<todoItemType[]>([]);

    const [, setLocalstorage] = useAtom(todoListAtom); // 更新関数のみ使用

    const changeMode: (todiItem: todoItemType, index: number, editMode: boolean) => void = (todiItem: todoItemType, index: number, editMode: boolean) => {
        let editState: boolean | null = null;
        if (editMode === false) editState = true;
        else editState = false;

        const updateTodoList: todoItemType = {
            todoID: todoID,
            todoContent: todiItem.todoContent,
            edit: editState
        }
        const shallowCopy: todoItemType[] = [...todoList];
        shallowCopy.splice(index, 1, updateTodoList); // splice（切取＆置換）した結果ではなく「処理結果の残り分（shallowCopy）を更新関数に渡す」ので「変数への代入」を行わず、shallowCopy を以下の setter 関数に渡している。
        setTodoList((_prevTodoList) => shallowCopy);
    }

    const removeTodoItem: (index: number) => void = (index: number) => {
        const shallowCopy: todoItemType[] = [...todoList];
        shallowCopy.splice(index, 1);
        setTodoList((_prevTodoList) => shallowCopy);
        /* ---------------- localStorage 関連の処理（更新）---------------- */
        setLocalstorage((_prevLocalStorage) => shallowCopy);
        localStorage.setItem('todoMemos', JSON.stringify([...shallowCopy]));
    }

    useEffect(() => {
        const getLocalStorageItems: string | null = localStorage.getItem('todoMemos');
        if (getLocalStorageItems !== null) {
            const SaveLocalStorageDateItems: todoItemType[] = JSON.parse(getLocalStorageItems);
            setTodoList((_prevTodoList) => [...SaveLocalStorageDateItems]);
        } else {
            setTodoList((_prevTodoList) => []); // 前月や次月に移動するたびに ToDo メモを初期化
        }
    }, [todoID]);

    return (
        <>
            <TodoForm
                todoID={todoID}
                todoList={todoList}
                setTodoList={setTodoList}
                todoContent={todoContent}
                setTodoContent={setTodoContent}
            />
            {todoList.length > 0 &&
                <ul className={todoStyle.todoLists}>
                    {todoList.map((todoItem, i) => (
                        /* key={i} を渡すために Fragment を使用 */
                        <Fragment key={i}>
                            {/* yyyy/MM/dd が一致した場合 */}
                            {todoItem.todoID === todoID ?
                                <li>
                                    {todoItem.edit === true ?
                                        <>
                                            <p className={todoStyle.editTargetStr}>編集前：{todoItem.todoContent}</p>
                                            <TodoForm
                                                todoID={todoID}
                                                todoList={todoList}
                                                setTodoList={setTodoList}
                                                index={i}
                                                edit={todoItem.edit}
                                            />
                                            <button className={todoStyle.formBtns} type="button" onClick={() => {
                                                removeTodoItem(i);
                                            }}>削除</button>
                                        </> :
                                        <p>{todoItem.todoContent}</p>
                                    }
                                    <button className={todoStyle.formBtns} id={todoStyle["editBtn"]} type="button" onClick={() => {
                                        changeMode(todoItem, i, todoItem.edit);
                                    }}>{todoItem.edit === true ? '戻る' : '編集'}</button>
                                </li>
                                : null
                            }
                        </Fragment>
                    ))}
                </ul>
            }
        </>
    )
}