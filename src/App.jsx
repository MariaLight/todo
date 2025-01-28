import styles from './app.module.css';
import { useState } from 'react';
import { useRequestGetTasks } from './hooks/index';
import { ListItem } from './components/ListItem/ListItem';
import { Sorting } from './components/Sorting/Sorting';
import { Search } from './components/Search/Search';
import { FormAddTask } from './components/FormAddTask/FormAddTask';


function App() {


  const [refreshTasksFlag, setRefreshTasksFlag] = useState(false);
  const refreshTasks = () => setRefreshTasksFlag(!refreshTasksFlag);

  const [tasks, setTasks] = useState([]);
  const { isLoading } = useRequestGetTasks(setTasks, refreshTasksFlag);
  const [warningText, setWarningText] = useState('Задач пока нет');

  return (
    <div className={styles.app}>
      <h1 className={styles.todo__title}>Список задач</h1>
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
      <ul className={styles.todo__list}>
        {isLoading
          ?
          <div className={styles.loader}></div>
          :
          (Object.entries(tasks).length > 0 ?
            Object.entries(tasks).map(([id, item]) => <ListItem taskId={id} item={item} refreshTasks={refreshTasks} key={id} />)
            :
            <div className={styles.emptyList}>
              {warningText}
            </div>
          )
        }

      </ul>
    </div>
  );
}

export default App;
