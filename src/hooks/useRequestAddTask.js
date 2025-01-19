import { useState } from "react";

export const useRequestAddTask =
    (refreshTasks) => {
        const [isCreating, setIsCreating] = useState(false);

        const requestAddTask = (newTask) => {
            setIsCreating(true);

            fetch("http://localhost:3006/todos", {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',

                },
                body: JSON.stringify(newTask)
            })
                .then((rawResponse) => rawResponse.json())
                .then((response) => {
                    console.log('Задача добавлена, ответ сервера: ', response);
                    refreshTasks();
                })
                .finally(() => setIsCreating(false))




        }

        return {
            isCreating,
            requestAddTask,
        }
    }