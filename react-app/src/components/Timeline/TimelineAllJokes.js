import React from 'react';
import Feed from './Feed/Feed';
import SideBar from './Sidebar/Sidebar';
import './TimelineAllJokes.css';

const TimelineAllJokes = () => {
    return (
        <div className='TimelineAllWrap'>
            <div className='TimelineLeft'>
                <SideBar />
            </div>
            <div className='TimelineMiddle'>
                <Feed className='TimelineFeed' />
            </div>
        </div>
    )
}

export default TimelineAllJokes
