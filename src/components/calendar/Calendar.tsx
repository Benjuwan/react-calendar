import { useEffect, useState } from "react";
import calendarStyle from "./css/calendarStyle.module.css";
import { calendarItemType } from "./ts/calendarItemType";
import { useAtom } from "jotai";
import { todoMemoLocalStorageAtom } from "../../atom/atom";
import { PrevNextMonthBtns } from "./PrevNextMonthBtns";
import { Todo } from "../todoItems/Todo";
import { useGetMonthDays } from "./hooks/useGetMonthDays";

export const Calendar = () => {
    const { getMonthDays } = useGetMonthDays();

    const [localstorageData, setLocalstorage] = useAtom(todoMemoLocalStorageAtom);

    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth() + 1;
    const [ctrlYear, setCtrlYear] = useState<number>(currYear);
    const [ctrlMonth, setCtrlMonth] = useState<number>(currMonth);
    const [days, setDays] = useState<calendarItemType[]>([]);

    useEffect(() => getMonthDays(ctrlYear, ctrlMonth, setDays), [ctrlMonth]);

    const resetAllSchedule: () => void = () => {
        localStorage.removeItem('todoMemos');
        setLocalstorage((_prevLocalstorage) => []);
        location.reload();
    }

    return (
        <div className={calendarStyle.wrapper}>
            <h1>{ctrlYear}年{ctrlMonth}月</h1>
            {/* localstorageData(Atom)にはデフォルト値が1つ入っているため disabled={localstorageData.length <= 1} と指定 */}
            <button disabled={localstorageData.length <= 1} className={calendarStyle.resetBtn} type="button" onClick={resetAllSchedule}>予定を全削除</button>
            <PrevNextMonthBtns
                className={calendarStyle.btns}
                ctrlYear={ctrlYear}
                setCtrlYear={setCtrlYear}
                ctrlMonth={ctrlMonth}
                setCtrlMonth={setCtrlMonth}
            />
            <ul className={calendarStyle.calendar}>
                {days.map((day, i) => (
                    // カスタムデータ属性の指定は low-case でないと React から怒られる
                    <li key={i} data-daydate={day.dayDateNum} className={calendarStyle.calendarLists}>
                        <p>
                            {day.signalPrevNextMonth && <span>{day.month}/</span>}{day.day}
                        </p>
                        <p>{day.dayDate}</p>
                        {day.signalPrevNextMonth ? null : <Todo todoID={`${day.year}/${day.month}/${day.day}`} />}
                    </li>
                ))}
            </ul>
        </div >
    );
}