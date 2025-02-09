import styles from './app.module.css';
import { ListItem } from './components/ListItem/ListItem';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { MainPage } from './components/MainPage/MainPage';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';


function App() {
  const [refreshTasksFlag, setRefreshTasksFlag] = useState(false);
  const refreshTasks = () => setRefreshTasksFlag(!refreshTasksFlag);
  const [tasks, setTasks] = useState([]);

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<MainPage tasks={tasks} setTasks={setTasks} refreshTasks={refreshTasks} setRefreshTasksFlag={setRefreshTasksFlag} />} />
        <Route path='/task/:id' element={<ListItem tasks={tasks} refreshTasks={refreshTasks} />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>


    </div>
  );
}

export default App;
