import { ChangeEvent, FC, useState } from "react";
import { todoItemType } from "./ts/todoItemType";
import todoStyle from "./css/todoStyle.module.css";

type todoFormType = {
    todoList: todoItemType[];
    setTodoList: React.Dispatch<React.SetStateAction<todoItemType[]>>,
    todoContent?: string;
    setTodoContent?: React.Dispatch<React.SetStateAction<string>>;
    index?: number; // props で index 番号に初期値を設定している（一番上のToDo編集実現に index が必要なため）
    edit?: boolean;
}

export const TodoForm: FC<todoFormType> = (props) => {
    const { todoList, setTodoList, todoContent, setTodoContent, index = 0, edit } = props;

    const [reRegiTodoContent, setReRegiTodoContent] = useState<string>('');

    const regiTodoItem: (todoContent: string) => void = (todoContent: string) => {
        const newTodoList: todoItemType = {
            todoContent: todoContent,
            edit: false
        }
        if (todoContent.length > 0) setTodoList((_prevTodoList) => [...todoList, newTodoList]);
    }

    const updateTodoItem: (index: number) => void = (index: number) => {
        const updateTodoList: todoItemType = {
            todoContent: reRegiTodoContent,
            edit: false
        }
        const shallowCopy: todoItemType[] = [...todoList];
        shallowCopy.splice(index, 1, updateTodoList); // splice（切取＆置換）した結果ではなく「処理結果の残り分（shallowCopy）を更新関数に渡す」ので「変数への代入」を行わず、shallowCopy を以下の setter 関数に渡している。
        if (reRegiTodoContent.length > 0) setTodoList((_prevTodoList) => shallowCopy);
    }

    return (
        <form className={todoStyle.form} onSubmit={(formElm: ChangeEvent<HTMLFormElement>) => {
            formElm.preventDefault();
            { todoContent ? regiTodoItem(todoContent) : updateTodoItem(index) }
            { setTodoContent ? setTodoContent((_prevTodoContent) => '') : setReRegiTodoContent((_prevReRegiTodoContent) => '') }
        }}>
            <label>
                <input type="text" value={
                    setTodoContent ?
                        todoContent :
                        reRegiTodoContent
                } onInput={(todoTxt: ChangeEvent<HTMLInputElement>) => {
                    {
                        setTodoContent ?
                            setTodoContent((_prevTodoContent) => todoTxt.target.value) :
                            setReRegiTodoContent((_prevReRegiTodoContent) => todoTxt.target.value)
                    }
                }} />
            </label>
            <button className={todoStyle.button} type="button" disabled={todoContent ? todoContent.length <= 0 : reRegiTodoContent.length <= 0} onClick={() => {
                {
                    todoContent ?
                        regiTodoItem(todoContent) :
                        updateTodoItem(index)
                }
            }}>{!edit ? '登録' : '再登録'}</button>
        </form>
    );
}