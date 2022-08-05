import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SingleJoke.css"
import EditJokeModal from './EditJoke/EditJokeModal'
import { getAllJokes, removeJoke, updateJoke } from '../../../store/joke'
import Comments from '../Comments/Comments'

const SingleJoke = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false);
    // const [content, setContent] = useState('');
    // const [image, setImage] = useState(null);

    const oneJoke = useSelector((state) => state.jokes[id]);

    useEffect(() => {
        dispatch(getAllJokes()).then(() => { setIsLoaded(true) })
    }, [dispatch]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const data = {
    //         id,
    //         content
    //     }
    //     dispatch(updateJoke(data))
    // }

    const deleteJoke = async (e) => {
        e.preventDefault();
        await dispatch(removeJoke(oneJoke));
        history.push('/jokes')
    }

    return (
        isLoaded && (
            <>
                <div>
                    {oneJoke?.user_info.display_name}
                </div>
                <div>
                    {oneJoke?.user_info.username}
                </div>
                <div>
                    {oneJoke?.content}
                </div>
                <div>
                    {oneJoke?.image_url &&
                    <img
                        src={oneJoke?.image_url}
                        alt="joke"
                        className='singleimage'
                    />
                    }
                </div>
                <EditJokeModal />
                <div>
                    <button className="jokeDelete" onClick={deleteJoke}>
                        Delete
                    </button>
                </div>
                <div>
                    <Comments />
                </div>
            </>
        )
    )

}

export default SingleJoke;
