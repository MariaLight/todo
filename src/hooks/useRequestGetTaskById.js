import { useEffect, useState } from "react";

export const useRequestGetTaskById = (id, setUpdatedTitle, setIsChecked) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        fetch(`http://localhost:3006/todos/${id}`)
            .then((loadedData) => loadedData.json())
            .then((loadedTask) => {
                setIsChecked(loadedTask.completed);
                setUpdatedTitle(loadedTask.title);
            })
            .catch((error) => {
                console.log(error)
            }).finally(() => setIsLoading(false));
    }, []);
    return { isLoading };
} 