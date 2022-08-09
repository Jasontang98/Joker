import React from 'react'
import { getAllJokes } from '../../../store/joke';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import TimeAgo from 'react-timeago'
import './Jokes.css'

const Jokes = () => {
    const dispatch = useDispatch();
    const jokesObject = useSelector((state) => state.jokes);
    const jokes = Object.values(jokesObject)

    useEffect(() => {
        dispatch(getAllJokes());
    }, [dispatch]);

    return (
        <>
            <div className='jokes-feed-column'>
                {jokes.map((joke) => {
                    return (
                        <div key={joke.id}>
                            <div>
                                <img className="feedProfPic" src={joke.user_info.prof_pic_url === '' ? 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png' : joke.user_info.prof_pic_url} alt=''></img>
                                <p>{joke.user_info.display_name}</p>
                                <div>@{joke.user_info.username}<p className='feed-dot'>.</p></div>
                                <div className="timestamp-container">
                                    <TimeAgo
                                        className="timestamp"
                                        date={joke.created_at}
                                        locale='en-US'
                                        timestyle="twitter-minute-now"
                                    />
                                </div>
                                <NavLink to={`/jokes/${joke.id}`}>
                                    {joke.content}
                                </NavLink>
                            </div>
                            <div>
                                {joke.image_url &&
                                    <div>
                                        <NavLink to={`/jokes/${joke.id}`}>
                                            <img
                                                src={joke?.image_url}
                                                alt="joke"
                                                className='singleimage'
                                            />
                                        </NavLink>
                                    </div>
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Jokes;
