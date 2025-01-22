import { useState } from "react";

export const useRequestDeleteTask =
        (refreshTasks) => {
        const [isDeleting, setIsDeleting] = useState(false);

        const requestDeleteTask = (taskId) => {
            setIsDeleting(true);
            fetch(`http://localhost:3006/todos/${taskId}`, {
                method: 'delete'
            })
                .then((rawResponse) => rawResponse.json())
                .then((response) => {
                    console.log('Задача elfktyf, ответ сервера: ', response);
                    refreshTasks();
                })
                .catch(error => console.log('error is', error))
                .finally(() => setIsDeleting(false))
        }

        return {
            isDeleting,
            requestDeleteTask,
        }
    }