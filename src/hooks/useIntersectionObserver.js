import React, { useEffect, useRef, useState } from "react"

const useIntersectionObserver = (callback, options) => {
    const [observerEntry, setObserverEntry] = useState(null)
    const observer = useRef(null)

    const handleIntersection = (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                callback()
            }
        })
    }
    useEffect(() => {
        if (observer.current) {
            observer.current.disconnect()
        }
        observer.current = new IntersectionObserver(handleIntersection, options)

        if (observer.current && callback) {
            observer.current.observe(observerEntry)
        }

        return () => {
            if (observer.current) {
                observer.current.disconnect()
            }
        }
    }, [observerEntry, callback, options])

    return setObserverEntry
}

export default useIntersectionObserver
