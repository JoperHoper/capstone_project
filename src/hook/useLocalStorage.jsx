import { useEffect, useState } from "react";

export default function useLocalStorage(key, initialObj) {
    const [obj, setObj] = useState(() => {
        return getSavedObj(key, initialObj)
    })

    useEffect(() => {
        localStorage.setItem(
            key, JSON.stringify(obj)
        )
    }, [obj])

    return [obj, setObj];
}

const getSavedObj = (key, initialObj) => {
    if (typeof window !== 'undefined') {
        const savedObj = localStorage.getItem(key);
        if (savedObj && savedObj !== undefined && savedObj !== 'undefined') {
            return JSON.parse(savedObj);
        }
    }
    if (initialObj instanceof Function) {
        return initialObj();
    }
    return initialObj;
}