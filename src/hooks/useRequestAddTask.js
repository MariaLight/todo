import { useState } from "react";
import { ref, push } from 'firebase/database';
import { db } from '../firebase';

export const useRequestAddTask =
    () => {
        const [isCreating, setIsCreating] = useState(false);

        const requestAddTask = (newTask) => {
            setIsCreating(true);

            const tasksDbRef = ref(db, 'tasks');
            push(tasksDbRef, newTask) //возвращает промис
                .then((response) => {
                    console.log('Задача добавлена, ответ сервера: ', response);
                })
                .finally(() => setIsCreating(false))
        }

        return {
            isCreating,
            requestAddTask,
        }
    }