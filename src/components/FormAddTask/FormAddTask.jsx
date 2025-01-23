import { useRequestAddTask } from "../../hooks/index";
import { useState } from "react";
import styles from './form-add-task.module.css';


const initialTaskState = {
    id: '',
    title: '',
    completed: false
}
export const FormAddTask = ({refreshTasks}) => {
    const [newTask, setNewTask] = useState(initialTaskState);
    const { isCreating, requestAddTask } = useRequestAddTask(refreshTasks, newTask);
    const handleSubmit = (event) => {
        event.preventDefault();
        requestAddTask({ ...newTask, id: Date.now() });
        setNewTask(initialTaskState);
    }

    return (
        <form onSubmit={handleSubmit} className={styles.todo__add}>
            <input type="text" name="taskTitle" value={newTask.title} onChange={({ target }) => setNewTask({ ...newTask, title: target.value })} />
            <button type="submit" disabled={isCreating}>Добавить задачу</button>
        </form>
    )
}