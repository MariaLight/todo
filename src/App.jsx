import styles from './app.module.css';
import { ListItem } from './components/ListItem/ListItem';
import { useState, useEffect } from 'react';
import { useRequestAddTask, useRequestGetTasks, useRequestUpdateTask } from './hooks/index';

const initialTaskState = {
  id: '',
  title: '',
  completed: false
}
function App() {

  const [newTask, setNewTask] = useState(initialTaskState);
  const [refreshTasksFlag, setRefreshTasksFlag] = useState(false);
  const refreshTasks = () => setRefreshTasksFlag(!refreshTasksFlag);


  const { tasks, isLoading } = useRequestGetTasks(refreshTasksFlag);
  const { isCreating, requestAddTask } = useRequestAddTask(refreshTasks, newTask);

  const [tasksList, setTasksList] = useState([]);

  // Добавление задачи 
  const handleSubmit = (event) => {
    event.preventDefault();
    requestAddTask({ ...newTask, id: Date.now() });
    setNewTask(initialTaskState);
  }

  // Поиск
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    let results = [];
    if (searchValue) {
      results = Object.values(tasks).filter((item) => {
        const preparedSearhValue = searchValue.trim().toLowerCase();
        return item.title.trim().toLowerCase().includes(preparedSearhValue);
      });
    }
    setTasksList(results);
  }, [searchValue]);

  // Сортировка
  const [isSortChecked, setIsSortChecked] = useState(false);
  useEffect(() => {
    let results = [];
    if (isSortChecked) {
      results = Object.values(tasks).sort((a, b) => a.title.toLowerCase().localeCompare(b.title.toLowerCase()));
    } else {
      results = tasks;
    }
    setTasksList(results);
  }, [isSortChecked]);

  return (
    <div className={styles.app}>
      <h1 className={styles.todo__title}>Список задач</h1>
      <header className={styles.todo__header}>
        <form onSubmit={handleSubmit} className={styles.todo__add}>
          <input type="text" name="taskTitle" value={newTask.title} onChange={({ target }) => setNewTask({ ...newTask, title: target.value })} />
          <button type="submit" disabled={isCreating}>Добавить задачу</button>
        </form>
        <div className={styles.todo__functions}>

          <input type="search" name='search' value={searchValue} onChange={({ target }) => setSearchValue(target.value)}
            placeholder="Поиск по задаче..."
            className={styles.todo__search}
          />

          <label className={styles.todo__sort}>
            <input type="checkbox" name="sort" id="sort" value={isSortChecked} onChange={() => { setIsSortChecked(!isSortChecked) }} />
            <span>Сортировка по алфавиту</span>
          </label>
        </div>

      </header>
      <ul className={styles.todo__list}>
        {isLoading
          ?
          <div className={styles.loader}></div>
          :
          (tasksList.length > 0 ?
            tasksList.map((item) => <ListItem item={item} refreshTasks={refreshTasks} key={item.id} />)
            :
            tasks.map((item) => <ListItem item={item} refreshTasks={refreshTasks} key={item.id} />)

          )
        }
      </ul>
    </div>
  );
}

export default App;
