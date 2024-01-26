import { useEffect, useState } from "react";
import calendarStyle from "./css/calendarStyle.module.css";
import { calendarItemType } from "./ts/calendarItemType";
import { useAtom } from "jotai";
import { todoMemoLocalStorageAtom } from "../../atom/atom";
import { PrevNextMonthBtns } from "./PrevNextMonthBtns";
import { Todo } from "../todoItems/Todo";
import { useGetMonthDays } from "./hooks/useGetMonthDays";

type todaySignal = {
    thisYear: number;
    thisMonth: number;
    today: number;
}

export const Calendar = () => {
    const { getMonthDays } = useGetMonthDays();

    const [, setLocalstorage] = useAtom(todoMemoLocalStorageAtom); // 更新関数のみ使用（全てのスケジュールリセット）

    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth() + 1;
    const [ctrlYear, setCtrlYear] = useState<number>(currYear);
    const [ctrlMonth, setCtrlMonth] = useState<number>(currMonth);
    const [days, setDays] = useState<calendarItemType[]>([]);
    const [ctrlToday, setCtrlToday] = useState<todaySignal | null>(null);

    useEffect(() => {
        const today: todaySignal = {
            thisYear: new Date().getFullYear(),
            thisMonth: new Date().getMonth() + 1,
            today: new Date().getDate()
        }
        setCtrlToday((_prevCtrlToday) => today);
    }, []);

    const jumpThisMonth: () => void = () => {
        const thisYear: number = new Date().getFullYear();
        const thisMonth: number = new Date().getMonth() + 1;
        setCtrlYear((_prevCtrlYear) => thisYear);
        setCtrlMonth((_prevCtrlMonth) => thisMonth);
        getMonthDays(thisYear, thisMonth, setDays);
        window.scrollTo(0, 0);
    }

    const resetAllSchedule: () => void = () => {
        const result: boolean = confirm('全てのスケジュールを削除してもよろしいですか？');
        if (result) {
            localStorage.removeItem('todoMemos');
            setLocalstorage((_prevLocalstorage) => []);
            alert('全てのスケジュールが削除されました');
            location.reload();
        }
    }

    useEffect(() => getMonthDays(ctrlYear, ctrlMonth, setDays), [ctrlMonth]);

    return (
        <div className={calendarStyle.wrapper}>
            <h1>{ctrlYear}年{ctrlMonth}月</h1>
            <button className={calendarStyle.resetBtn} type="button" onClick={resetAllSchedule}>予定を全削除</button>
            <PrevNextMonthBtns
                className={calendarStyle.btns}
                ctrlYear={ctrlYear}
                setCtrlYear={setCtrlYear}
                ctrlMonth={ctrlMonth}
                setCtrlMonth={setCtrlMonth}
            />
            <button id={calendarStyle["jumpThisMonth"]} type="button" onClick={jumpThisMonth}>今月に移動</button>
            <ul className={calendarStyle.calendar}>
                {days.map((day, i) => (
                    // カスタムデータ属性の指定は low-case でないと React から怒られる
                    <li key={i} data-daydate={day.dayDateNum} className={
                        (ctrlToday?.thisYear === day.year && ctrlToday.thisMonth === day.month && ctrlToday.today === day.day) ?
                            `${calendarStyle.todaySignal} ${calendarStyle.calendarLists}` :
                            `${calendarStyle.calendarLists}`
                    }>
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