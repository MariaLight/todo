import { useContext } from 'react';
import { AppContext } from '../../context';
import { useRequestGetTasks } from '../../hooks/index';
import { ListItem } from './components/ListItem/ListItem';
import styles from './tasks_list.module.css';


export const TasksList = () => {
    const { tasks, warningText, setTasks, setWarningText, refreshTasksFlag } = useContext(AppContext);

    const { isLoading } = useRequestGetTasks(refreshTasksFlag, setTasks, setWarningText);


    return (
        <ul className={styles.todo__list}>
            {isLoading
                ?
                <div className={styles.loader}></div>
                :
                (tasks.length > 0 ?
                    tasks.map((item) => <ListItem item={item} key={item.id} />)
                    :
                    <div className={styles.emptyList}>
                        {warningText}
                    </div>
                )
            }

        </ul>
    )
}