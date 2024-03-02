import todoStyle from "./css/todoStyle.module.css";
import { Fragment, SyntheticEvent } from "react";
import { useAtom } from "jotai";
import { todoMemoAtom } from "../../atom/atom";
import { TodoItems } from "./TodoItems";

export const TodoList = ({ todoID }: { todoID: string }) => {
    const [todoMemo] = useAtom(todoMemoAtom);

    /* モーダル表示関連（ToDoの詳細表示オン・オフ）*/
    const OnViewModalWindow: (viewerParentElm: HTMLElement) => void = (viewerParentElm: HTMLElement) => {
        const modalWindow: Element | null = viewerParentElm.querySelector(`.${todoStyle.modalWindow}`);
        modalWindow?.classList.add(`${todoStyle.modalWindowOnView}`);
    }

    return (
        <>
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
    );
}