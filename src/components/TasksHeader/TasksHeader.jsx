import { Sorting } from './components/Sorting/Sorting';
import { Search } from './components/Search/Search';
import { FormAddTask } from './components/FormAddTask/FormAddTask';
import styles from '../../app.module.css';


export const TasksHeader = () => {
    return (
        <header className={styles.todo__header}>
            <FormAddTask />
            <div className={styles.todo__functions} >
                <Search />
                <Sorting />
            </div>
        </header>
    )
}