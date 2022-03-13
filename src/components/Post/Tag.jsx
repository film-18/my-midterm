import axios from "axios";
import { memo, useEffect, useState } from "react";

const Tags = memo(({ tagId }) => {
    const [tags, setTags] = useState(null)

    useEffect(() => {
        axios.get(`tags/${tagId}`)
            .then(res => {
                setTags(res.data)
            })
    }, [tagId])

    if (!tags)
        return <>
            
    </>

    return <>
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-yellow-200 dark:text-yellow-900">{tags.name}</span>
    </>

})

export default Tags;