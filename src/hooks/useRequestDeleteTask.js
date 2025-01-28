import { useState } from "react";
import { ref, remove } from 'firebase/database';
import { db } from '../firebase';

export const useRequestDeleteTask =
    () => {
        const [isDeleting, setIsDeleting] = useState(false);

        const requestDeleteTask = (taskId) => {
            setIsDeleting(true);
            const tasksDbRef = ref(db, `tasks/${taskId}`);

            remove(tasksDbRef)
                .then((response) => {
                    console.log('Задача удалена, ответ сервера: ', response);
                })
                .finally(() => setIsDeleting(false))
        }

        return {
            isDeleting,
            requestDeleteTask,
        }
    }