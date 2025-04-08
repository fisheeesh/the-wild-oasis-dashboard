import { useEffect } from "react"

const usePageTitle = (title) => {
    useEffect(() => {
        document.title = `The Wild Oasis | ${title}`

        return () => document.title = 'The Wild Oasis'
    }, [title])
}

export default usePageTitle