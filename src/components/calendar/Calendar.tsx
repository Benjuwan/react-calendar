import { useEffect, useState } from "react";
import calendarStyle from "./css/calendarStyle.module.css";
import { calendarItemType } from "./ts/calendarItemType";
import { useGetMonthDays } from "./hooks/useGetMonthDays";
import { Todo } from "../todoItems/Todo";

export const Calendar = () => {
    const { getMonthDays } = useGetMonthDays();

    const currYear = new Date().getFullYear();
    const currMonth = new Date().getMonth() + 1;
    const [ctrlYear, setCtrlYear] = useState<number>(currYear);
    const [ctrlMonth, setCtrlMonth] = useState<number>(currMonth);

    const nextCalendarView = () => {
        if (ctrlMonth === 12) {
            setCtrlYear((_prevCtrlYear) => ctrlYear + 1);
            setCtrlMonth((_prevCtrlMonth) => 1);
        } else {
            setCtrlMonth((_prevCtrlMonth) => ctrlMonth + 1);
        }
    }

    const prevCalendarView = () => {
        if (ctrlMonth === 1) {
            setCtrlYear((_prevCtrlYear) => ctrlYear - 1);
            setCtrlMonth((_prevCtrlMonth) => 12);
        } else {
            setCtrlMonth((_prevCtrlMonth) => ctrlMonth - 1);
        }
    }

    const [days, setDays] = useState<calendarItemType[]>([]);
    useEffect(() => getMonthDays(ctrlYear, ctrlMonth, setDays), [ctrlMonth]);

    return (
        <div className={calendarStyle.wrapper}>
            <h1>{ctrlYear}年{ctrlMonth}月</h1>
            <div className={calendarStyle.btns}>
                <button type="button" onClick={prevCalendarView}>prev</button>
                <button type="button" onClick={nextCalendarView}>next</button>
            </div>
            <ul className={calendarStyle.calendar}>
                {days.map((day, i) => (
                    // カスタムデータ属性の指定は low-case でないと React から怒られる
                    < li key={i} data-daydate={day.dayDateNum}>
                        <p>
                            {day.monthDateNum && <span>{day.monthDateNum}/</span>}{day.day}
                        </p>
                        <p>{day.dayDate}</p>
                        <Todo />
                    </li>
                ))}
            </ul>
        </div >
    );
}