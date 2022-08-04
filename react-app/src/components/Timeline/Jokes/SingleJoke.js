import React from 'react'
import { getAllJokes, removeJoke, updateJoke } from '../../../store/joke'
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./SingleJoke.css"
import EditJokeModal from './EditJoke/EditJokeModal'

const SingleJoke = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const history = useHistory();

    const [isLoaded, setIsLoaded] = useState(false);1
    // const [content, setContent] = useState('');
    // const [image, setImage] = useState(null);

    const oneJoke = useSelector((state) => state.jokes[id]);

    useEffect(() => {
        dispatch(getAllJokes()).then(() => { setIsLoaded(true) })
    }, [dispatch, id]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     const data = {
    //         id,
    //         content
    //     }
    //     dispatch(updateJoke(data))
    // }

    const deleteJoke = (e) => {
        dispatch(removeJoke(oneJoke));
        history.push('/jokes')
    }

    return (
        isLoaded && (
            <>
                <div>
                    {oneJoke.userinfo.display_name}
                </div>
                <div>
                    {oneJoke.userinfo.username}
                </div>
                <div>
                    {oneJoke.content}
                </div>
                <div>
                    <img
                        src={oneJoke?.image_url}
                        alt="joke"
                        className='singleimage'
                    />
                </div>
                <EditJokeModal />

                <button onClick={deleteJoke}>
                    Delete
                </button>
            </>
        )
    )

}

export default SingleJoke;
