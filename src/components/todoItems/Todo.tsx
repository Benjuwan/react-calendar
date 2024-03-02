import { useEffect } from "react";
import { todoItemType } from "./ts/todoItemType";
import { useAtom } from "jotai";
import { isDesktopViewAtom, todoMemoAtom } from "../../atom/atom";
import { TodoForm } from "./TodoForm";
import { TodoList } from "./TodoList";

export const Todo = ({ todoID }: { todoID: string }) => {
    const [, setTodoMemo] = useAtom(todoMemoAtom);
    const [desktopView] = useAtom(isDesktopViewAtom);

    useEffect(() => {
        const getLocalStorageItems: string | null = localStorage.getItem('todoMemos');
        if (getLocalStorageItems !== null) {
            const SaveLocalStorageDateItems: todoItemType[] = JSON.parse(getLocalStorageItems);
            setTodoMemo((_prevTodoList) => [...SaveLocalStorageDateItems]);
        } else {
            setTodoMemo((_prevTodoList) => []); // 前月や次月に移動するたびに ToDo メモを初期化
        }
    }, [todoID]);

    return (
        <>
            {desktopView ?
                <>
                    <TodoForm todoID={todoID} />
                    <TodoList todoID={todoID} />
                </> :
                <TodoForm todoID={todoID} />
            }
        </>
    );
}