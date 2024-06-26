# React-Calendar
[【Reactアプリ100本ノック】08 Calendar](https://qiita.com/Sicut_study/items/3bd13a266feade56a4d0)の検証用ファイル。

![react-calendar](https://github.com/Benjuwan/react-calendar/assets/90702379/66fa5dd4-95e8-4296-bba0-0e1977a158bc)

## `Atom`でToDoを管理
- 状態管理ライブラリ`jotai`：`Atom`使用（`src/atom/atom.ts`）
    - `todoMemoLocalStorageAtom`：`localStorage`に保存したToDoメモ管理用
    - `todoMemoAtom`：画面で登録・更新したToDoメモ管理用
    - `isDesktopViewAtom`：デスクトップ（minw:960px）での閲覧か否かの判定用

    - Calendar.tsx（`src/components/calendar/Calendar.tsx`）<br />`Atom（todoMemoLocalStorageAtom）`更新関数のみ使用（全てのスケジュールリセット）

    - PrevNextMonthBtns.tsx（`src/components/calendar/PrevNextMonthBtns.tsx`）<br />カレンダー移動時の登録・更新作業のために`Atom（todoMemoLocalStorageAtom）`変数のみ使用

    - Todo.tsx（`src/components/todoItems/Todo.tsx`）<br />`Atom（todoMemoAtom）`は変数及び更新関数を使用

    - TodoForm.tsx（`src/components/todoItems/TodoForm.tsx`）<br />入力欄（ToDo, 開始時刻, 終了時刻）の`State`を作成・管理

    - TodoItems.tsx（`src/components/todoItems/TodoItems.tsx`）<br />`Atom（todoMemoLocalStorageAtom）`更新関数のみ使用、`Atom（todoMemoAtom）`は変数及び更新関数を使用

    - useRegiTodoItem.ts（`src/components/todoItems/hooks/useRegiTodoItem.ts`）<br />`Atom（todoMemoLocalStorageAtom）`更新関数のみ使用、`Atom（todoMemoAtom）`は変数及び更新関数を使用

    - useUpdateTodoItem.ts（`src/components/todoItems/hooks/useUpdateTodoItem.ts`）<br />`Atom（todoMemoLocalStorageAtom）`更新関数のみ使用、`Atom（todoMemoAtom）`は変数及び更新関数を使用

## component
カレンダー機能（`calendar`）とToDoリスト機能（`todoItems`）で各種`CSS`や`Hooks`ファイルを分別しています。