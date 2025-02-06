import styles from './app.module.css';
import { useState } from 'react';
import { useRequestGetTasks } from './hooks/index';
import { ListItem } from './components/ListItem/ListItem';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { MainPage } from './components/MainPage/MainPage';
import { NavLink, Routes, Route } from 'react-router-dom';


function App() {


  const [refreshTasksFlag, setRefreshTasksFlag] = useState(false);
  const refreshTasks = () => setRefreshTasksFlag(!refreshTasksFlag);
  const [warningText, setWarningText] = useState('Задач пока нет');
  const [tasks, setTasks] = useState([]);

  const { isLoading } = useRequestGetTasks(refreshTasksFlag, setTasks, setWarningText);


  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<MainPage refreshTasks={refreshTasks} tasks={tasks} setTasks={setTasks} warningText={warningText} isLoading={isLoading} setWarningText={setWarningText} />}></Route>
        {
          tasks.map((item) => <Route key={item.id} path='/task/:id' element={<ListItem tasks={tasks} refreshTasks={refreshTasks} />}></Route>)
        }
        <Route path="/404" element={<ErrorPage />}></Route>
        <Route path="*" element={<ErrorPage />}></Route>

      </Routes>


    </div>
  );
}

export default App;
