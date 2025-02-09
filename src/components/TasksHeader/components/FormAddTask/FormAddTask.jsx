import { useRequestAddTask } from "../../../../hooks/index";
import { useContext, useState } from "react";
import styles from './form-add-task.module.css';
import { AppContext } from "../../../../context";

export const FormAddTask = () => {
    const { refreshTasks } = useContext(AppContext)
    const [newTaskTitle, setNewTaskTitle] = useState('');

    const { isCreating, requestAddTask } = useRequestAddTask(refreshTasks);
    const handleSubmit = (event) => {
        event.preventDefault();
        requestAddTask(newTaskTitle);
        setNewTaskTitle('');
    }

    return (
        <form onSubmit={handleSubmit} className={styles.todo__add}>
            <input type="text" name="taskTitle" value={newTaskTitle} onChange={({ target }) => setNewTaskTitle(target.value)} />
            <button type="submit" disabled={isCreating}>Добавить задачу</button>
        </form>
    )
}