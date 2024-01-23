import { FC } from "react";
import { useAtom } from "jotai";
import { todoListAtom } from "../../atom/atom";

type btnsPropsType = {
    className: string;
    ctrlMonth: number;
    setCtrlYear: React.Dispatch<React.SetStateAction<number>>;
    ctrlYear: number;
    setCtrlMonth: React.Dispatch<React.SetStateAction<number>>;
}

export const PrevNextMonthBtns: FC<btnsPropsType> = (props) => {
    const { className, ctrlYear, setCtrlYear, ctrlMonth, setCtrlMonth } = props;

    const [localstrage, setLocalstorage] = useAtom(todoListAtom);

    const nextCalendarView = () => {
        if (ctrlMonth === 12) {
            setCtrlYear((_prevCtrlYear) => ctrlYear + 1);
            setCtrlMonth((_prevCtrlMonth) => 1);
        } else {
            setCtrlMonth((_prevCtrlMonth) => ctrlMonth + 1);
        }
        /* ---------------- localStorage 関連の処理（登録）---------------- */
        setLocalstorage((_prevLocalStorage) => localstrage);
        localStorage.setItem('todoMemos', JSON.stringify([...localstrage]));
    }

    const prevCalendarView = () => {
        if (ctrlMonth === 1) {
            setCtrlYear((_prevCtrlYear) => ctrlYear - 1);
            setCtrlMonth((_prevCtrlMonth) => 12);
        } else {
            setCtrlMonth((_prevCtrlMonth) => ctrlMonth - 1);
        }
        /* ---------------- localStorage 関連の処理（登録）---------------- */
        setLocalstorage((_prevLocalStorage) => localstrage);
        localStorage.setItem('todoMemos', JSON.stringify([...localstrage]));
    }

    return (
        <div className={className}>
            <button type="button" onClick={prevCalendarView}>prev</button>
            <button type="button" onClick={nextCalendarView}>next</button>
        </div>
    );
}