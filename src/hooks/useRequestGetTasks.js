import { useEffect, useState } from "react";
import { ref, onValue } from 'firebase/database';
import { db } from "../firebase";

export const useRequestGetTasks = (setTasks, refreshTasksFlag) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const tasksDbRef = ref(db, 'tasks');

        return onValue(tasksDbRef, (snapshot) => {
            const loadedTasks = snapshot.val() || [];
            setTasks(loadedTasks);
            setIsLoading(false);
        });

    }, [refreshTasksFlag]);


    return {
        isLoading
    }
} 