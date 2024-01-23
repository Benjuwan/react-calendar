# React-Calendar

[【Reactアプリ100本ノック】08 Calendar](https://qiita.com/Sicut_study/items/3bd13a266feade56a4d0)の検証用ファイル。

## `Atom`でToDoを管理
- 状態管理ライブラリ`jotai`：`Atom`使用（`src/atom/atom.ts`）

## component
- Calendar.tsx（`src/components/calendar/Calendar.tsx`）<br />スケジュールクリアボタンの disabled 判定のために`Atom`変数のみ使用

- PrevNextMonthBtns.tsx（`src/components/calendar/PrevNextMonthBtns.tsx`）<br />カレンダー移動時の登録・更新作業のために`Atom`変数のみ使用

- TodoForm.tsx（`src/components/todoItems/TodoForm.tsx`）<br />`Atom`更新関数のみ使用

- Todo.tsx（`src/components/todoItems/Todo.tsx`）<br />`Atom`更新関数のみ使用