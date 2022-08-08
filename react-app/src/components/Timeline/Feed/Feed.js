import React from 'react';
import Jokes from "../Jokes/Jokes";
import CreateJoke from "../Jokes/CreateJokes";
import "./Feed.css";

const Feed = () => {
    return (
        <div>
            <div>
                <h2>Home</h2>
            </div>
            <CreateJoke />
            <Jokes />
        </div>
    )
}

export default Feed;
