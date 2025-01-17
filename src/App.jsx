import styles from './app.module.css';
import { ListItem } from './components/ListItem/ListItem';
import { useState, useEffect } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/todos?userId=1')
      .then((loadedData) => loadedData.json())
      .then((loadedTasks) => {
        setTasks(loadedTasks);
      })
      .finally(() => setIsLoading(false));
  }, [])

  return (
    <div className={styles.app}>
      <h1 className={styles.todo__title}>Список задач</h1>
      {/* <header className={styles.todo__header}>
        <div className={styles.todo__search}></div>
        <div className={styles.todo__filter}></div>
      </header> */}
      <ul className={styles.todo__list}>
        {isLoading
          ?
          <div className={styles.loader}></div>
          :
          tasks.map((item) => <ListItem item={item} key={item.id} />)}
      </ul>
    </div>
  );
}

export default App;
