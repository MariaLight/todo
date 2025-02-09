import { useState, useRef, useContext } from "react";
import styles from './list_item.module.css';
import updateImg from '../../../../img/update.svg';
import deleteImg from '../../../../img/delete.svg';
import { useRequestUpdateTask, useRequestDeleteTask } from "../../../../hooks/index";
import { AppContext } from "../../../../context";

export const ListItem = ({ item }) => {
    const { refreshTasks } = useContext(AppContext);
    const { id, title, completed } = item;

    const [isChecked, setIsChecked] = useState(completed);
    const { isUpdating, requestUpdateTask } = useRequestUpdateTask();
    const { isDeleting, requestDeleteTask } = useRequestDeleteTask(refreshTasks);
    const [isTitleUpdating, setIsTitleUpdating] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const listItemRef = useRef(null);

    const changeTaskTitle = () => {
        setIsTitleUpdating(false);
        requestUpdateTask({ id: id, title: updatedTitle, completed: completed })
    }

    return (
        <li className={`${styles.todo__item}  ${styles.task}`}>
            <label className={styles.task__label}>
                <input onChange={() => {
                    setIsChecked(!isChecked)
                    requestUpdateTask({ id: id, title: updatedTitle, completed: !isChecked })
                }} type="checkbox" name='task' id={id} checked={isChecked} />
                {isTitleUpdating ?
                    <div className={styles.taskText}>
                        <input ref={listItemRef}
                            type="text"
                            value={updatedTitle}
                            onChange={({ target }) => { setUpdatedTitle(target.value) }}
                            onBlur={() => {
                                changeTaskTitle()
                            }}

                            onKeyDown={(event) => {
                                if (event.keyCode === 13) {
                                    changeTaskTitle()
                                }
                            }}
                        />
                    </div>
                    :
                    <span className={styles.taskText}>{updatedTitle}</span>
                }


            </label>

            <div className={styles.todo__btns}>
                {!isChecked
                    && (!isTitleUpdating ?
                        <button disabled={isUpdating} onClick={() => {
                            setIsTitleUpdating(true);
                            setTimeout(() => {
                                listItemRef.current.focus()
                            }, 0);
                        }} className={styles.todo__btn}>
                            <img src={updateImg} alt="Изменить задачу" />
                        </button> :
                        '')
                }



                <button disabled={isDeleting} onClick={() => requestDeleteTask(id)} className={styles.todo__btn}>
                    <img src={deleteImg} alt="Удалить задачу" />
                </button>
            </div>
        </li>
    )
}