import { ChangeEvent, FC, useEffect, useState } from "react";
import todoStyle from "./css/todoStyle.module.css";
import { useUpdateTodoItem } from "./hooks/useUpdateTodoItem";
import { useRegiTodoItem } from "./hooks/useRegiTodoItem";

type todoFormType = {
    todoID: string;
    index?: number;
    edit?: boolean;
}

export const TodoForm: FC<todoFormType> = (props) => {
    /* index には初期値を設定している（一番上の ToDo 編集実現に index が必要なため）*/
    const { todoID, index = 0, edit } = props;

    /* 入力欄の State（ToDo, 開始時刻, 終了時刻）*/
    const [todoContent, setTodoContent] = useState<string>('');
    const [startTime, setStartTime] = useState<string>('');
    const [finishTime, setFinishTime] = useState<string>('');

    const { updateTodoItem } = useUpdateTodoItem();
    const { regiTodoItem } = useRegiTodoItem();

    const resetStates: () => void = () => {
        setTodoContent((_prevTodoContent) => '');
        setStartTime((_prevStartTime) => '');
        setFinishTime((_prevFinishTime) => '');
    }

    useEffect(() => resetStates(), [todoID]); // 前月や次月に移動するたびに入力欄を初期化

    return (
        <form className={todoStyle.form} onSubmit={(formElm: ChangeEvent<HTMLFormElement>) => {
            formElm.preventDefault();
            {
                !edit ?
                    regiTodoItem(todoID, todoContent, startTime, finishTime) :
                    updateTodoItem(todoID, todoContent, startTime, finishTime, index)
            }
            resetStates();
        }}>
            <label>
                <input type="text" value={todoContent} onInput={(todoTxt: ChangeEvent<HTMLInputElement>) => {
                    setTodoContent((_prevTodoContent) => todoTxt.target.value);
                }} />
            </label>
            <label className={todoStyle.timeLabel}>開始時刻 <input type="time" value={startTime} onChange={(timeElm: ChangeEvent<HTMLInputElement>) => setStartTime(timeElm.target.value)} /></label>
            <label className={todoStyle.timeLabel}>終了時刻 <input type="time" value={finishTime} onChange={(timeElm: ChangeEvent<HTMLInputElement>) => setFinishTime(timeElm.target.value)} /></label>
            <button className={todoStyle.formBtns} id={todoStyle.regiUpdateBtn} type="button" disabled={todoContent.length <= 0} onClick={() => {
                {
                    !edit ?
                        regiTodoItem(todoID, todoContent, startTime, finishTime) :
                        updateTodoItem(todoID, todoContent, startTime, finishTime, index)
                }
                resetStates();
            }}>{!edit ? '登録' : '再登録'}</button>
        </form>
    );
}