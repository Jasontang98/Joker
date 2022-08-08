import React from 'react';
import SingleJoke from './Jokes/SingleJoke';
import SideBar from './Sidebar/Sidebar';
import './TimelineSingleJoke.css';

const TimelineSingleJoke = () => {
    return (
        <div className='timeline-single-joke-wrap'>
            <div className='timeline-single-joke-left'>
                <SideBar />
            </div>
            <div className='timeline-single-joke-center'>
                <SingleJoke />
            </div>
        </div>
    )
}

export default TimelineSingleJoke;
