import { calendarItemType } from "../ts/calendarItemType";

export const useGetCalndarItem = () => {
    const getCalendarItem: (year: number, month: number, day: number, signalPrevNextMonth?: boolean) => calendarItemType = (
        year: number,
        month: number,
        day: number,
        signalPrevNextMonth?: boolean
    ) => {
        let japDayDate: string = '';
        const dayDate: number = new Date(year, month - 1, day).getDay();
        switch (dayDate) {
            case 0:
                japDayDate = '日'
                break;
            case 1:
                japDayDate = '月'
                break;
            case 2:
                japDayDate = '火'
                break;
            case 3:
                japDayDate = '水'
                break;
            case 4:
                japDayDate = '木'
                break;
            case 5:
                japDayDate = '金'
                break;
            case 6:
                japDayDate = '土'
                break;
        }

        if (signalPrevNextMonth) {
            const newCalendarItem: calendarItemType = {
                year: year,
                month: month,
                day: day,
                dayDate: japDayDate,
                dayDateNum: dayDate,
                signalPrevNextMonth: true
            }
            return newCalendarItem;
        } else {
            const newCalendarItem: calendarItemType = {
                year: year,
                month: month,
                day: day,
                dayDate: japDayDate,
                dayDateNum: dayDate,
            }
            return newCalendarItem;
        }
        
    }

    return { getCalendarItem }
}