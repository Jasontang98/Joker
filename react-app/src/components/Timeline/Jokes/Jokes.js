import React from 'react'
import { getAllJokes } from '../../../store/joke';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink, useParams } from 'react-router-dom';
import CreateJoke from './CreateJokes'

const Jokes = () => {
    const dispatch = useDispatch();
    const jokesObject = useSelector((state) => state.jokes);
    const jokes = Object.values(jokesObject)

    useEffect(() => {
        dispatch(getAllJokes());
    }, [dispatch]);

    return (
        <>
            <div>
                <CreateJoke />
                {jokes.map((joke) => {
                    return (
                        <div key={joke.id}>
                            <div>
                                <NavLink to={`/jokes/${joke.id}`}>
                                {joke.content}
                                </NavLink>
                            </div>
                            <div>
                                {joke.image_url &&
                                <div>
                                    <img
                                        src={joke?.image_url}
                                        alt="joke"
                                        className='singleimage'
                                    />
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
