import { useState } from "react";
import styles from './list_item.module.css';
import updateImg from '../../img/update.svg';
import deleteImg from '../../img/delete.svg';

export const ListItem = (props) => {
    const { id, title, completed } = props.item;

    const [isChecked, setIsChecked] = useState(completed);

    return (
        <li className={`${styles.todo__item}  ${styles.task}`}>
            <label className={styles.task__label}>
                <input onChange={() => setIsChecked(!isChecked)} type="checkbox" name='task' id={id} checked={isChecked} />
                <span>{title}</span>
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
    )
}