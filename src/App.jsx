import styles from './app.module.css';
import { ListItem } from './components/ListItem/ListItem';
import { useState, useEffect } from 'react';
import { useRequestAddTask, useRequestGetTasks, useRequestUpdateTask } from './hooks/index';

const sendFormData = (formData) => {
  console.log(formData);
};

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

  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    requestAddTask({ ...newTask, id: Date.now() });
    setNewTask(initialTaskState);
  }

  useEffect(() => {
    const results = Object.values(tasks).filter((item) => {
      const preparedSearhValue = searchValue.trim().toLowerCase();
      return item.title.trim().toLowerCase().includes(preparedSearhValue);
    });
    setSearchResults(results);
  }, [searchValue]);


  return (
    <div className={styles.app}>
      <h1 className={styles.todo__title}>Список задач</h1>
      <header className={styles.todo__header}>
        <form onSubmit={handleSubmit} className={styles.todo__add}>
          <input type="text" name="taskTitle" value={newTask.title} onChange={({ target }) => setNewTask({ ...newTask, title: target.value })} />
          <button type="submit">Добавить задачу</button>
        </form>
        <div className={styles.todo__functions}>

          <input type="search" name='search' value={searchValue} onChange={({ target }) => setSearchValue(target.value)}
            placeholder="Поиск по задаче..."
            className={styles.todo__search}
          />

          <button className={styles.todo__filter}>Фильтр</button>
        </div>

      </header>
      <ul className={styles.todo__list}>
        {isLoading
          ?
          <div className={styles.loader}></div>
          : (searchValue ?
            (searchResults.length > 0 ?
              searchResults.map((item) => <ListItem item={item} refreshTasks={refreshTasks} key={item.id} />)
              :
              'Таких задач нет'
            )
            :
            tasks.map((item) => <ListItem item={item} refreshTasks={refreshTasks} key={item.id} />)
          )
        }
      </ul>
    </div>
  );
}

export default App;
