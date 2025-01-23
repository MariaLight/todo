import { useState, useEffect } from "react";
import styles from './sorting.module.css';

export const Sorting = ({tasks, setTasks, refreshTasks}) => {
    const [isSortChecked, setIsSortChecked] = useState(false);
    useEffect(() => {
        if (isSortChecked) {
            let results = Object.values(tasks).sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
            setTasks(results);

        } else {
            refreshTasks();
        }
    }, [isSortChecked]);
    return (
        <label className={styles.todo__sort}>
            <input type="checkbox" name="sort" id="sort" value={isSortChecked} onChange={() => { setIsSortChecked(!isSortChecked) }} />
            <span>Сортировка по алфавиту</span>
        </label>
    );
}