import { useState } from "react";

export const useRequestUpdateTask =
    () => {
        // (refreshTasks) => {
        const [isUpdating, setIsUpdating] = useState(false);

        const requestUpdateTask = (task) => {
            setIsUpdating(true);
            fetch(`http://localhost:3006/todos/${task.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',

                },
                body: JSON.stringify({
                    "title" : task.title,
                    "completed": task.completed
                })
            })
                .then((rawResponse) => rawResponse.json())
                .then((response) => {
                    console.log('Задача изменена, ответ сервера: ', response);
                    // refreshTasks();
                })
                .catch(error => console.log('error is', error))
                .finally(() => setIsUpdating(false))




        }

        return {
            isUpdating,
            requestUpdateTask,
        }
    }