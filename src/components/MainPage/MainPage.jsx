import styles from '../../app.module.css';
import { useState } from 'react';
import { useRequestGetTasks } from '../../hooks/useRequestGetTasks';
import { Sorting } from '../Sorting/Sorting';
import { Search } from '../Search/Search';
import { FormAddTask } from '../FormAddTask/FormAddTask';
import { NavLink } from 'react-router-dom';



export const MainPage = ({tasks, setTasks, refreshTasks, refreshTasksFlag}) => {
    
    const [warningText, setWarningText] = useState('Задач пока нет');
    const { isLoading } = useRequestGetTasks(refreshTasksFlag, setTasks, setWarningText);


    return (
        <>
            <header className={styles.todo__header}>
                <FormAddTask refreshTasks={refreshTasks} />
                <div className={styles.todo__functions} >
                    <Search
                        tasks={tasks}
                        refreshTasks={refreshTasks}
                        setTasks={setTasks}
                        setWarningText={setWarningText} />

                    <Sorting
                        tasks={tasks}
                        refreshTasks={refreshTasks}
                        setTasks={setTasks} />
                </div>

            </header>
            <nav>

                <ul className={styles.nav__list}>
                    {isLoading
                        ?
                        <div className={styles.loader}></div>
                        :
                        (tasks.length > 0 ?
                            tasks.map((item) => <li className={`${styles.nav__link} ${item.completed ? styles.link_checked : ""}`} key={item.id}><NavLink to={`task/${item.id}`}>{item.title}</NavLink></li>)
                            :
                            <div className={styles.emptyList}>
                                {warningText}
                            </div>
                        )
                    }

                </ul>
            </nav>
        </>
    );
}
