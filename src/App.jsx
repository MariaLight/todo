import styles from './app.module.css';
import updateImg from './img/update.svg';
import deleteImg from './img/delete.svg';

function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.todo__title}>Список задач</h1>
      {/* <header className={styles.todo__header}>
        <div className={styles.todo__search}></div>
        <div className={styles.todo__filter}></div>
      </header> */}
      <ul className={styles.todo__list}>
        <li className={`${styles.todo__item}  ${styles.task}`}>
          <label className={styles.task__label}>
            <input type="checkbox" name="task_id" id="" />
            <span>Задача</span>
          </label>

          {/* TODO вставить через спрайты  */}
          <div className={styles.todo__btns}>
            <button className={styles.todo__btn}>
              <img src={updateImg} alt="" />
            </button>
            <button className={styles.todo__btn}>
              <img src={deleteImg} alt="" />

            </button>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
