import { calendarItemType } from "../ts/calendarItemType";
import { useGetCalndarItem } from "./useGetCalendarItem";

export const usePrevNextDays = () => {
    const prevNextDays = (
        year: number,
        month: number,
        dayDateBox: calendarItemType[],
    ) => {
        const { getCalendarItem } = useGetCalndarItem();

        const targetPrevDays: calendarItemType[] = [];
        const targetNextDays: calendarItemType[] = [];
        [...dayDateBox].forEach((day, i) => {
            if (i === dayDateBox.length - 1) {
                const targetNum: number = 7 - day.dayDateNum;
                const nextStartDay: number = new Date(year, month, 1).getDate();
                const targetDay: number = new Date(year, month, targetNum).getDate();
                for (let day = nextStartDay; day <= targetDay; day++) {
                    const newCalendarItem: calendarItemType = getCalendarItem(year, month + 1, day, true);
                    targetNextDays.push(newCalendarItem);
                }
            }

            else if (i === 0 && day.dayDateNum === 0) {
                return;
            }

            else if (i === 0 && day.dayDateNum !== 1) {
                const targetNum: number = 1 - day.dayDateNum;
                const targetDay: number = new Date(year, month - 1, targetNum).getDate();
                const prevFinalDay: number = new Date(year, month - 1, 0).getDate();
                for (let day = targetDay; day <= prevFinalDay; day++) {
                    const newCalendarItem: calendarItemType = getCalendarItem(year, month - 1, day, true);
                    targetPrevDays.push(newCalendarItem);
                }
            }
        });

        const theCalendar: calendarItemType[] = [...targetPrevDays, ...dayDateBox, ...targetNextDays];
        if (theCalendar.length >= 35) {
            const shallowCopy: calendarItemType[] = [...theCalendar].slice(0, 35);
            return shallowCopy;
        } else {
            return theCalendar;
        }
    }

    return { prevNextDays }
}