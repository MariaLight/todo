import styles from './app.module.css';
import { ListItem } from './components/ListItem/ListItem';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { MainPage } from './components/MainPage/MainPage';
import { Routes, Route } from 'react-router-dom';


function App() {
  
  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path='/task/:id' element={<ListItem />} />
        <Route path="/404" element={<ErrorPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>


    </div>
  );
}

export default App;
