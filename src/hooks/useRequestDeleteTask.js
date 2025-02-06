import { useState } from "react";
import { useNavigate } from 'react-router-dom';


export const useRequestDeleteTask =
    (refreshTasks) => {
        const [isDeleting, setIsDeleting] = useState(false);
        const navigate = useNavigate();


        const requestDeleteTask = (taskId) => {
            setIsDeleting(true);
            fetch(`http://localhost:3006/todos/${taskId}`, {
                method: 'DELETE'
            })
                .then((rawResponse) => rawResponse.json())
                .then((response) => {
                    console.log('Задача удалена, ответ сервера: ', response);
                    refreshTasks();
                })
                .catch(error => console.log('error is', error))
                .finally(() => {
                    setIsDeleting(false);
                    navigate('/');
                })
        }

        return {
            isDeleting,
            requestDeleteTask,
        }
    }