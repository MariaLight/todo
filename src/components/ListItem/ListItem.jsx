import { useState } from "react";
import styles from './list_item.module.css';
import updateImg from '../../img/update.svg';
import deleteImg from '../../img/delete.svg';
import { useRequestUpdateTask, useRequestDeleteTask } from "../../hooks/index";

export const ListItem = ({ refreshTasks, ...props }) => {
    const { id, title, completed } = props.item;

    const [isChecked, setIsChecked] = useState(completed);
    const { isUpdating, requestUpdateTask } = useRequestUpdateTask();

    const { isDeleting, requestDeleteTask } = useRequestDeleteTask(refreshTasks);

    return (
        <li className={`${styles.todo__item}  ${styles.task}`}>
            <label className={styles.task__label}>
                <input onChange={() => {
                    setIsChecked(!isChecked)
                    requestUpdateTask({ id: id, title: title, completed: !isChecked })
                }} type="checkbox" name='task' id={id} checked={isChecked} />
                <span>{title}</span>
            </label>

            {/* TODO вставить через спрайты  */}
            <div className={styles.todo__btns}>
                {/* <button className={styles.todo__btn}>
                    <img src={updateImg} alt="" />
                </button> */}
                <button onClick={() => requestDeleteTask(id)} className={styles.todo__btn}>
                    <img src={deleteImg} alt="" />
                </button>
            </div>
        </li>
    )
}