import { useEffect, useState } from "react";

export const useRequestGetTasks = (refreshTasksFlag) => {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('http://localhost:3006/todos')
            .then((loadedData) => loadedData.json())
            .then((loadedTasks) => {
                setTasks(loadedTasks);

            })
            .finally(() => setIsLoading(false));
    }, [refreshTasksFlag]);


    return {
        tasks, isLoading
    }
} 