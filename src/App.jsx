import styles from './app.module.css';
import { useState } from 'react';

import { AppContext } from './context';
import { TasksList } from './components/TasksList/TasksList';
import { TasksHeader } from './components/TasksHeader/TasksHeader';


function App() {


  const [refreshTasksFlag, setRefreshTasksFlag] = useState(false);
  const refreshTasks = () => setRefreshTasksFlag(!refreshTasksFlag);
  const [warningText, setWarningText] = useState('Задач пока нет');
  const [tasks, setTasks] = useState([]);

  return (
    <AppContext value={{ tasks, refreshTasks, refreshTasksFlag, setTasks, warningText, setWarningText }}>
      <div className={styles.app}>
        <h1 className={styles.todo__title}>Список задач</h1>
        <TasksHeader />
        <TasksList />
      </div>
    </AppContext>
  );
}

export default App;
