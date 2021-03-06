import axios from "axios";
import { memo, useEffect, useState } from "react";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import { Spinner } from "@vechaiui/react";

const Author = memo(({ authorId, showOnlyName = false }) => {

    // TODO: สร้าง State สำหรับเก็บ Author
    const [author, setAuthor] = useState(null)



    // TODO: Fetch author จาก Id
    useEffect(() => {
        axios.get(`users/${authorId}`)
            .then(res => {
                setAuthor(res.data)
            })
    }, [authorId])

    if (!author) {
        if (showOnlyName)
            return <Spinner size="sm" />
        return <>
            <div className="flex w-full p-8 justify-center">
                <Spinner size="xl" className="my-auto" />
            </div>
        </>
    }

    if (showOnlyName)
        return author.name

    return <>

        <div className="px-8 py-8 flex justify-center">
        <Link to={`/author/${author.id}`} className="flex flex-col items-center bg-white rounded-lg border shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">

            <img className="object-cover w-full h-96 rounded-t-lg md:h-auto md:w-60 md:rounded-none md:rounded-l-lg" src={author.avatar_urls['96']} alt="" />
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{author.name}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{author.description}
                    <br />
                    {parse(author.link)}
                    <br />
                    {/* Post : {post?.filter(post => post.author === author.id).length} */}
                </p>
            </div>
       
            </Link>
        </div>



    </>
})

export default Author;
