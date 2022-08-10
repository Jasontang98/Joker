import React from 'react';
import Jokes from "../Jokes/Jokes";
import CreateJoke from "../Jokes/CreateJokes";
import "./Feed.css";

const Feed = () => {
    return (
        <div className='TopFeed'>
            <div className='HeaderFeed'>
                <h2 className='home'>Home</h2>
            </div>
            <CreateJoke />
            <Jokes />
        </div>
    )
}

export default Feed;
