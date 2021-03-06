import { memo, useEffect, useState } from "react";
import axios from "axios";

import Categoryy from "../components/Post/Category";
import { Avatar } from "@vechaiui/react";
import moment from "moment";
import parse from 'html-react-parser';
import { Link, useParams } from "react-router-dom";
import Author from "../components/Post/Author";
import Tags from "../components/Post/Tag";

export const Category = memo(() => {

    const [categories, setCategories] = useState([])
    const [posts, setPosts] = useState([])

    const [selectedCategory, setSelectedCategory] = useState(null)
    const [comments, setComments] = useState([])

    const params = useParams()

    useEffect(() => {
        setSelectedCategory(params.categoryId)
    }, [params.categoryId])

    useEffect(() => {
        axios.get('categories')
            .then(res => {
                setCategories(res.data)
                // setSelectedCategory(res.data?.[0]?.id)
            })
    }, [])

    useEffect(() => {
        if(categories && !params.categoryId && !selectedCategory) {
            setSelectedCategory(categories[0]?.id)
        }
    }, [categories, selectedCategory, params.categoryId])


    useEffect(() => {
        // https://fswd-wp.devnss.com/wp-json/wp/v2/comments?post=${postId}
        axios.get(`comments?per_page=100`)
            .then(res => {
                setComments(res.data)
            })
    }, [])

    // useEffect(() => {

    // }, [])

    useEffect(() => {
        if (selectedCategory)
            axios.get(`posts?categories=` + selectedCategory)
                .then(res => {
                    setPosts(res.data)
                })
    }, [selectedCategory])

    // const

    // if (posts.categories?.map() = categories.id) {
    return <>
        <div className="flex flex-wrap justify-center my-5">

            {categories?.map(category => <>
                <div className="border-b border-gray-400 dark:border-gray-900">
                    <ul className="flex flex-wrap -mb-px">
                        <li className="mr-2">
                            <Link
                                to={`/category/${category.id}`}
                                className={`inline-block py-4 px-4 font-medium text-2xl text-center rounded-t-lg border-b-2 border-transparent hover:text-gray-600 hover:border-grau-600 ${category.id === parseInt(selectedCategory) ? 'text-blue-700 border-blue-700' : 'text-gray-500'} dark:text-gray-400 dark:hover:text-gray-300`}
                            >
                                {category.name}
                            </Link>
                        </li>
                    </ul>
                </div>
            </>)}
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-8 py-8">

            {posts?.map(e =>
                <>

                    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:scale-105 duration-500 hover:bg-white-500">

                        {/* <a href="#"> */}
                        <h4 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {e.title?.rendered} </h4>
                        <h5>
                            by <Author authorId={e.author} showOnlyName={true} />
                        </h5>


                        <span className="text-xs font-bold tracking-tight text-gray-500 dark:text-white">{moment(e.date).format("LLL")}</span>
                        <span className="inline-flex items-center p-1 ml-3 mr-1 text-sm font-semibold text-green-800 bg-green-100 rounded-full dark:bg-blue-200 dark:text-blue-800">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                        </span>
                        <p className="text-xs inline-flex text-green-800">{e.status}</p>

                        <br />
                        <div className="pt-2 flex flex-wrap">
                            {e.categories?.map(category => {
                                return <Categoryy categoryId={category} />
                            })}

                            {e.tags?.map(tagId => {
                                return <Tags tagId={tagId} />
                            })}
                        </div>

                        {/* </a> */}
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 py-2">
                            {/* {e.excerpt?.rendered?.length > 50 ? e.excerpt?.rendered.slice(3, 20) + "..." : e.excerpt?.rendered} */}
                            {parse(e.excerpt?.rendered)}
                        </p>

                        {/* <div>

                {comments?.filter(comment => comment.post === e.id).length}
            </div> */}



                        <div className="flex justify-between">
                            <div>
                                <Link to={`/posts/${e.id}`} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 duration-300 focus:ring-4 focus:ring-blue-300 hover:scale-105">
                  
                                        Read more
                                        <svg className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            
                                </Link>
                            </div>
                            <div>
                                <div className="flex flex-wrap w-full space-x-4 ">
                                    <Avatar.Group size="lg" max={2}>
                                        {comments?.filter(comment => comment.post === e.id).map(comment => <>
                                            <Avatar name={comment.author_name} src={comment.author_avatar_urls['24']} />
                                        </>
                                        )}
                                    </Avatar.Group>

                                    {/* <p>+ {comments?.filter(comment => comment.post === e.id).length} others </p> */}
                                </div>
                            </div>
                        </div>



                    </div>

                </>
            )}
        </div>


    </>

    // }




});
