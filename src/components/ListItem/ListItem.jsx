import { useState, useRef } from "react";
import styles from './list_item.module.css';
import updateImg from '../../img/update.svg';
import deleteImg from '../../img/delete.svg';
import { useRequestUpdateTask, useRequestDeleteTask, useRequestGetTaskById } from "../../hooks/index";
import { ReturnButton } from '../ReturnButton/ReturnButton'
import { useParams } from 'react-router-dom';
import { Loader } from "../Loader/Loader";

export const ListItem = () => {
    const params = useParams();
    const itemId = params.id;

    const [isTitleUpdating, setIsTitleUpdating] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState('');
    
    const [isChecked, setIsChecked] = useState(false);

    const { isLoading } = useRequestGetTaskById(itemId, setUpdatedTitle, setIsChecked);

    const { isUpdating, requestUpdateTask } = useRequestUpdateTask();
    const { isDeleting, requestDeleteTask } = useRequestDeleteTask();

    const listItemRef = useRef(null);

    const changeTaskTitle = () => {
        setIsTitleUpdating(false);
        requestUpdateTask({ id: itemId, title: updatedTitle, completed: isChecked })
    }

    return (

        <>
            {isLoading
                ?
                <Loader />
                :
                (<>
                    <div className={`${styles.todo__item}  ${styles.task}`}>
                        <title>Задача - {updatedTitle}</title>
                        <label className={styles.task__label}>
                            <input onChange={() => {
                                setIsChecked(!isChecked)
                                requestUpdateTask({ id: itemId, title: updatedTitle, completed: !isChecked })
                            }} type="checkbox" name='task' id={itemId} checked={isChecked} />
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
                                && (isTitleUpdating ?
                                    <button disabled={isUpdating} onClick={changeTaskTitle} className={styles.todo__btn}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#CDCDCD" viewBox="0 0 16 16">
                                            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z" />
                                        </svg>
                                    </button>
                                    :

                                    <button disabled={isUpdating} onClick={() => {


                                        setIsTitleUpdating(true);
                                        setTimeout(() => {
                                            listItemRef.current.focus()
                                        }, 0);
                                    }} className={styles.todo__btn}>
                                        <img src={updateImg} alt="Изменить задачу" />
                                    </button>)
                            }



                            <button disabled={isDeleting} onClick={() => requestDeleteTask(itemId)} className={styles.todo__btn}>
                                <img src={deleteImg} alt="Удалить задачу" />
                            </button>
                        </div>

                    </div>
                    <ReturnButton />
                </>
                )
            }

        </>
    )
}