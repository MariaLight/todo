import { useState, useEffect } from "react";
import styles from './search.module.css';

export const Search = ({ tasks, setTasks, refreshTasks, setWarningText }) => {
    const [searchValue, setSearchValue] = useState('');
    
    useEffect(() => {
        let results = [];
        if (searchValue) {
            results = Object.values(tasks).filter((item) => {
                const preparedSearhValue = searchValue.trim().toLowerCase();
                return item.title.trim().toLowerCase().includes(preparedSearhValue);
            });
            setTasks(results);
            setWarningText('Не найдено');
        } else {
            refreshTasks();
            setWarningText('Задач пока нет');
        }
    }, [searchValue]);

    return (
        <input type="search" name='search' value={searchValue} onChange={({ target }) => setSearchValue(target.value)}
            placeholder="Поиск по задаче..."
            className={styles.todo__search}
        />
    );
}