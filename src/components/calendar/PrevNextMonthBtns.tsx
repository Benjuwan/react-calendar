import { FC } from "react";
import { useAtom } from "jotai";
import { todoMemoLocalStorageAtom } from "../../atom/atom";

type btnsPropsType = {
    className: string;
    ctrlMonth: number;
    setCtrlYear: React.Dispatch<React.SetStateAction<number>>;
    ctrlYear: number;
    setCtrlMonth: React.Dispatch<React.SetStateAction<number>>;
}

const btnStyle: object = {
    'padding': '.5em 1em'
}

const btnIconStyle: object = {
    'verticalAlign': 'middle'
}

export const PrevNextMonthBtns: FC<btnsPropsType> = (props) => {
    const { className, ctrlYear, setCtrlYear, ctrlMonth, setCtrlMonth } = props;

    const [localstorageData] = useAtom(todoMemoLocalStorageAtom); // 変数のみ使用（カレンダー移動時の登録・更新作業）

    const nextCalendarView = () => {
        if (ctrlMonth === 12) {
            setCtrlYear((_prevCtrlYear) => ctrlYear + 1);
            setCtrlMonth((_prevCtrlMonth) => 1);
        } else {
            setCtrlMonth((_prevCtrlMonth) => ctrlMonth + 1);
        }
        /* ---------------- localStorage 関連の処理（登録）---------------- */
        localStorage.setItem('todoMemos', JSON.stringify([...localstorageData]));
    }

    const prevCalendarView = () => {
        if (ctrlMonth === 1) {
            setCtrlYear((_prevCtrlYear) => ctrlYear - 1);
            setCtrlMonth((_prevCtrlMonth) => 12);
        } else {
            setCtrlMonth((_prevCtrlMonth) => ctrlMonth - 1);
        }
        /* ---------------- localStorage 関連の処理（登録）---------------- */
        localStorage.setItem('todoMemos', JSON.stringify([...localstorageData]));
    }

    return (
        <div className={className}>
            <button type="button" style={btnStyle} onClick={prevCalendarView}><span className="material-symbols-outlined" style={btnIconStyle}>
                navigate_before
            </span></button>
            <button type="button" style={btnStyle} onClick={nextCalendarView}><span className="material-symbols-outlined" style={btnIconStyle}>
                navigate_next
            </span></button>
        </div>
    );
}