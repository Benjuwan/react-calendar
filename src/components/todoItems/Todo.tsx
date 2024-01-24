import { useEffect, Fragment, SyntheticEvent } from "react";
import todoStyle from "./css/todoStyle.module.css";
import { todoItemType } from "./ts/todoItemType";
import { useAtom } from "jotai";
import { todoMemoAtom } from "../../atom/atom";
import { TodoForm } from "./TodoForm";
import { TodoItems } from "./TodoItems";

export const Todo = ({ todoID }: { todoID: string }) => {
    const [todoMemo, setTodoMemo] = useAtom(todoMemoAtom);

    useEffect(() => {
        const getLocalStorageItems: string | null = localStorage.getItem('todoMemos');
        if (getLocalStorageItems !== null) {
            const SaveLocalStorageDateItems: todoItemType[] = JSON.parse(getLocalStorageItems);
            setTodoMemo((_prevTodoList) => [...SaveLocalStorageDateItems]);
        } else {
            setTodoMemo((_prevTodoList) => []); // 前月や次月に移動するたびに ToDo メモを初期化
        }
    }, [todoID]);

    /* モーダル表示関連（ToDoの詳細表示オン・オフ）*/
    const OnViewModalWindow: (viewerParentElm: HTMLElement) => void = (viewerParentElm: HTMLElement) => {
        const modalWindow: Element | null = viewerParentElm.querySelector(`.${todoStyle.modalWindow}`);
        modalWindow?.classList.add(`${todoStyle.modalWindowOnView}`);
    }

    return (
        <>
            <TodoForm todoID={todoID} />
            {todoMemo.length > 0 &&
                <ul className={todoStyle.todoLists}>
                    {todoMemo.map((todoItem, i) => (
                        /* key={i} を渡すために Fragment を使用 */
                        <Fragment key={i}>
                            {/* yyyy/MM/dd が一致した場合 */}
                            {todoItem.todoID === todoID ?
                                <li onClick={(liElm: SyntheticEvent<HTMLLIElement>) => {
                                    OnViewModalWindow(liElm.currentTarget);
                                }}>
                                    <div className={todoStyle.editTargetContent}>
                                        <p className={todoStyle.editTargetStr}>{todoItem.todoContent}</p>
                                        {todoItem.startTime && <span>開始時刻：{todoItem.startTime}</span>}
                                        {todoItem.finishTime && <span>終了時刻：{todoItem.finishTime}</span>}
                                    </div>
                                    <TodoItems
                                        todoItem={todoItem}
                                        todoStyle={todoStyle}
                                        todoID={todoID}
                                        index={i}
                                    />
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