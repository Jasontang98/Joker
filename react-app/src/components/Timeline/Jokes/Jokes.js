import React from 'react'
import { getAllJokes } from '../../../store/joke';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { NavLink } from 'react-router-dom';

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
                {jokes.map((joke) => {
                    return (
                        <div key={joke.id}>
                            <div>
                                <NavLink to={`/jokes/${joke.id}`}>
                                {joke.content}
                                </NavLink>
                            </div>
                            <div>
                                <img
                                    src={joke?.image_url}
                                    alt="joke"
                                    className='singleimage'
                                />
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Jokes
