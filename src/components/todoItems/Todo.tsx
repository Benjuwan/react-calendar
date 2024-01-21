import { useState } from "react";
import { todoItemType } from "./ts/todoItemType";
import { TodoForm } from "./TodoForm";
import todoStyle from "./css/todoStyle.module.css";

export const Todo = () => {
    const [todoContent, setTodoContent] = useState<string>('');
    const [todoList, setTodoList] = useState<todoItemType[]>([]);

    const changeMode: (todiItem: todoItemType, index: number, editMode: boolean) => void = (todiItem: todoItemType, index: number, editMode: boolean) => {
        let editState: boolean | null = null;
        if (editMode === false) editState = true;
        else editState = false;

        const updateTodoList: todoItemType = {
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
    }

    return (
        <>
            <TodoForm
                todoList={todoList}
                setTodoList={setTodoList}
                todoContent={todoContent}
                setTodoContent={setTodoContent}
            />
            {todoList.length > 0 &&
                <ul className={todoStyle.todoLists}>
                    {todoList.map((todoItem, i) => (
                        <li key={i}>
                            {todoItem.edit === true ?
                                <>
                                    <p className={todoStyle.editTargetStr}>編集前：{todoItem.todoContent}</p>
                                    <TodoForm
                                        todoList={todoList}
                                        setTodoList={setTodoList}
                                        index={i}
                                        edit={todoItem.edit}
                                    />
                                    <button type="button" onClick={() => {
                                        removeTodoItem(i);
                                    }}>削除</button>
                                </> :
                                <p>{todoItem.todoContent}</p>
                            }
                            <button id={todoStyle["editBtn"]} type="button" onClick={() => {
                                changeMode(todoItem, i, todoItem.edit);
                            }}>{todoItem.edit === true ? '戻る' : '編集'}</button>
                        </li>
                    ))}
                </ul>
            }
        </>
    )
}