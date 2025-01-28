import { useState } from "react";
import { ref, set } from 'firebase/database';
import { db } from '../firebase';

export const useRequestUpdateTask =
    () => {
        const [isUpdating, setIsUpdating] = useState(false);

        const requestUpdateTask = (taskId, task) => {
            setIsUpdating(true);
            const tasksDbRef = ref(db, `tasks/${taskId}`);

            set(tasksDbRef, {
                "title": task.title,
                "completed": task.completed
            })
                .then((response) => {
                    console.log('Задача изменена, ответ сервера: ', response);

                })
                .catch(error => console.log('error is', error))

                .finally(() => setIsUpdating(false))



        }

        return {
            isUpdating,
            requestUpdateTask,
        }
    }