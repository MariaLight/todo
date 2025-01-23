import { useState, useEffect, useCallback } from "react";
import styles from './search.module.css';

function debounce(func, delay = 300) {
    let timeoutId;

    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

export const Search = ({ tasks, setTasks, refreshTasks, setWarningText }) => {
    const [searchValue, setSearchValue] = useState('');
    const [debouncedSearchValue, setDebouncedSearchValue] = useState('');

    const debouncedSetSearchValue = useCallback(
        debounce((value) => {
            setDebouncedSearchValue(value)
        }, 300),
        []
    )
    const handleSearchValueChange = (value) => {
        debouncedSetSearchValue(value);
        setSearchValue(value);
    }

    useEffect(() => {
        let results = [];
        if (debouncedSearchValue) {
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
    }, [debouncedSearchValue]);

    return (
        <input type="search" name='search' value={searchValue} onChange={({ target }) => handleSearchValueChange(target.value)}
            placeholder="Поиск по задаче..."
            className={styles.todo__search}
        />
    );
}